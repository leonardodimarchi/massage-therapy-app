import { NgxMaskModule } from 'ngx-mask';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BasicInformationFormComponent } from "./basic-information-form.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
  ],
  declarations: [
    BasicInformationFormComponent,
  ],
  exports: [
    BasicInformationFormComponent,
  ],
})
export class BasicInformationFormModule { }
