import { Component, Input } from "@angular/core";

@Component({
    selector: 'loading-spinner',
    template: `
      <span class="spin-circle"></span>
      <span class="message" *ngIf="message">{{ message }}</span>
    `,
    styleUrls: ['./spinner.component.scss'],
  })
  export class SpinnerComponent {

    @Input()
    message?: string;

    @Input()
    size: 'small' | 'large' | 'medium' = 'medium';

    @Input() status: 'basic' | 'danger' | 'error' = 'basic';
  }
