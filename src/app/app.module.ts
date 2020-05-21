import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientComponent } from './components/patient/patient.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InterceptorService } from './services/interceptor.service';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [AppComponent, PatientListComponent, PatientComponent, ToastComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule,
  ],
  providers: [
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
