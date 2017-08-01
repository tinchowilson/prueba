import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


// used to create fake backend
import { fakeBackendProvider } from '../config/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Manager } from '../model/manager';
import { User } from '../model/user';
import { BaseRequestOptions } from '@angular/http';

//Navegación
import { AppRoutingModule, routingComponents } from './app.routing';

//Componentes
import { AppComponent } from '../controllers/app.component';
import { AuthGuard } from '../config/auth.guard';
import { RegisterComponent } from '../controllers/register.component';
import { LoginComponent } from '../controllers/login.component';
import { AlertComponent } from '../components/alert.component';
import { HomeComponent } from '../controllers/home.component';
import { HeaderComponent } from '../controllers/header.component';
import { ReceivedComponent } from '../controllers/invoices/received.component';
import { GeneratedComponent } from '../controllers/invoices/generated.component';
import { DataTableComponent } from '../components/data-table.component';
import { ActionsComponent } from '../components/actions.component';
import { ReadStateComponent } from '../components/read-state.component';
import { PaidStateComponent } from '../components/paid-state.component';

import { OptionsPopupComponent } from '../components/options-popup.component';

//Services
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import { InvoicesService } from '../services/invoices.service';

//Directives
import { EqualValidator } from '../directives/equal-validator.directive';
import { AgGridModule } from "ag-grid-angular/main";
import { MyDateRangePickerModule } from 'mydaterangepicker';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    routingComponents,
    AlertComponent,
    HomeComponent,
    HeaderComponent,
    EqualValidator,
    ReceivedComponent,
    GeneratedComponent,
    DataTableComponent,
    ActionsComponent,
    ReadStateComponent,
    PaidStateComponent,
    OptionsPopupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MyDateRangePickerModule,
    AgGridModule.withComponents([
      ActionsComponent,
      OptionsPopupComponent,
      ReadStateComponent,
      PaidStateComponent
    ])
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    InvoicesService,

    // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    Manager,
    User,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
