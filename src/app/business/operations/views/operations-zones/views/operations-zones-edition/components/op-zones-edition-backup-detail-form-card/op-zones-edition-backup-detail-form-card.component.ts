import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Zone, ZoneDetail } from '../../../../models/operations-zones.model';
import { Subscription } from 'rxjs';
import { OpZonesEditionBackupDetailFormCardFormService, ZoneBackupDetailControlName } from './form/op-zones-edition-backup-detail-form-card-form.service';
import { CGStateSettingByValue, CStateValue } from '@models/state/state.model';
import { IZoneBackupUpdate } from '@interfaces/zones/zones.interface';

@Component({
    selector: 'app-op-zones-edition-backup-detail-form-card',
    templateUrl: './op-zones-edition-backup-detail-form-card.component.html',
    styleUrls: ['./op-zones-edition-backup-detail-form-card.component.sass'],
    providers: [OpZonesEditionBackupDetailFormCardFormService]
})
export class OpZonesEditionBackupDetailFormCardComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];

    public stateValue = CStateValue;

    public controlNameList = ZoneBackupDetailControlName;
    public zoneList: Zone[];

    @Input() zoneDetail: ZoneDetail;

    @Input('zoneList')
    set _zoneList(zoneList: Zone[]) {
        this.zoneList = zoneList;
    }

    @Output() cancelEdition = new EventEmitter();
    @Output() saveEdition = new EventEmitter<IZoneBackupUpdate>();

    constructor(
        public _editionZoneBackupDetailForm: OpZonesEditionBackupDetailFormCardFormService
    ) {
    }

    ngOnInit(): void {
        const state = !!this.zoneDetail.zoneBackup ? CStateValue[this.zoneDetail.zoneBackup.state] : false;
        this._editionZoneBackupDetailForm.stateControl.patchValue(state);

        this.updateZoneBackupDetailForm();
        this.updateStateControl();
        this.updateZoneBackupControl();
    }

    get form() {
        return this._editionZoneBackupDetailForm;
    }

    updateZoneBackupDetailForm() {
        const zoneBackup = this.zoneList.find((zone) => zone.code === this.zoneDetail.zoneBackup?.code);
        this._editionZoneBackupDetailForm.zoneBackupControl.setValue(zoneBackup);

        this.checkEditionByStateControl();
    }

    checkEditionByStateControl() {
        if (this._editionZoneBackupDetailForm.stateControl.value) {
            this._editionZoneBackupDetailForm.zoneBackupControl.enable();
            this._editionZoneBackupDetailForm.assignedStoreControl.enable();
        } else {
            this._editionZoneBackupDetailForm.zoneBackupControl.disable();
            this._editionZoneBackupDetailForm.assignedStoreControl.disable();
        }
    }

    updateStateControl() {
        const subscription = this._editionZoneBackupDetailForm.stateControl.valueChanges
            .subscribe(() => {
                if (this._editionZoneBackupDetailForm.stateControl.value === false) {
                    this.updateZoneBackupDetailForm();
                }
                this.checkEditionByStateControl();
            });
        this.subscriptions.push(subscription);
    }

    updateZoneBackupControl() {
        const subscription = this._editionZoneBackupDetailForm.zoneBackupControl.valueChanges
            .subscribe(() => {
                const zoneBackup = this._editionZoneBackupDetailForm.zoneBackupControl.value;
                const backupAssignedStore = zoneBackup?.assignedStore ? `${zoneBackup.assignedStore.code} ${zoneBackup.assignedStore.name}` : '';
                this._editionZoneBackupDetailForm.assignedStoreControl.patchValue(backupAssignedStore);
            });
        this.subscriptions.push(subscription);
    }

    zoneBackupOptionName(option: Zone) {
        return option ? `${option.name} - ${option.code}` : '';
    }

    cancelEditionEvent() {
        this.cancelEdition.emit();
    }

    saveEditionEvent() {
        const enabled = this._editionZoneBackupDetailForm.stateControl.value;
        const zoneBackupUpdate = {} as IZoneBackupUpdate;
        const zoneBackup = this._editionZoneBackupDetailForm.zoneBackupControl.value as Zone;
        zoneBackupUpdate.zoneId = zoneBackup.id;
        zoneBackupUpdate.preferableLocalBackupToShow = CGStateSettingByValue(enabled);
        zoneBackupUpdate.forceServiceAMPM = CGStateSettingByValue(false);
        zoneBackupUpdate.forceServicePROG = CGStateSettingByValue(false);
        this.saveEdition.emit(zoneBackupUpdate);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
