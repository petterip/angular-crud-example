import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { EditSettingsModel, ToolbarItems, IEditCell, SaveEventArgs, DataStateChangeEventArgs, Column, Grid } from '@syncfusion/ej2-angular-grids';
import { Uploader, SelectedEventArgs } from '@syncfusion/ej2-inputs';
import { FileInfo } from '@syncfusion/ej2-angular-inputs';

import { Patient } from '../../api/models/patient';
import { PatientService } from '../../api/services/patient.service';
import { ToastService } from '../../services/toast.service';
import { SpinnerComponent } from '../spinner/spinner.component';

import { getDiff } from '../../common/resemble';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements OnInit {
  @ViewChild("grid") grid: Grid;
  @ViewChild("toast") toast: ElementRef;
  @ViewChild('spinner') spinner: SpinnerComponent;

  public data: object[];
  public sortOptions: object;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public numericParams: IEditCell;
  public archiveParams: IEditCell;
  public dpParams: IEditCell;
  public boolParams: IEditCell;
  public elem: HTMLElement;
  public uploadObj: Uploader;

  patients: Patient[];

  constructor(
    private patientListService: PatientService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.sortOptions = { columns: [{ field: 'name', direction: 'Ascending' }] };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.numericParams = { params: { decimals: 2, value: 5 } };
    // this.dpParams = { params: { value: new Date() } };
    this.dpParams = {
      create: () => {
        this.elem = document.createElement('input');
        console.warn("CREATE!!!")
        return this.elem;
      },
      read: () => {
        if (this.uploadObj.filesData.length > 0) {
          //Here return the value to be updated in Grid
          console.warn("READ!!!", this.uploadObj.filesData);
          const file: FileInfo = this.uploadObj.filesData[0];

          console.warn("files=", this.uploadObj.getFilesData()[0])
          this.uploadObj.upload(this.uploadObj.getFilesData()[0]);


          return file.name;
        }
      },
      destroy: () => {
        this.uploadObj.destroy();
      },
      write: (args: { rowData: Object, column: Column }) => {
        const patient = args.rowData as Patient;
        console.warn("WRITE!!!", args.rowData)

        this.uploadObj = new Uploader({
          autoUpload: true,
          multiple: false,
          files: patient.attachment ? [{ name: patient.attachment, size: 0 }] : undefined,
          selected: sel => {
            console.warn("SELECTED", sel);
            this.openFile(sel);

          },
          actionComplete: () => {
            console.warn("DONE!!!!!!!!!!!!!!!!!")
          }
        });
        this.uploadObj.appendTo(this.elem);
        this.uploadObj.actionComplete
      }
    };
    this.boolParams = { params: { checked: true } };

    this.patientListService.getPatients().subscribe(
      this.getPatientListSucceeded.bind(this),
      this.getPatientListFailed.bind(this)
    );
  }

  openFile(args: SelectedEventArgs) {
    const input = args.event.target as HTMLInputElement;
    for (var index = 0; index < input.files.length; index++) {
      getDiff(input.files[index]).then(result => alert("Result: " + result.misMatchPercentage));
    };
  }

  getPatientListSucceeded(patients: Patient[]) {
    this.patients = patients;
    this.data = patients;

    this.spinner.hide();
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
    console.warn("addSucceeded", patient, this.data);

    // Update the received id to the grid
    this.grid.setCellValue(undefined, 'id', patient.id);

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
