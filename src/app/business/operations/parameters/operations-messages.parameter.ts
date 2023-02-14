export const OperationMessages = {
  successServiceTypeEdition: (serviceTypeName: string, parentName: string) => {
    return `Se guardó con éxito la nueva configuración de tipo de servicio <span class="text-h5">${serviceTypeName}</span> para <span class="text-h5">${parentName}</span>`;
  },
  errorServiceTypeEdition: (serviceTypeName: string, parentName: string) => {
    return (
      `Hubo un error al guardar la configuración de <span class="text-h5">tipo de despacho ${serviceTypeName} </span> ` +
      `para <span class="text-h5"> ${parentName}</span>, por favor vuelve a intentarlo.`
    );
  },
  successOperationEdition: (parentName: string) => {
    return `Se guardó con éxito la nueva configuración de la zona principal <span class="text-h5">${parentName}</span>`;
  },
  errorOperationEdition: (parentName: string) => {
    return `Hubo un error al guardar la configuración de <span class="text-h5">${parentName}, por favor vuelve a intentarlo.</span>`;
  },

  successEditionBackup: (parentName: string) => {
    return `Se guardó con éxito la nueva configuración de stock backup para <span class="text-h5">${parentName}</span>`;
  },

  successEditionBackupServiceType: (
    serviceTypeName: string,
    parentName: string
  ) => {
    return `Se guardó con éxito la nueva configuración de stock backup para el servicio <span class="text-h5">${serviceTypeName}</span> en <span class="text-h5">${parentName}</span>`;
  },

  successServiceTypeRegistered: (
    serviceTypeName: string,
    parentName: string
  ) => {
    return `¡Listo! Se guardó con éxito la edición de capacidades <span class="text-h5">${serviceTypeName}</span> para <span class="text-h5">${parentName}</span>`;
  },
  errorServiceTypeRegistered: (serviceTypeName: string, parentName: string) => {
    return `No se pudo guardar <span class="text-h5">${serviceTypeName}</span> para <span class="text-h5">${parentName}</span>, por favor vuelve a intentarlo.`;
  },
  warningServiceTypeDependency: (
    serviceTypeName: string,
    parentName: string
  ) => {
    return `${parentName} no tiene activo el <span class="text-h5">tipo de despacho ${serviceTypeName}</span>, por favor primero activalo en el local y vuelve a intentarlo.`;
  },

  successIntervalTimeExpressEdition: (drugStoreName: string) => {
    return `<span class="text-body-2-regular text-gray-90">Se realizó la configuración de la capacidad e intervaltime flexible en el servicio express del local ${drugStoreName}</span>`;
  },
  successIntervalTimeActiveParams: (drugStoreName: string) => {
    return `<span class="text-body-2-regular text-gray-90">Se activaron los parámetros flexibles para el servicio express del local ${drugStoreName}</span>`;
  },
  successIntervalTimeDesactiveParams: (drugStoreName: string) => {
    return `<span class="text-body-2-regular text-gray-90">Se desactivaron los parámetros flexibles para el servicio express del local ${drugStoreName}</span>`;
  },
  errorIntervalTimeExpressEdition: (drugStoreName: string) => {
    return `Hubo un error al realizar la configuración de la capacidad e intervaltime flexible para el servicio express del local ${drugStoreName}, por favor, intenta de nuevo.`;
  },
};
