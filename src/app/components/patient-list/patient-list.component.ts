import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';

import { Patient } from '../../models/Patient';
import { PatientListService } from '../../services/patient-list.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements OnInit {
  @ViewChild("toast") toast: ElementRef;

  patients: Patient[];

  constructor(
    private patientListService: PatientListService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.patientListService.getPatientList().subscribe(
      this.fetchSucceeded.bind(this),
      this.fetchFailed.bind(this)
    );
  }

  fetchSucceeded(patients: Patient[]) {
    this.patients = patients;

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
}
