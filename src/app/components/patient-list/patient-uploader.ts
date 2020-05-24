import { FileInfo, Uploader } from '@syncfusion/ej2-angular-inputs';
import { EditSettingsModel, ToolbarItems, IEditCell, SaveEventArgs, Column, Grid } from '@syncfusion/ej2-angular-grids';
import { filePropToString, stringToFilePropArray } from 'src/app/common/fileutil';
import { Patient } from 'src/app/api/models';
import { compareFile } from 'src/app/common/resemble';

export class PatientUploader implements IEditCell {
  public element: HTMLElement;
  public uploader: Uploader;

  public create() {
    this.element = document.createElement('input');
    console.warn('CREATE');
    return this.element;
  }

  public read() {
    console.warn('READ');

    if (this.uploader.filesData.length > 0) {
      const file: FileInfo = this.uploader.filesData[0];
      this.uploader.upload(this.uploader.getFilesData()[0]);

      return filePropToString(file);
    }
  }

  public destroy() {
    this.uploader.destroy();
  }

  public write(args: SaveEventArgs) {
    console.warn('WRITE');

    // Get existing patient row details
    const patient = args.rowData as Patient;

    // Build the file upload input
    this.uploader = new Uploader({
      autoUpload: false,
      multiple: false,
      files: stringToFilePropArray(patient.attachment),
      selected: eventArgs =>
        compareFile(eventArgs).then(match => patient.match = match)
    });
    this.uploader.appendTo(this.element);
  }
}
