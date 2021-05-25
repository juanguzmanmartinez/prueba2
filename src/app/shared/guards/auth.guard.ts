import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { interval, Observable, Subject } from 'rxjs';
import { UserStoreService } from '@stores/user-store.service';
import { TokenStoreService } from '@stores/token-store.service';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { AuthImplementService } from '@implements/auth/auth-implement.service';
import { CTokenSettings } from '@parameters/auth/token.parameter';
import { DialogTwoActionsService } from '@molecules/dialog/views/dialog-two-actions/dialog-two-actions.service';
import { DialogOneActionService } from '@molecules/dialog/views/dialog-one-action/dialog-one-action.service';
import { takeUntil } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {
    private intervalByHourSubject: Subject<boolean> = new Subject<boolean>();
    private intervalByMinuteSubject: Subject<boolean> = new Subject<boolean>();
    private expiredIntervalSubject: Subject<boolean> = new Subject<boolean>();

    constructor(
        private _router: Router,
        private _userStore: UserStoreService,
        private _tokenStore: TokenStoreService,
        private _authImplement: AuthImplementService,
        private _dialogOneAction: DialogOneActionService,
        private _dialogTwoActions: DialogTwoActionsService,
    ) {
    }


    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this._userStore.authenticated()) {
            this._userStore.logout();
            return false;
        }

        if (this.tokenExpired()) {
            this.tokenExpiredAction();
            return false;
        }

        if (this.tokenCountDown()) {
            this.tokenCountDownAction();
            return true;
        }

        this.scheduleValidateExpirationToken();
        return true;
    }

    tokenExpired() {
        if (this._tokenStore.tokenDetail) {
            const date = DatesHelper.Date();
            const expirationDate = DatesHelper.Date(this._tokenStore.tokenDetail.expirationDate, DATES_FORMAT.millisecond);
            return date.isSameOrAfter(expirationDate);
        }
        return false;
    }

    tokenExpiredAction() {
        this._dialogOneAction.open({
            title: 'Tu sesión ha expirado',
            description: 'Por seguridad, hemos cerrado la sesión. Por favor, ingresa de nuevo.',
            action: 'Cerrar',
            fontName: 'hourglass_empty',
            fontClass: 'text-primary'
        });

        this._userStore.logout();
    }

    tokenCountDown() {
        return this.differenceInMinutes <= CTokenSettings.countDownInMinutes;
    }

    tokenCountDownAction() {
        this.expiredIntervalByMinute();

        this._dialogTwoActions.open({
            title: 'Tu sesión está por terminar',
            description: '¿Deseas continuar dentro del administrador?',
            primaryAction: 'Continuar',
            secondaryAction: 'Cerrar sesión',
            fontName: 'hourglass_empty',
            fontClass: 'text-primary'
        }, {disableClose: true})
            .afterClosed()
            .subscribe((refreshToken) => {
                this.removeExpiredInterval();

                if (refreshToken) {
                    this._authImplement.refreshToken(this._tokenStore.refreshToken)
                        .subscribe(() => {
                            this.scheduleValidateExpirationToken();
                        }, () => {
                            this.tokenExpiredAction();
                        });
                } else if (refreshToken === false) {
                    this._userStore.logout();
                }
            });
    }

    get differenceInMinutes(): number {
        if (this._tokenStore.tokenDetail) {
            const currentDate = DatesHelper.Date();
            const expirationDate = DatesHelper.Date(this._tokenStore.tokenDetail.expirationDate, DATES_FORMAT.millisecond);
            return expirationDate.diff(currentDate, 'minutes');
        }
        return 0;
    }

    scheduleValidateExpirationToken() {
        if (this.differenceInMinutes > CTokenSettings.minutesToChangeIntervalTime) {
            this.countDownIntervalByHour();
        } else {
            this.countDownIntervalByMinute();
        }
    }

    countDownIntervalByHour() {
        interval(CTokenSettings.intervalHoursInSeconds)
            .pipe(takeUntil(this.intervalByHourSubject))
            .subscribe(() => {
                if (this.differenceInMinutes < CTokenSettings.minutesToChangeIntervalTime) {
                    this.countDownIntervalByMinute();
                }
            });
    }

    countDownIntervalByMinute() {
        interval(CTokenSettings.intervalMinutesInSeconds)
            .pipe(takeUntil(this.intervalByMinuteSubject))
            .subscribe(() => {
                this.intervalByHourSubject.next();
                this.intervalByHourSubject.complete();
                this.validateExpirationTokenAction();
            });
    }

    expiredIntervalByMinute() {
        interval(CTokenSettings.expiredIntervalMinutes)
            .pipe(takeUntil(this.expiredIntervalSubject))
            .subscribe(() => {
                this.removeExpiredInterval();
                this._dialogTwoActions?.close();
                this.tokenExpiredAction();
            });
    }

    removeExpiredInterval() {
        this.expiredIntervalSubject.next();
        this.expiredIntervalSubject.unsubscribe();
        this.expiredIntervalSubject = new Subject();
    }

    removeIntervals() {
        this.intervalByHourSubject.next();
        this.intervalByHourSubject.unsubscribe();
        this.intervalByMinuteSubject.next();
        this.intervalByMinuteSubject.unsubscribe();

        this.intervalByHourSubject = new Subject();
        this.intervalByMinuteSubject = new Subject();
    }

    validateExpirationTokenAction() {
        if (this.tokenExpired()) {
            this.tokenExpiredAction();
            this.removeIntervals();
        }
        if (this.tokenCountDown()) {
            this.tokenCountDownAction();
            this.removeIntervals();
        }
    }

}
