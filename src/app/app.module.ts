import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './containers/app/app.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
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
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
