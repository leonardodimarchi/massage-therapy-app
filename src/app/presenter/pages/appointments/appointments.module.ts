import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from "./appointments.component";

@NgModule({
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
  ],
  declarations: [
    AppointmentsComponent,
  ],
  providers: [],
})
export class AppointmentsModule { }
