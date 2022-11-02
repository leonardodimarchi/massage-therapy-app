import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MenuButtonModule } from '@presenter/components/menu-button/menu-button.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MenuButtonModule,
  ],
  declarations: [
    HomeComponent,
  ],
  providers: [],
})
export class HomeModule { }
