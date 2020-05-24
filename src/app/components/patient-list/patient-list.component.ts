import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { EditSettingsModel, ToolbarItems, IEditCell, SaveEventArgs, Column, Grid } from '@syncfusion/ej2-angular-grids';
import { Uploader, SelectedEventArgs } from '@syncfusion/ej2-inputs';
import { FileInfo } from '@syncfusion/ej2-angular-inputs';

import { Patient } from '../../api/models/patient';
import { PatientService } from '../../api/services/patient.service';
import { ToastService } from '../../services/toast.service';
import { SpinnerComponent } from '../spinner/spinner.component';

import { getDiff } from '../../common/resemble';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements OnInit {
  @ViewChild('grid') grid: Grid;
  @ViewChild('toast') toast: ElementRef;
  @ViewChild('spinner') spinner: SpinnerComponent;

  public data: object[];
  public sortOptions: object;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public numericParams: IEditCell;
  public projectParams: IEditCell;
  public attachmentParams: IEditCell;
  public boolParams: IEditCell;
  public elem: HTMLElement;
  public uploader: Uploader;

  patients: Patient[];

  constructor(
    private patientListService: PatientService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.sortOptions = { columns: [{ field: 'name', direction: 'Ascending' }] };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.numericParams = { params: { decimals: 2 } };
    this.attachmentParams = {
      create: () => {
        this.elem = document.createElement('input');
        return this.elem;
      },
      read: () => {
        if (this.uploader.filesData.length > 0) {
          const file: FileInfo = this.uploader.filesData[0];
          this.uploader.upload(this.uploader.getFilesData()[0]);

          return file.name;
        }
      },
      destroy: () => {
        this.uploader.destroy();
      },
      write: (args) => {
        // Get existing patient row details
        const patient = args.rowData;

        this.uploader = new Uploader({
          autoUpload: false,
          multiple: false,
          files: patient.attachment ? [{ name: patient.attachment, size: 0 }] : undefined,
          selected: eventArgs =>
            this.openFile(eventArgs)
              .then(match => args.rowData.match = match)
        });
        this.uploader.appendTo(this.elem);
      }
    };
    this.boolParams = { params: { checked: true } };

    this.patientListService.getPatients().subscribe({
      next: this.getPatientListSucceeded.bind(this),
      error: this.getPatientListFailed.bind(this)
    });
  }

  openFile(args: SelectedEventArgs): Promise<any> {
    const input = args.event.target as HTMLInputElement;
    const file: File = input.files[0];
    return getDiff(file);
  }

  getPatientListSucceeded(patients: Patient[]) {
    this.patients = patients;
    this.data = patients;

    this.spinner.hide();
    this.toastService.showSuccessToast(this.toast.nativeElement, {
      title: 'Welcome to Angular CRUD demo!',
      content: `${patients.length} patient records retrieved.`
    });
  }

  getPatientListFailed(error: any) {
    this.toastService.showErrorToast(this.toast.nativeElement, {
      title: 'Reading list failed',
      content: 'Is the API server running and CORS configured in the allowed domains?'
    });
    this.spinner.hide();
  }

  addSucceeded(patient: Patient) {
    // Fetch the id for the added row in the grid
    const selectedRow: number = this.grid.getSelectedRowIndexes()[0] || 0;

    // Replace the old row with updated data from the API
    this.data[selectedRow] = { ...this.data[selectedRow], ...patient };
    const row = this.data[selectedRow];
    console.warn('addSucceeded', { selectedRow, patient, row, data: this.data });
    this.grid.refresh();

    this.toastService.showSuccessToast(this.toast.nativeElement, {
      title: 'New patient record added',
      content: `Added patient ${patient.name} into ${patient.project}`
    });
  }

  updateSucceeded(patient: Patient) {
    console.warn('updateSucceeded', patient);
    this.grid.updateRowValue(patient.id, patient)
    this.toastService.showInformationToast(this.toast.nativeElement, {
      title: 'Patient record updated',
      content: `Updated patient ${patient.name} in ${patient.project}`
    });
  }

  deleteSucceeded() {
    this.toastService.showInformationToast(this.toast.nativeElement, {
      title: 'Patient record removed',
      content: `Removed patient from project`
    });
  }

  operationFailed(error: any) {
    console.warn('API Call failed:', error);
    this.toastService.showErrorToast(this.toast.nativeElement, {
      title: 'Operation failed',
      content: 'Is the API server still running?'
    });
  }
  actionComplete(args) {
    console.log("actionComplete", args)
    const dialog = args.dialog as DialogComponent;

    if (dialog) {
      dialog.element.classList.add("AAAAADDDDDDDDEEDD");
      dialog.element.classList.add(args.requestType);
    }
  }
  actionBegin(args) {
    const dialog = args.dialog as DialogComponent;

    if (dialog) {
      dialog.element.classList.add("AAAAADDDDDDDDEEDD");
      dialog.element.classList.add(args.requestType);
    }
    const body: Patient = Array.isArray(args.data) ?
      { ...args.data[0] } as Patient : { ...args.data } as Patient;
    const patientId: number = body.id;

    if (args.rowData && args.rowData.match) {
      body.match = args.rowData.match;
    }

    if (args.requestType === 'delete') {
      this.patientListService.deletePatient({ patientId }).subscribe({
        next: this.deleteSucceeded.bind(this),
        error: this.operationFailed.bind(this)
      });
    }
    if (args.requestType === 'save' && args.action === 'add') {
      console.log("adding ", { args, body })
      this.patientListService.postPatient({ body }).subscribe({
        next: patient => this.addSucceeded(patient),
        error: this.operationFailed.bind(this)
      });
    } else if (args.requestType === 'save' && args.action === 'edit') {
      this.patientListService.updatePatient({ body, patientId }).subscribe({
        next: this.updateSucceeded.bind(this),
        error: this.operationFailed.bind(this)
      });
    }

    console.warn('actionBegin', args);
  }
}
