import { isArray } from '@helpers/objects-equal.helper';

export function convertToCSV(array: any[], headers: string[]) {
    const json: any[] = isArray(array) ? array : [];
    const keysHeader = Object.keys(json[0]);
    const validHeader = headers?.length ? headers : keysHeader;

    const replacer = (key, value) => value === null ? '' : value;
    return [
        validHeader.join(','),
        ...json.map(row => keysHeader.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n');

}

export function exportCSVFile(array: any[], headers: string[], fileTitle: string = 'export') {
    const json = convertToCSV(array, headers);

    const exportedFileName = `${fileTitle}.csv`;
    const blob = new Blob(['\ufeff', json], {type: 'text/csv;charset=utf-8;'});

    if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, exportedFileName);
    } else {
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', exportedFileName);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    }
}
