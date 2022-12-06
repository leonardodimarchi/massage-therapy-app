import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PillComponent } from './pill.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    PillComponent,
  ],
  exports: [
    PillComponent,
  ],
})
export class PillModule { }
