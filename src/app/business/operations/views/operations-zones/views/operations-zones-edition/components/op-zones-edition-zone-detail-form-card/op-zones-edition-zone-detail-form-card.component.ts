import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { CStateName, CStateValue } from '@models/state/state.model';
import { OpZonesEditionZoneDetailFormCardFormService, ZoneDetailControlName } from './form/op-zones-edition-zone-detail-form-card-form.service';
import { ZonesStore } from '../../../../models/operations-zones-store.model';
import { CChannelName, EChannel } from '@models/channel/channel.model';
import { FormGroup } from '@angular/forms';
import { CCompanyName, ECompany } from '@models/company/company.model';
import { Subscription } from 'rxjs';
import { CZoneLabelColor, EZoneLabel } from '../../../../models/operations-zones-label.model';
import { ETagAppearance } from '@models/tag/tag.model';
import { IZoneDetailUpdate } from '@interfaces/zones/zones.interface';

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
    public labelColor = CZoneLabelColor;
    public tagAppearance = ETagAppearance;

    private noStoreBackup: ZonesStore = {name: 'Sin local backup', code: '', services: []} as ZonesStore;
    public controlName = ZoneDetailControlName;
    public storeList: ZonesStore[] = [];
    public storeBackupList: ZonesStore[] = [];
    public channelList: EChannel[] = [];


    @Input() companyList: ECompany[] = [];
    @Input() labelList: EZoneLabel[] = [];
    @Input() zoneDetail: ZoneDetail;

    @Input('channelList')
    set _channelList(channelList: EChannel[]) {
        this.channelList = channelList;
        this.updateChannelControl();
    }

    @Input('storeList')
    set _storeList(zoneStoreList: ZonesStore[]) {
        this.storeList = zoneStoreList;
        this.storeBackupList = !!zoneStoreList.length ? [this.noStoreBackup, ...zoneStoreList] : [];
    }

    @Output() cancelEdition = new EventEmitter();
    @Output() saveEdition = new EventEmitter<IZoneDetailUpdate>();

    constructor(
        public _editionZoneDetailForm: OpZonesEditionZoneDetailFormCardFormService
    ) {
    }

    ngOnInit(): void {
        this._editionZoneDetailForm.stateControl.patchValue(this.stateValue[this.zoneDetail.state]);
        this._editionZoneDetailForm.assignedStoreBackupControl.disable();

        this.updateZoneDetailForm();
        this.updateStateControl();
    }

    updateZoneDetailForm() {
        this._editionZoneDetailForm.assignedStoreControl.patchValue(this.zoneDetail.assignedStore);
        this._editionZoneDetailForm.assignedStoreBackupControl.patchValue(this.noStoreBackup);
        this._editionZoneDetailForm.companyControl.setValue(this.zoneDetail.company);
        this._editionZoneDetailForm.labelControl.patchValue(this.zoneDetail.label);
        this._editionZoneDetailForm.channelArray.controls.forEach((channelGroup: FormGroup) => {
            const checkedChannel = this.zoneDetail.channelList
                .find((channel: EChannel) => channelGroup.value.name === channel);
            this._editionZoneDetailForm.getChannelChildCheckedControl(channelGroup)?.patchValue(!!checkedChannel);
        });
        this.checkEditionByStateControl();
    }

    checkEditionByStateControl() {
        if (this._editionZoneDetailForm.stateControl.value) {
            this._editionZoneDetailForm.assignedStoreControl.enable();
            this._editionZoneDetailForm.companyControl.enable();
            this._editionZoneDetailForm.channelArray.enable();
            this._editionZoneDetailForm.labelControl.enable();
        } else {
            this._editionZoneDetailForm.assignedStoreControl.disable();
            this._editionZoneDetailForm.companyControl.disable();
            this._editionZoneDetailForm.channelArray.disable();
            this._editionZoneDetailForm.labelControl.disable();
        }
    }

    updateStateControl() {
        const subscription = this._editionZoneDetailForm.stateControl.valueChanges
            .subscribe(() => {
                if (this._editionZoneDetailForm.stateControl.value === false) {
                    this.updateZoneDetailForm();
                }
                this.checkEditionByStateControl();
            });
        this.subscriptions.push(subscription);
    }

    updateChannelControl() {
        this._editionZoneDetailForm.channelArray.clear();
        this.channelList.forEach((channel) => {
            const channelGroup = this._editionZoneDetailForm.createChannelChildGroup(channel);
            this._editionZoneDetailForm.channelArray.push(channelGroup);
        });
        this.updateZoneDetailForm();
    }

    updateLabelControl() {
        this._editionZoneDetailForm.labelControl.patchValue(null);
    }

    assignedStoreOptionName(option: ZonesStore) {
        return `${option.code} ${option.name}`;
    }

    cancelEditionEvent() {
        this.cancelEdition.emit();
    }

    saveEditionEvent() {
        const zoneDetailUpdate = {} as IZoneDetailUpdate;
        zoneDetailUpdate.enabled = this._editionZoneDetailForm.stateControl.value;
        if (zoneDetailUpdate.enabled) {
            const assignedStore = this._editionZoneDetailForm.assignedStoreControl.value as ZonesStore;
            zoneDetailUpdate.fulfillmentCenterCode = assignedStore.code;
            zoneDetailUpdate.zoneType = this._editionZoneDetailForm.labelControl.value;
            zoneDetailUpdate.companyCode = this._editionZoneDetailForm.companyControl.value;
            const channelList = this._editionZoneDetailForm.channelArray.value as { name: EChannel, checked: boolean }[];
            zoneDetailUpdate.channel = channelList.filter((channel) => channel.checked)
                .map((channel) => channel.name);
        } else {
            zoneDetailUpdate.fulfillmentCenterCode = this.zoneDetail.assignedStore.code;
            zoneDetailUpdate.zoneType = this.zoneDetail.label;
            zoneDetailUpdate.companyCode = this.zoneDetail.company;
            zoneDetailUpdate.channel = this.zoneDetail.channelList;
        }
        this.saveEdition.emit(zoneDetailUpdate);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
