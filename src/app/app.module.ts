import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './containers/app/app.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule, FUNCTIONS_REGION, FUNCTIONS_ORIGIN } from '@angular/fire/functions';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import * as Sentry from '@sentry/browser';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { LoginComponent } from './containers/login/login.component';
import { AuthService } from './core/auth/auth.service';
import { AuthGuard } from './core/auth/auth.guard';
import { ItemsComponent } from './modules/items/containers/items/items.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './modules/dashboad/containers/dashboard/dashboard.component';
import { HeaderComponent } from './core/header/header.component';
import { MyProfileComponent } from './modules/my-profile/containers/my-profile/my-profile.component';
import { RegistrationsComponent } from './modules/registrations/containers/registrations/registrations.component';
import { RegisterComponent } from './containers/register/register.component';
import { NoAccessComponent } from './containers/no-access/no-access.component';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventsComponent } from './modules/events/containers/events/events.component';
import { EventListComponent } from './modules/events/component/event-list/event-list.component';
import { EventAddComponent } from './modules/events/component/event-add/event-add.component';
import { RegistrationsListComponent } from './modules/registrations/components/registrations-list/registrations-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HighlightModule } from 'ngx-highlightjs';
import javascript from 'highlight.js/lib/languages/javascript';
import { EventScriptComponent } from './modules/events/component/event-script/event-script.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/reducers/auth.reducer';
import { PersonsComponent } from './modules/persons/containers/persons/persons.component';
import { PersonAddComponent } from './modules/persons/components/person-add/person-add.component';
import { TimestampPipe } from './core/pipes/timestamp.pipe';
import { PersonDetailsComponent } from './modules/persons/components/person-details/person-details.component';
import { PersonEditComponent } from './modules/persons/components/person-edit/person-edit.component';
import { CompaniesComponent } from './modules/companies/containers/companies/companies.component';
import { CompaniesAddComponent } from './modules/companies/components/companies-add/companies-add.component';
import { CompaniesEditComponent } from './modules/companies/components/companies-edit/companies-edit.component';
import { CompaniesDetailsComponent } from './modules/companies/components/companies-details/companies-details.component';
import { RegistrationDetailsComponent } from './modules/registrations/components/registration-details/registration-details.component';
import { RegistrationAddComponent } from './modules/registrations/components/registration-add/registration-add.component';
import { PaymentStatusComponent } from './modules/payments/components/payment-status/payment-status.component';
import { PaymentsComponent } from './modules/payments/containers/payments/payments.component';
import { PaymentAmountPipe } from './core/pipes/payment-amount.pipe';
import { PaymentStatusPipe } from './core/pipes/payment-status.pipe';
import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { PaymentDetailsComponent } from './modules/payments/components/payment-details/payment-details.component';
import { LoaderComponent } from './containers/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
registerLocaleData(localeNl, 'nl');
import { LoaderService } from './core/services/loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './modules/users/containers/users/users.component';

/**
 * Import every language you wish to highlight here
 * NOTE: The name of each language must match the file name its imported from
 */
export function hljsLanguages() {
  return [
    { name: 'javascript', func: javascript },
  ];
}

Sentry.init({
  dsn: environment.sentry_dsn
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() { }
  handleError(error) {
    const eventId = Sentry.captureException(error.originalError || error);
    Sentry.showReportDialog({ eventId });
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    ItemsComponent,
    DashboardComponent,
    HeaderComponent,
    MyProfileComponent,
    RegistrationsComponent,
    RegisterComponent,
    NoAccessComponent,
    EventsComponent,
    EventListComponent,
    EventAddComponent,
    RegistrationsListComponent,
    EventScriptComponent,
    PersonsComponent,
    PersonAddComponent,
    TimestampPipe,
    PersonDetailsComponent,
    PersonEditComponent,
    CompaniesComponent,
    CompaniesAddComponent,
    CompaniesEditComponent,
    CompaniesDetailsComponent,
    RegistrationDetailsComponent,
    RegistrationAddComponent,
    PaymentStatusComponent,
    PaymentsComponent,
    PaymentAmountPipe,
    PaymentStatusPipe,
    PaymentDetailsComponent,
    LoaderComponent,
    UsersComponent
  ],
  imports: [
    NgxDatatableModule,
    BrowserModule,
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireFunctionsModule,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HighlightModule.forRoot({
      languages: hljsLanguages
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    StoreModule.forRoot({ auth: authReducer }),
    HttpClientModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    // { provide: FUNCTIONS_REGION, useValue: 'us-central1' },
    // { provide: FUNCTIONS_ORIGIN, useValue: '`http`s://dev-kcv-backoffice.web.app' },
    // { provide: FUNCTIONS_ORIGIN, useValue: 'http://localhost:5000' },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    { provide: ErrorHandler, useClass: SentryErrorHandler },
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
