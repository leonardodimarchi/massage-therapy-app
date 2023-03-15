import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { LoadingSpinnerModule } from "@infra/modules/loading/loading.module";
import { AddressInformationFormComponent } from "./address-information-form.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingSpinnerModule,
  ],
  declarations: [
    AddressInformationFormComponent,
  ],
  exports: [
    AddressInformationFormComponent,
  ],
})
export class AddressInformationFormModule { }
