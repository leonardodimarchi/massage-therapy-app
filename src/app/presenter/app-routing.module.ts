import { UserAccessModule } from "@infra/guards/user-access/user-access.module";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// TODO: Use UserAccessGuard

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
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
