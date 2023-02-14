import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AddressInformationFormComponent } from "./address-information-form.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AddressInformationFormComponent,
  ],
  exports: [
    AddressInformationFormComponent,
  ],
})
export class AddressInformationFormModule { }
