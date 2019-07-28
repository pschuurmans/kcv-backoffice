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
import { LoginGuard } from './core/auth/login.guard';
import { AccessGuard } from './core/auth/access.guard';
import { NoAccessComponent } from './containers/no-access/no-access.component';
import { EventsComponent } from './modules/events/containers/events/events.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'items', component: ItemsComponent, canActivate: [AuthGuard] },
  { path: 'registrations', component: RegistrationsComponent, canActivate: [AuthGuard] },
  { path: 'events', component: EventsComponent, canActivate: [AuthGuard] },
  { path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuard] },

  { path: 'no-access', component: NoAccessComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }

