// Services
import { InterceptorService } from './services/interceptor.service';
import { ToastService } from './services/toast.service';

// Components
import { AppComponent } from './app.component';
import { PatientComponent } from './components/patient/patient.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';

// Modules
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { GridModule } from '@syncfusion/ej2-angular-grids';

@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent,
    PatientComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    ToastModule,
    GridModule
  ],
  providers: [
    HttpClientModule,
    ToastService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
