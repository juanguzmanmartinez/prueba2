export function normalizeValue(value: string): string {
  const validValue = typeof value === 'string' || typeof value === 'number' ? value.toString() : '';
  return validValue.toLowerCase().replace(/\s/g, '');
}

export function StringAlphanumeric(value: string): string {
  return value.replace(/[^a-zA-Z0-9]/g, '');
}
