import { Component, Input } from "@angular/core";

@Component({
  selector: 'loading-spinner',
  template: `
    <div class="spin-container"
      [class.with-backdrop]="hasBackdrop"
      [class.status-basic]="basic"
      [class.status-danger]="danger"
      [class.status-error]="error"
      [class.size-small]="small"
      [class.size-medium]="medium"
      [class.size-large]="large"
      [class.position-right]="right"
      [class.position-left]="left"
      [class.position-center]="center">

      <span class="spin-circle"></span>

      <span *ngIf="message" class="message">
        {{ message }}
      </span>
    </div>
    `,
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {

  @Input()
  message?: string;

  @Input()
  size: 'small' | 'medium' | 'large' = 'medium';

  @Input()
  status: 'basic' | 'danger' | 'error' = 'basic';

  @Input()
  position: 'center' | 'left' | 'right' = 'center';

  @Input()
  hasBackdrop: boolean = true;

  get small(): boolean {
    return this.size === 'small';
  }

  get medium(): boolean {
    return this.size === 'medium';
  }

  get large(): boolean {
    return this.size === 'large';
  }

  get basic(): boolean {
    return this.status === 'basic';
  }

  get danger(): boolean {
    return this.status === 'danger';
  }

  get error(): boolean {
    return this.status === 'error';
  }

  get center(): boolean {
    return this.position === 'center';
  }

  get left(): boolean {
    return this.position === 'left';
  }

  get right(): boolean {
    return this.position === 'right';
  }
}
