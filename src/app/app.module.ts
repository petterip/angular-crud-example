// Services
import { EditService, ToolbarService, SortService } from '@syncfusion/ej2-angular-grids';
import { InterceptorService } from './services/interceptor.service';
import { ToastService } from './services/toast.service';
import { PatientService } from './api/services/patient.service';

// Components
import { AppComponent } from './app.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';

// Modules
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { GridModule, ResizeService } from '@syncfusion/ej2-angular-grids';
import { FormsModule } from '@angular/forms';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { SidebarModule, MenuAllModule, TreeViewAllModule } from '@syncfusion/ej2-angular-navigations';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';

import { ApiModule } from './api/api.module';
import { PanelComponent } from './components/panel/panel.component';
import { SpinnerComponent } from './components/spinner/spinner.component'

@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent,
    PanelComponent,
    SpinnerComponent
  ],
  imports: [
    ApiModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    ToastModule,
    GridModule,
    DatePickerAllModule,
    FormsModule,
    SidebarModule, MenuAllModule, TreeViewAllModule,
    UploaderModule
  ],
  providers: [
    HttpClientModule,
    ToastService,
    PatientService,
    EditService,
    ToolbarService,
    SortService,
    ResizeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
