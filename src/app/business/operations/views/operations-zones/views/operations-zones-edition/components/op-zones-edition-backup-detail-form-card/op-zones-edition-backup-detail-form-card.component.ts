import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Zone, ZoneDetail } from '../../../../models/operations-zones.model';
import { Subscription } from 'rxjs';
import { OpZonesEditionBackupDetailFormCardFormService, ZoneBackupDetailControlName } from './form/op-zones-edition-backup-detail-form-card-form.service';
import { CGStateSettingByValue, CStateValue } from '@models/state/state.model';
import { IZoneBackupUpdate } from '@interfaces/zones/zones.interface';
import { CZoneTypeName, EZoneType } from '../../../../parameters/operations-zones-type.parameter';

@Component({
    selector: 'app-op-zones-edition-backup-detail-form-card',
    templateUrl: './op-zones-edition-backup-detail-form-card.component.html',
    styleUrls: ['./op-zones-edition-backup-detail-form-card.component.sass'],
    providers: [OpZonesEditionBackupDetailFormCardFormService]
})
export class OpZonesEditionBackupDetailFormCardComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];

    public stateValue = CStateValue;
    public zoneTypeName = CZoneTypeName;

    public controlNameList = ZoneBackupDetailControlName;
    public zoneListStored: Zone[];
    public zoneList: Zone[];

    @Input() zoneDetail: ZoneDetail;

    @Input('zoneList')
    set _zoneList(zoneList: Zone[]) {
        this.zoneListStored = zoneList;
        this.zoneList = zoneList;
    }

    @Input() zoneTypeList: EZoneType[];
    @Output() cancelEdition = new EventEmitter();
    @Output() saveEdition = new EventEmitter<IZoneBackupUpdate>();

    constructor(
        public _editionZoneBackupDetailForm: OpZonesEditionBackupDetailFormCardFormService
    ) {
    }

    ngOnInit(): void {
        const state = !!this.zoneDetail.zoneBackup ? CStateValue[this.zoneDetail.zoneBackup.state] : false;
        this._editionZoneBackupDetailForm.stateControl.patchValue(state);

        this.updateStateControl();
        this.updateZoneTypeControl();
        this.updateZoneBackupControl();
        this.updateZoneBackupDetailForm();
    }

    get form() {
        return this._editionZoneBackupDetailForm;
    }

    updateZoneBackupDetailForm() {
        this._editionZoneBackupDetailForm.zoneTypeControl.patchValue(null);

        this.checkEditionByStateControl();
    }

    checkEditionByStateControl() {
        if (this._editionZoneBackupDetailForm.stateControl.value) {
            this._editionZoneBackupDetailForm.zoneBackupControl.enable();
            this._editionZoneBackupDetailForm.zoneTypeControl.enable();
            this._editionZoneBackupDetailForm.assignedStoreControl.enable();
        } else {
            this._editionZoneBackupDetailForm.zoneBackupControl.disable();
            this._editionZoneBackupDetailForm.zoneTypeControl.disable();
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

    updateZoneTypeControl() {
        const subscription = this._editionZoneBackupDetailForm.zoneTypeControl.valueChanges
            .subscribe(() => {
                const zoneType = this._editionZoneBackupDetailForm.zoneTypeControl.value;
                if (zoneType) {
                    this.zoneList = this.zoneListStored
                        .filter((zone: Zone) => {
                            return zone.zoneType === zoneType;
                        });
                } else {
                    this.zoneList = this.zoneListStored;
                }
                const zoneBackup = this.zoneList.find((zone) => zone.code === this.zoneDetail.zoneBackup?.code);
                this._editionZoneBackupDetailForm.zoneBackupControl.patchValue(zoneBackup);
            });
        this.subscriptions.push(subscription);
    }

    updateZoneBackupControl() {
        const subscription = this._editionZoneBackupDetailForm.zoneBackupControl.valueChanges
            .subscribe((value) => {
                console.log(value);
                const zoneBackup = this._editionZoneBackupDetailForm.zoneBackupControl.value;
                const backupAssignedStore = zoneBackup?.assignedStore ? `${zoneBackup.assignedStore.code} ${zoneBackup.assignedStore.name}` : '';
                this._editionZoneBackupDetailForm.assignedStoreControl.patchValue(backupAssignedStore);
            });
        this.subscriptions.push(subscription);
    }

    zoneBackupOptionName(option: Zone) {
        return option ? `${option.name} - ${option.code}` : '';
    }

    zoneTypeOptionName(option: EZoneType) {
        return option ? this.zoneTypeName[option] : '';
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
