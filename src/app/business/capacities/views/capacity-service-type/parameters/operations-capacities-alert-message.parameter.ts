export const capacityAlertSuccessMessage = (
  capacityType: string,
  capacityValue
) => {
  return `<span class="text-body-2-regular text-gray-90">Se realizó la edición de capacidad en el servicio <span class="text-lowercase">${capacityType}</span>
          para el local ${capacityValue}</span>`;
};
