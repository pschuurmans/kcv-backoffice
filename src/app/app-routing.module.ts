import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './containers/app/app.component';
import { ItemsComponent } from './modules/items/containers/items/items.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginComponent } from './containers/login/login.component';


const routes: Routes = [
  { path: '', component: AppComponent, canActivate: [AuthGuard] },
  { path: 'items', component: ItemsComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  // { path: '**', redirectTo: '/404' },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }

