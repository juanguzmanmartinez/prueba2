export function normalizeValue(value: string): string {
  const validValue = typeof value === 'string' || typeof value === 'number' ? value.toString() : '';
  return validValue.toLowerCase().replace(/\s/g, '');
}
