export function minuteFormat(minute: number) {
    const pluralLetter = minute === 1 ? '' : 's';
    return `${minute} minuto${pluralLetter}`;
}
