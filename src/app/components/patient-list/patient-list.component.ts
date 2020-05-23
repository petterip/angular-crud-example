import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { EditSettingsModel, ToolbarItems, IEditCell, SaveEventArgs, DataStateChangeEventArgs } from '@syncfusion/ej2-angular-grids';

import { Patient } from '../../api/models/Patient';
import { PatientService } from '../../api/services/patient.service';
import { ToastService } from '../../services/toast.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements OnInit {
  @ViewChild("toast") toast: ElementRef;
  @ViewChild('spinner') spinner: SpinnerComponent;

  public data: object[];
  public sortOptions: object;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public numericParams: IEditCell;
  public ddParams: IEditCell;
  public dpParams: IEditCell;
  public boolParams: IEditCell;

  patients: Patient[];

  constructor(
    private patientListService: PatientService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.patientListService.getPatients().subscribe(
      this.getPatientListSucceeded.bind(this),
      this.getPatientListFailed.bind(this)
    );
  }

  getPatientListSucceeded(patients: Patient[]) {
    // hideSpinner(this.spinner.nativeElement);

    // this.grid.showSpinner();

    //setTimeout(() => this.grid.hideSpinner(), 3000);

    this.spinner.hide();

    this.patients = patients;

    this.data = patients;
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.sortOptions = { columns: [{ field: 'name', direction: 'Ascending' }] };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.numericParams = { params: { decimals: 2, value: 5 } };
    this.ddParams = { params: { value: 'Germany' } };
    this.dpParams = { params: { value: new Date() } };
    this.boolParams = { params: { checked: true } };

    this.toastService.showSuccessToast(this.toast.nativeElement, {
      title: 'Welcome to Angular CRUD demo!',
      content: `${patients.length} patient records retrieved.`
    })
  }

  getPatientListFailed(error: any) {
    this.toastService.showErrorToast(this.toast.nativeElement, {
      title: 'Reading list failed',
      content: 'Is the API server running and CORS configured in the allowed domains?'
    })
    this.spinner.hide();
  }

  addSucceeded(patient: Patient) {
    console.warn("addSucceeded", patient)

    this.toastService.showSuccessToast(this.toast.nativeElement, {
      title: 'New patient record added',
      content: `Added patient ${patient.name} into ${patient.project}`
    })
  }

  updateSucceeded(patient: Patient) {
    console.warn("updateSucceeded", patient)
    this.toastService.showInformationToast(this.toast.nativeElement, {
      title: 'Patient record updated',
      content: `Updated patient ${patient.name} in ${patient.project}`
    })
  }

  deleteSucceeded() {
    this.toastService.showInformationToast(this.toast.nativeElement, {
      title: 'Patient record removed',
      content: `Removed patient from project`
    })
  }

  operationFailed(error: any) {
    console.warn("API Call failed:", error);
    this.toastService.showErrorToast(this.toast.nativeElement, {
      title: 'Operation failed',
      content: 'Is the API server still running?'
    })
  }

  actionBegin(args: SaveEventArgs) {
    const body: Patient = Array.isArray(args.data) ?
      <Patient>{ ...args.data[0] } : <Patient>{ ...args.data };
    const patientId: number = body.id;

    if (args.requestType === 'delete') {
      console.warn("delete ", patientId, body)
      this.patientListService.deletePatient({ patientId }).subscribe(
        this.deleteSucceeded.bind(this),
        this.operationFailed.bind(this)
      );
    }
    if (args.requestType === 'save' && args.action === 'add') {
      this.patientListService.postPatient({ body }).subscribe(
        this.addSucceeded.bind(this),
        this.operationFailed.bind(this)
      );
    } else if (args.requestType === 'save' && args.action === 'edit') {
      this.patientListService.updatePatient({ body, patientId }).subscribe(
        this.updateSucceeded.bind(this),
        this.operationFailed.bind(this)
      );
    }

    console.warn("actionBegin", args);
  }
}
