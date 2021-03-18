export const OperationMessages = {
    successServiceTypeEdition: (serviceTypeName: string, parentName: string) => {
        return `Se guardó con éxito la nueva configuración de <span class="text-button">tipo de despacho ${serviceTypeName} para ${parentName}.</span>`;
    },
    errorServiceTypeEdition: (serviceTypeName: string, parentName: string) => {
        return `Hubo un error al guardar la configuración de <span class="text-button">tipo de despacho ${serviceTypeName} para ${parentName}, por favor vuelve a intentarlo.</span>`;
    },
    successOperationEdition: (parentName: string) => {
        return `Se guardó con éxito la nueva configuración de <span class="text-button">${parentName}.</span>`;
    },
    errorOperationEdition: (parentName: string) => {
        return `Hubo un error al guardar la configuración de <span class="text-button">${parentName}, por favor vuelve a intentarlo.</span>`;
    },
    successServiceTypeRegistered: (serviceTypeName: string, parentName: string) => {
        return `Se registró con éxito el <span class="text-button">tipo de despacho ${serviceTypeName} para ${parentName}.</span>`;
    },
    errorServiceTypeRegistered: (serviceTypeName: string, parentName: string) => {
        return `Hubo un error al registrar el <span class="text-button">tipo de despacho ${serviceTypeName} para ${parentName}, por favor vuelve a intentarlo.</span>`;
    }
};
