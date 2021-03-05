export const ZonesMessages = {
    successServiceTypeEdition: (serviceTypeName: string, zoneName: string) => {
        return `Se guardó con éxito la nueva configuración de <span class="text-button">tipo de despacho ${serviceTypeName} para ${zoneName}.</span>`;
    },
    errorServiceTypeEdition: (serviceTypeName: string, zoneName: string) => {
        return `Hubo un error al guardar la configuración de <span class="text-button">tipo de despacho ${serviceTypeName} para ${zoneName}, por favor vuelve a intentarlo.</span>`;
    },
    successZoneEdition: (zoneName: string) => {
        return `Se guardó con éxito la nueva configuración de <span class="text-button">${zoneName}.</span>`;
    },
    errorZoneEdition: (zoneName: string) => {
        return `Hubo un error al guardar la configuración de <span class="text-button">${zoneName}, por favor vuelve a intentarlo.</span>`;
    },
    successServiceTypeRegistered: (serviceTypeName: string, zoneName: string) => {
        return `Se registró con éxito el <span class="text-button">tipo de despacho ${serviceTypeName} para ${zoneName}.</span>`;
    },
    errorServiceTypeRegistered: (serviceTypeName: string, zoneName: string) => {
        return `Hubo un error al registrar el <span class="text-button">tipo de despacho ${serviceTypeName} para ${zoneName}, por favor vuelve a intentarlo.</span>`;
    }
};
