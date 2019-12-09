import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './containers/app/app.component';
import { ItemsComponent } from './modules/items/containers/items/items.component';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginComponent } from './containers/login/login.component';
import { DashboardComponent } from './modules/dashboad/containers/dashboard/dashboard.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { MyProfileComponent } from './modules/my-profile/containers/my-profile/my-profile.component';
import { RegistrationsComponent } from './modules/registrations/containers/registrations/registrations.component';
import { RegisterComponent } from './containers/register/register.component';
import { NoAccessComponent } from './containers/no-access/no-access.component';
import { EventsComponent } from './modules/events/containers/events/events.component';
import { RegistrationsListComponent } from './modules/registrations/components/registrations-list/registrations-list.component';
import { EventScriptComponent } from './modules/events/component/event-script/event-script.component';
import { PersonsComponent } from './modules/persons/containers/persons/persons.component';
import { PersonAddComponent } from './modules/persons/components/person-add/person-add.component';
import { PersonDetailsComponent } from './modules/persons/components/person-details/person-details.component';
import { PersonEditComponent } from './modules/persons/components/person-edit/person-edit.component';
import { CompaniesAddComponent } from './modules/companies/components/companies-add/companies-add.component';
import { CompaniesEditComponent } from './modules/companies/components/companies-edit/companies-edit.component';
import { CompaniesDetailsComponent } from './modules/companies/components/companies-details/companies-details.component';
import { CompaniesComponent } from './modules/companies/containers/companies/companies.component';
import { RegistrationDetailsComponent } from './modules/registrations/components/registration-details/registration-details.component';
import { RegistrationAddComponent } from './modules/registrations/components/registration-add/registration-add.component';
import { PaymentStatusComponent } from './modules/payments/components/payment-status/payment-status.component';
import { PaymentsComponent } from './modules/payments/containers/payments/payments.component';
import { PaymentDetailsComponent } from './modules/payments/components/payment-details/payment-details.component';
import { UsersComponent } from './modules/users/containers/users/users.component';
import { RegistrationsEditComponent } from './modules/registrations/components/registrations-edit/registrations-edit.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'items', component: ItemsComponent, canActivate: [AuthGuard] },
  { path: 'registrations/add', component: RegistrationAddComponent, canActivate: [AuthGuard] },
  { path: 'registrations/event/:eventId', component: RegistrationsListComponent, canActivate: [AuthGuard] },
  { path: 'registrations/:registrationId/edit', component: RegistrationsEditComponent, canActivate: [AuthGuard] },
  { path: 'registrations/:registrationId', component: RegistrationDetailsComponent, canActivate: [AuthGuard] },
  { path: 'registrations', component: RegistrationsComponent, canActivate: [AuthGuard] },
  { path: 'events', component: EventsComponent, canActivate: [AuthGuard] },
  { path: 'events/script/:eventId', component: EventScriptComponent, canActivate: [AuthGuard] },
  { path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuard] },
  { path: 'persons/add', component: PersonAddComponent, canActivate: [AuthGuard] },
  { path: 'persons/:personId/edit', component: PersonEditComponent, canActivate: [AuthGuard] },
  { path: 'persons/:personId', component: PersonDetailsComponent, canActivate: [AuthGuard] },
  { path: 'persons', component: PersonsComponent, canActivate: [AuthGuard] },
  { path: 'companies/add', component: CompaniesAddComponent, canActivate: [AuthGuard] },
  { path: 'companies/:companyId/edit', component: CompaniesEditComponent, canActivate: [AuthGuard] },
  { path: 'companies/:companyId', component: CompaniesDetailsComponent, canActivate: [AuthGuard] },
  { path: 'companies', component: CompaniesComponent, canActivate: [AuthGuard] },
  { path: 'payments/status/:paymentId', component: PaymentStatusComponent },
  { path: 'payments/:paymentId', component: PaymentDetailsComponent, canActivate: [AuthGuard] },
  { path: 'payments', component: PaymentsComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },

  { path: 'no-access', component: NoAccessComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }

