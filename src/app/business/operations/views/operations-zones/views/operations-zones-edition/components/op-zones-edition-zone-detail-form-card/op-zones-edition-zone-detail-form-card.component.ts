import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { CStateName, CStateValue } from '@models/state/state.model';
import { OpZonesEditionZoneDetailFormCardFormService, ZoneDetailControlName } from './form/op-zones-edition-zone-detail-form-card-form.service';
import { ZonesStore } from '../../../../models/operations-zones-store.model';
import { CChannelName, EChannel } from '@models/channel/channel.model';
import { CheckboxGroupControl } from './controls/checkbox-group.control';
import { CCompanyName, ECompany } from '@models/company/company.model';
import { Subscription } from 'rxjs';
import { CZoneLabelColor, EZoneLabel } from '../../../../models/operations-zones-label.model';
import { ETagAppearance } from '@models/tag/tag.model';
import { IZoneDetailUpdate } from '@interfaces/zones/zones.interface';
import { CZoneTypeName, CZoneTypeValue, EZoneType } from '../../../../parameters/operations-zones-type.parameter';

@Component({
    selector: 'app-op-zones-edition-zone-detail-form-card',
    templateUrl: './op-zones-edition-zone-detail-form-card.component.html',
    styleUrls: ['./op-zones-edition-zone-detail-form-card.component.sass'],
    providers: [OpZonesEditionZoneDetailFormCardFormService]
})
export class OpZonesEditionZoneDetailFormCardComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];

    public stateName = CStateName;
    public stateValue = CStateValue;
    public channelName = CChannelName;
    public companyName = CCompanyName;
    public zoneTypeName = CZoneTypeName;
    public zoneTypeValue = CZoneTypeValue;
    public labelColor = CZoneLabelColor;
    public tagAppearance = ETagAppearance;

    public controlNameList = ZoneDetailControlName;
    public storeList: ZonesStore[] = [];
    public storeBackupList: ZonesStore[] = [];
    public companyList: ECompany[] = [];
    public channelList: EChannel[] = [];


    @Input() zoneTypeList: EZoneType[] = [];
    @Input() labelList: EZoneLabel[] = [];
    @Input() zoneDetail: ZoneDetail;

    @Input('companyList')
    set _companyList(companyList: ECompany[]) {
        this.companyList = companyList;
        this.updateCompanyControl();
    }

    @Input('channelList')
    set _channelList(channelList: EChannel[]) {
        this.channelList = channelList;
        this.updateChannelControl();
    }

    @Input('storeList')
    set _storeList(zoneStoreList: ZonesStore[]) {
        this.storeList = zoneStoreList;
    }

    @Output() cancelEdition = new EventEmitter();
    @Output() saveEdition = new EventEmitter<IZoneDetailUpdate>();

    constructor(
        private _editionZoneDetailForm: OpZonesEditionZoneDetailFormCardFormService
    ) {
    }

    ngOnInit(): void {
        this.form.stateControl.patchValue(this.stateValue[this.zoneDetail.state]);

        this.updateZoneDetailForm();
        this.updateStateControl();
    }

    get form() {
        return this._editionZoneDetailForm;
    }

    updateZoneDetailForm() {
        this.form.assignedStoreControl.patchValue(this.zoneDetail.assignedStore);
        this.form.zoneTypeControl.patchValue(this.zoneDetail.zoneType);
        this.form.labelControl.patchValue(this.zoneDetail.label);
        this.form.companyArray.controls.forEach((companyGroup: CheckboxGroupControl) => {
            const checkedCompany = this.zoneDetail.companyList
                .find((company: ECompany) => companyGroup.valueControl?.value === company);
            companyGroup.checkedControl?.patchValue(!!checkedCompany);
        });
        this.form.channelArray.controls.forEach((channelGroup: CheckboxGroupControl) => {
            const checkedChannel = this.zoneDetail.channelList
                .find((channel: EChannel) => channelGroup.valueControl?.value === channel);
            channelGroup.checkedControl?.patchValue(!!checkedChannel);
        });
        this.checkEditionByStateControl();
    }

    checkEditionByStateControl() {
        if (this.form.stateControl.value) {
            this.form.assignedStoreControl.enable();
            this.form.zoneTypeControl.enable();
            this.form.companyArray.enable();
            this.form.channelArray.enable();
            this.form.labelControl.enable();
        } else {
            this.form.assignedStoreControl.disable();
            this.form.zoneTypeControl.disable();
            this.form.companyArray.disable();
            this.form.channelArray.disable();
            this.form.labelControl.disable();
        }
    }

    updateStateControl() {
        const subscription = this.form.stateControl.valueChanges
            .subscribe(() => {
                if (this.form.stateControl.value === false) {
                    this.updateZoneDetailForm();
                }
                this.checkEditionByStateControl();
            });
        this.subscriptions.push(subscription);
    }

    updateCompanyControl() {
        this.form.companyArray.clear();
        this.companyList.forEach((company) => {
            const companyGroup = this.form.createCompanyGroup(company);
            this.form.companyArray.push(companyGroup);
        });
        this.updateZoneDetailForm();
    }

    updateChannelControl() {
        this.form.channelArray.clear();
        this.channelList.forEach((channel) => {
            const channelGroup = this.form.createChannelGroup(channel);
            this.form.channelArray.push(channelGroup);
        });
        this.updateZoneDetailForm();
    }

    updateLabelControl() {
        this.form.labelControl.patchValue(null);
    }

    assignedStoreOptionName(option: ZonesStore) {
        return option ? `${option.code} ${option.name}` : '';
    }

    cancelEditionEvent() {
        this.cancelEdition.emit();
    }

    saveEditionEvent() {
        const zoneDetailUpdate = {} as IZoneDetailUpdate;
        zoneDetailUpdate.enabled = this.form.stateControl.value;
        if (zoneDetailUpdate.enabled) {
            const assignedStore = this.form.assignedStoreControl.value as ZonesStore;
            zoneDetailUpdate.fulfillmentCenterCode = assignedStore.code;
            zoneDetailUpdate.backUpZone = this.zoneTypeValue[this.form.zoneTypeControl.value];
            zoneDetailUpdate.zoneType = this.form.labelControl.value;
            zoneDetailUpdate.companyCode = this.form.companyArray.value
                .filter((company) => company[this.controlNameList.companyChecked])
                .map((company) => company[this.controlNameList.companyName]);
            zoneDetailUpdate.channel = this.form.channelArray.value
                .filter((channel) => channel[this.controlNameList.channelChecked])
                .map((channel) => channel[this.controlNameList.channelName]);
        } else {
            zoneDetailUpdate.fulfillmentCenterCode = this.zoneDetail.assignedStore.code;
            zoneDetailUpdate.backUpZone = this.zoneTypeValue[this.zoneDetail.zoneType];
            zoneDetailUpdate.zoneType = this.zoneDetail.label;
            zoneDetailUpdate.companyCode = this.zoneDetail.companyList;
            zoneDetailUpdate.channel = this.zoneDetail.channelList;
        }
        this.saveEdition.emit(zoneDetailUpdate);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
