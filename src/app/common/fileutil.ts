import { FilesPropModel } from '@syncfusion/ej2-angular-inputs';

/**
 * Convert the following string presentation into {@link #FilesPropModel} presentation:
 * ```fileName.ext (<size in kB> kB)```
 *
 * @param text string presenation
 * @returns an object of type {@link #FilesPropModel}
 */
export const stringToFileProp = (text: string): FilesPropModel => {
  const [fileNameMatch, name, type] = text.match(/^([^\.]+)\.?([^\s]+)?/);
  const [sizeMatch, sizePart] = text.match(/\((\d+) kB\)$/) || [];
  const sizeKB = parseInt(sizePart, 10);
  return { name, type, size: isNaN(sizeKB) ? 0 : sizeKB * 1024 };
};

/**
 * Convert the following string presentation into an array of {@link #FilesPropModel}:
 * ```fileName.ext (<size in kB> kB)```
 *
 * @param text string presenation
 * @returns single cell array of {@link #FilesPropModel}, or undefined if text was undefined
 */
export const stringToFilePropArray = (text: string): FilesPropModel[] => {
  return text ? [stringToFileProp(text)] : undefined;
};

/**
 * Convert {@link #FilesPropModel} object into the following string presentation:
 * ```fileName.ext (<size in kB> kB)```
 *
 * @param fileProp file propoerties as {@link #FilesPropModel}
 * @returns string presenation
 */
export const filePropToString = (fileProp: FilesPropModel): string => {
  const name = fileProp.name.replace(new RegExp('\\.' + fileProp.type + '$'), '');

  return `${name}${fileProp.type ? '.' + fileProp.type : ''} (${Math.ceil(fileProp.size / 1024)} kB)`;
};
