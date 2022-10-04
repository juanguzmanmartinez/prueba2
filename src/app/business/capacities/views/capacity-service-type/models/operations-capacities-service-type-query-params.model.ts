import { ECapacityStepGroupOrDrugstore } from '../components/op-capacities-step-group-or-drugstore/op-capacities-step-group-or-drugstore.service';
import { ECapacitiesStepEditionMode } from '../components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';

export interface IOpCapacitiesServiceTypeQueryParams {
  groupOrDrugstore: ECapacityStepGroupOrDrugstore;
  drugstoreCode: string;
  editionMode: ECapacitiesStepEditionMode;
  mode: string;
}

export interface IDrugStoreIntervalTimeQueryParams {
  drugStoreCode: string;
  drugStoreName: string;
}
