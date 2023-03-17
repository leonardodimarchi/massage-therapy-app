import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PillSelectComponent } from './pill-select.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    PillSelectComponent,
  ],
  exports: [
    PillSelectComponent,
  ],
})
export class PillSelectModule { }
