export const reformatCamelCase = (value: string): string => {
  let formattedText = '';
  const arrayWords = value.split(' ');
  arrayWords.forEach(word => {
    const firstLetter = word.slice(0, 1).toUpperCase();
    const restOfTheWord = word.slice(1).toLowerCase();
    formattedText += `${firstLetter}${restOfTheWord} `;
  });
  return formattedText.trim();
};
