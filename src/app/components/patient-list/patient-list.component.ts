/**
 * Component for rendering the patient grid. The grid has a toolbar for all the CRUD functionalities.
 */
import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { EditSettingsModel, ToolbarItems, IEditCell, Grid } from '@syncfusion/ej2-angular-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { Uploader } from '@syncfusion/ej2-inputs';

import { PatientService } from '../../api/services/patient.service';
import { ToastService } from '../../services/toast.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Patient } from '../../api/models/patient';

import { PatientUploader } from './patient-uploader';
import { UNNAMED } from '../../common/constant';

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
  public patientUploader: PatientUploader;

  patients: Patient[];

  constructor(
    private patientListService: PatientService,
    private toastService: ToastService) {
    this.patientUploader = new PatientUploader();
  }

  ngOnInit() {
    // Grid settings
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.sortOptions = { columns: [{ field: 'name', direction: 'Ascending' }] };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.numericParams = { params: { decimals: 2 } };
    this.attachmentParams = {
      create: this.patientUploader.create,
      read: this.patientUploader.read,
      destroy: this.patientUploader.destroy,
      write: this.patientUploader.write,
    };

    // Fetch a list of all the patients
    this.patientListService.getPatients().subscribe({
      next: this.getPatientListSucceeded.bind(this),
      error: this.getPatientListFailed.bind(this)
    });
  }

  // Fetching the list succeeded
  getPatientListSucceeded(patients: Patient[]): void {
    this.patients = patients;
    this.data = patients;

    this.spinner.hide();
    this.toastService.showSuccessToast(this.toast.nativeElement, {
      title: 'Welcome to Angular CRUD demo!',
      content: `${patients.length} patient records retrieved.`
    });
  }

  // Show a toast of fetching the list failed
  getPatientListFailed(error: any): void {
    this.toastService.showErrorToast(this.toast.nativeElement, {
      title: 'Reading list failed',
      content: 'Is the API server running and CORS configured in the allowed domains?'
    });
    this.spinner.hide();
  }

  // Show a toast of adding new patient entity succeeded
  addSucceeded(patient: Patient): void {
    // Fetch the id for the added row in the grid
    const selectedRow: number = this.grid.getSelectedRowIndexes()[0] || 0;

    // Replace the old row with updated data from the API
    this.data[selectedRow] = { ...this.data[selectedRow], ...patient };
    const row = this.data[selectedRow];
    this.grid.refresh();

    this.toastService.showSuccessToast(this.toast.nativeElement, {
      title: 'New patient record added',
      content: `Added patient ${patient.name || UNNAMED} into ${patient.project || UNNAMED}`
    });
  }

  // Show a toast of updating an existing patient entity succeeded
  updateSucceeded(patient: Patient): void {
    this.grid.updateRowValue(patient.id, patient)
    this.toastService.showInformationToast(this.toast.nativeElement, {
      title: 'Patient record updated',
      content: `Updated patient ${patient.name || UNNAMED} in ${patient.project || UNNAMED}`
    });
  }

  // Show a toast of removing a patient entity succeeded
  deleteSucceeded(): void {
    this.toastService.showInformationToast(this.toast.nativeElement, {
      title: 'Patient record removed',
      content: `Removed patient from project`
    });
  }

  // Show a toast of an error making an API call
  operationFailed(error: any): void {
    this.toastService.showErrorToast(this.toast.nativeElement, {
      title: 'Operation failed',
      content: 'Is the API server still running?'
    });
  }

  // Add a CSS class to the Add/Edit dialog to separate the two
  actionComplete(args): void {
    const dialog = args.dialog as DialogComponent;

    if (dialog) {
      dialog.element.classList.add(args.requestType);
    }
  }

  // Initiate an API call for the CRUD operations
  actionBegin(args): void {
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
  }
}
