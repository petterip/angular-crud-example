import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/models/Patient';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit {
  @Input() patient: Patient;

  constructor() {}

  ngOnInit(): void {}

  setClasses() {
    return {
      patient: true,
      'has-attachment': !!this.patient.attachment,
    };
  }

  onToggleAttachment(patient) {
    patient.attachment = patient.attachment ? undefined : 'file.ext';
  }

  onDelete(patient) {
    console.log('DEL!', patient);
  }
}
