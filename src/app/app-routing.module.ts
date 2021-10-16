import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProtectedGuard, PublicGuard} from "ngx-auth";
import {UserSessionResolveService} from "./core/authentication/user-session-resolve.service";
import {CarsListComponent} from "./modules/private/cars/cars-list/cars-list.component";
import {LoginComponent} from "./modules/public/login/login.component";
import {RegisterComponent} from "./modules/public/register/register.component";

const routes: Routes = [
  {
    path: 'public',
    canActivate: [PublicGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  {
    path: 'private',
    canActivate: [ProtectedGuard],
    resolve: {
      userSession: UserSessionResolveService,
    },
    children: [
      {
        path: 'cars',
        component: CarsListComponent,
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/public/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
