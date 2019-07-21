import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './containers/app/app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

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

Sentry.init({
  dsn: 'https://64b2fcd301c94ccbb47204888d3071f0@sentry.io/1503763'
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
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
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
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
  ],
  providers: [
    AuthService,
    AuthGuard,
    // { provide: FUNCTIONS_REGION, useValue: 'us-central1' },
    // { provide: FUNCTIONS_ORIGIN, useValue: 'https://dev-kcv-backoffice.web.app' },
    // { provide: FUNCTIONS_ORIGIN, useValue: 'http://localhost:5000' },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    // { provide: ErrorHandler, useClass: SentryErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
