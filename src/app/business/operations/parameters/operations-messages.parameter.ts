export const OperationMessages = {
    successServiceTypeEdition: (serviceTypeName: string, parentName: string) => {
        return `¡Listo! Se guardó con éxito la nueva configuración de <span class="text-h5">tipo de despacho ${serviceTypeName}</span> para <span class="text-h5">${parentName}</span>`;
    },
    errorServiceTypeEdition: (serviceTypeName: string, parentName: string) => {
        return `Hubo un error al guardar la configuración de <span class="text-h5">tipo de despacho ${serviceTypeName} </span> ` +
            `para <span class="text-h5"> ${parentName}</span>, por favor vuelve a intentarlo.`;
    },
    successOperationEdition: (parentName: string) => {
        return `¡Listo! Se guardó con éxito la nueva configuración de <span class="text-h5">${parentName}</span>`;
    },
    errorOperationEdition: (parentName: string) => {
        return `Hubo un error al guardar la configuración de <span class="text-h5">${parentName}, por favor vuelve a intentarlo.</span>`;
    },
    successServiceTypeRegistered: (serviceTypeName: string, parentName: string) => {
        return `¡Listo! Se guardó con éxito la edición de capacidades <span class="text-h5">${serviceTypeName}</span> para <span class="text-h5">${parentName}</span>`;
    },
    errorServiceTypeRegistered: (serviceTypeName: string, parentName: string) => {
        return `No se pudo guardar <span class="text-h5">${serviceTypeName}</span> para <span class="text-h5">${parentName}</span>, por favor vuelve a intentarlo.`;
    },
    warningServiceTypeDependency: (serviceTypeName: string, parentName: string) => {
        return `${parentName} no tiene activo el <span class="text-h5">tipo de despacho ${serviceTypeName}</span>, por favor primero activalo en el local y vuelve a intentarlo.`;
    }
};
