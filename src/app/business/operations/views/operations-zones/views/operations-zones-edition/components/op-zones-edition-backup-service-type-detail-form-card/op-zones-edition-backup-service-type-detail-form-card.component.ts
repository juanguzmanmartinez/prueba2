import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { CDeliveryServiceTypeName, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { ZoneBackupServiceType } from '../../../../models/operations-zones-service-type.model';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';
import { OpZonesEditionBackupServiceTypeDetailFormCardFormService, ZoneBackupServiceTypeDetailControlName } from './form/op-zones-edition-backup-service-type-detail-form-card-form.service';
import { CGStateSettingByState, CGStateSettingByValue, CStateValue, EStateSetting } from '@models/state/state.model';
import { IZoneBackupUpdate } from '@interfaces/zones/zones.interface';

@Component({
    selector: 'app-op-zones-edition-backup-service-type-detail-form-card',
    templateUrl: './op-zones-edition-backup-service-type-detail-form-card.component.html',
    styleUrls: ['./op-zones-edition-backup-service-type-detail-form-card.component.sass'],
    providers: [OpZonesEditionBackupServiceTypeDetailFormCardFormService]
})
export class OpZonesEditionBackupServiceTypeDetailFormCardComponent implements OnInit {
    private serviceTypeName = CDeliveryServiceTypeName;
    public serviceType: EDeliveryServiceType;
    public controlNameList = ZoneBackupServiceTypeDetailControlName;
    public stateValue = CStateValue;

    @Input() zoneBackupDetail: ZoneDetail;
    @Input() zoneBackupServiceType: ZoneBackupServiceType;


    @Output() cancelEdition = new EventEmitter();
    @Output() saveEdition = new EventEmitter<IZoneBackupUpdate>();

    constructor(
        public _editionBackupServiceTypeDetailForm: OpZonesEditionBackupServiceTypeDetailFormCardFormService
    ) {
    }

    ngOnInit(): void {
        this._editionBackupServiceTypeDetailForm.stateControl.patchValue(this.stateValue[this.zoneBackupServiceType.forceService]);
    }

    get form() {
        return this._editionBackupServiceTypeDetailForm;
    }

    get segmentName() {
        return this.serviceTypeName[this.zoneBackupServiceType.code];
    }

    get zoneBackupPath() {
        return CONCAT_PATH.opZones_ZoneCode(this.zoneBackupDetail.code);
    }

    cancelEditionEvent() {
        this.cancelEdition.emit();
    }

    saveEditionEvent() {
        const zoneBackupUpdate = {} as IZoneBackupUpdate;
        zoneBackupUpdate.zoneId = this.zoneBackupDetail.id;
        zoneBackupUpdate.preferableLocalBackupToShow = EStateSetting.true;
        zoneBackupUpdate.forceServiceAMPM = this.zoneBackupServiceType.code === EDeliveryServiceType.amPm ?
            CGStateSettingByValue(this._editionBackupServiceTypeDetailForm.stateControl.value) :
            CGStateSettingByState(this.zoneBackupServiceType.forceService);
        zoneBackupUpdate.forceServicePROG = this.zoneBackupServiceType.code === EDeliveryServiceType.scheduled ?
            CGStateSettingByValue(this._editionBackupServiceTypeDetailForm.stateControl.value) :
            CGStateSettingByState(this.zoneBackupServiceType.forceService);
        this.saveEdition.emit(zoneBackupUpdate);
    }
}
