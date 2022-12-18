import { Component, HostBinding, Input } from "@angular/core";

@Component({
  selector: 'loading-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {

  @Input()
  @HostBinding('class.position-static')
  public isBlockSpinner: boolean = false;

  @Input()
  public message?: string;

  @Input()
  public size: 'small' | 'medium' | 'large' | 'huge' = 'medium';

  @Input()
  public status: 'basic' | 'danger' | 'error' | 'accent' = 'basic';

  @Input()
  public position: 'center' | 'left' | 'right' = 'center';

  @Input()
  public hasBackdrop: boolean = true;

  get small(): boolean {
    return this.size === 'small';
  }

  get medium(): boolean {
    return this.size === 'medium';
  }

  get large(): boolean {
    return this.size === 'large';
  }

  get huge(): boolean {
    return this.size === 'huge';
  }

  get basic(): boolean {
    return this.status === 'basic';
  }

  get accent(): boolean {
    return this.status === 'accent';
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
