import { UserAccessModule } from "@infra/guards/user-access/user-access.module";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserAccessGuard } from "@infra/guards/user-access/user-access.guard";
import { RouteData } from "./models/interfaces/route-data.interface";

const routeData: { [key: string]: RouteData } = {
  login: {
    isUnprotectedRoute: true,
    redirectTo: 'home',
    animation: 'fromLeft',
  },
  register: {
    isUnprotectedRoute: true,
    redirectTo: 'home',
    animation: 'fromRight',
  },
  home: {
    isProtectedRoute: true,
    redirectTo: 'login',
  },
  appointments: {
    isProtectedRoute: true,
    redirectTo: 'login',
    animation: 'fromRight',
  },
}

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    canActivate: [UserAccessGuard],
    data: routeData['login'],
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule),
    canActivate: [UserAccessGuard],
    data: routeData['register'],
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [UserAccessGuard],
    data: routeData['home'],
  },
  {
    path: 'appointments',
    loadChildren: () => import('./pages/appointments/appointments.module').then(m => m.AppointmentsModule),
    canActivate: [UserAccessGuard],
    data: routeData['appointments'],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), UserAccessModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
