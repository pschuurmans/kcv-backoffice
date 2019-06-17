import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './containers/app/app.component';
import { ItemsComponent } from './modules/items/containers/items/items.component';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginComponent } from './containers/login/login.component';
import { DashboardComponent } from './modules/dashboad/containers/dashboard/dashboard.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { MyProfileComponent } from './modules/my-profile/containers/my-profile/my-profile.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'items', component: ItemsComponent, canActivate: [AuthGuard] },
  { path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuard] },

  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }

