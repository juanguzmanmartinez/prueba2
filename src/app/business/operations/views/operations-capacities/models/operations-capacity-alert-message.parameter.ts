export const capacityAlertSuccessMessage = (capacityType: string, capacityValue) => {
  return `Se guardó con éxito la edición de capacidades
            <span class="text-button">${capacityType}</span> para
            <span class="text-button">${capacityValue}.</span>`;
};
