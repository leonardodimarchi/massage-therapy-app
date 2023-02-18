import { PillSelectModule } from './../../../../components/pill-select/pill-select.module';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { PersonalInformationFormComponent } from "./personal-information-form.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PillSelectModule,
  ],
  declarations: [
    PersonalInformationFormComponent,
  ],
  exports: [
    PersonalInformationFormComponent,
  ],
})
export class PersonalInformationFormModule { }
