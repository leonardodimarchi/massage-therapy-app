import { CommonModule } from '@angular/common';
import { SpinnerDirective } from './directives/spinner.directive';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule],
  exports: [SpinnerComponent, SpinnerDirective],
  declarations: [SpinnerComponent, SpinnerDirective],
})
export class LoadingSpinnerModule {}
