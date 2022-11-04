import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MenuButtonModule } from '@presenter/components/menu-button/menu-button.module';
import { LogoutUsecase } from '@domain/usecases/user/logout_usecase';
import { UserServiceInterface } from '@domain/contracts/services';
import { RoutingModule } from '@infra/modules/router/router.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MenuButtonModule,
    RoutingModule,
  ],
  declarations: [
    HomeComponent,
  ],
  providers: [
    {
      provide: LogoutUsecase,
      useFactory: (userService: UserServiceInterface) => {
        return new LogoutUsecase(userService);
      },
      deps: [UserServiceInterface]
    },
  ],
})
export class HomeModule { }
