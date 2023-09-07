export const ascendingSortString = (a, b, column) =>
  a[column].localeCompare(b[column], undefined, {
    sensitivity: 'base',
  });

export const descendingSortString = (a, b, column) =>
  b[column].localeCompare(a[column], undefined, {
    sensitivity: 'base',
  });
