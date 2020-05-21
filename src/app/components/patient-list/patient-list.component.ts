import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/Patient';
import { PatientListService } from '../../services/patient-list.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements OnInit {
  patients: Patient[];

  constructor(private patientListService: PatientListService) {}

  ngOnInit() {
    this.patientListService.getPatientList().subscribe(
      (patients) => (this.patients = patients),
      () => alert('Error')
    );
  }
}
