import { UserAccessModule } from "@infra/guards/user-access/user-access.module";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserAccessGuard } from "@infra/guards/user-access/user-access.guard";

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [UserAccessGuard],
    data: {
      isProtectedRoute: true,
      redirectTo: 'login'
    }
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), UserAccessModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
