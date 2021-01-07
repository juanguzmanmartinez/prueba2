import { ECapacityStepGroupOrLocal } from '../components/op-capacities-step-group-or-local/op-capacities-step-group-or-local.service';
import { ECapacitiesStepEditionMode } from '../components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';

export interface IOpCapacitiesServiceTypeQueryParams {
    groupOrLocal: ECapacityStepGroupOrLocal;
    localCode: string;
    editionMode: ECapacitiesStepEditionMode;
}
