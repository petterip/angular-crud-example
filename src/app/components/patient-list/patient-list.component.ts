import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { EditSettingsModel, ToolbarItems, IEditCell, SaveEventArgs, DataStateChangeEventArgs } from '@syncfusion/ej2-angular-grids';

import { Patient } from '../../models/Patient';
// import { PatientListService } from '../../services/patient-list.service';
import { PatientService } from '../../services/patient.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements OnInit {
  @ViewChild("toast") toast: ElementRef;

  public data: object[];
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
      this.fetchSucceeded.bind(this),
      this.fetchFailed.bind(this)
    );
  }

  fetchSucceeded(patients: Patient[]) {
    this.patients = patients;

    this.data = patients;
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
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

  fetchFailed(error: any) {
    this.toastService.showErrorToast(this.toast.nativeElement, {
      title: 'Reading list failed',
      content: 'Backend service failed to respond.'
    })
  }

  actionBegin(args: SaveEventArgs) {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      // this.orderData = Object.assign({}, args.rowData);
    }
    if (args.requestType === 'save') {
      const patient: Patient = <Patient>{ ...args.data };
      this.patientListService.updatePatient(patient, patient.id).subscribe(
        this.fetchSucceeded.bind(this),
        this.fetchFailed.bind(this)
      );
      // cast string to integer value.
      // const OrderDate = 'OrderDate';
      // args.data[OrderDate] = this.orderData[OrderDate];
    }
    console.warn("actionBegin", args);
  }
  dataStateChange(args: DataStateChangeEventArgs) {
    console.warn("dataStateChange", args);
  }
}
