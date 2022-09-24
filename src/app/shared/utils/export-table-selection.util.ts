import * as XLSX from 'xlsx';

const getFileName = (name: string, withoutDate?: boolean) => {
  const timeSpan = new Date().toISOString();
  const sheetName = name || 'ExportResult';
  const fileName = withoutDate
    ? `${sheetName}-${timeSpan.slice(0, 10)}`
    : `${sheetName}-${timeSpan}`;
  return {
    sheetName,
    fileName,
  };
};

export class ExportTableSelection {
  static exportTableToExcel(tableId: string, name?: string) {
    const { sheetName, fileName } = getFileName(name);
    const targetTableElm = document.getElementById(tableId);
    const wb = XLSX.utils.table_to_book(targetTableElm, {
      sheet: sheetName,
    } as XLSX.Table2SheetOpts);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  static exportArrayToExcel(arr: any[], name?: string, withoutDate?: boolean) {
    const { sheetName, fileName } = getFileName(name, withoutDate);
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(arr);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
}
