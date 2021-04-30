export function sortByPresetOrder(array: string[], presetOrderArray: string[]) {
    const result = [];
    let presetOrder;
    presetOrderArray.forEach((presetElement) => {
        presetOrder = array.indexOf(presetElement);
        if (presetOrder !== -1) {
            result.push(array.splice(presetOrder, 1)[0]);
        }
    });
    return result.concat(array);
}


export function SortAlphanumeric(a, b, direction: string) {
    switch (direction) {
        case 'asc':
            return a - b;
        case 'desc':
            return b - a;
        default:
            return 0;
    }
}

export function SortString(a: string, b: string, direction: string): number {
    const valueA = a ? a.toUpperCase() : '';
    const valueB = b ? b.toUpperCase() : '';
    switch (direction) {
        case 'asc':
            return valueA.localeCompare(valueB, undefined, {sensitivity: 'base'});
        case 'desc':
            return  valueB.localeCompare(valueA, undefined, {sensitivity: 'base'});
        default:
            return 0;
    }
}
