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
  home: {
    isProtectedRoute: true,
    redirectTo: 'login',
    animation: 'fromRight',
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
