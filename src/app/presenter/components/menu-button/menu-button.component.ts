import { Component, Input } from '@angular/core';

type BackgroundColors = 'green' | 'purple';
type Icons = 'appointment' | 'info';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent {

  @Input()
  public color: BackgroundColors = 'purple';

  @Input()
  public text!: string;

  @Input()
  public icon?: Icons;

  get isPurpleBackground(): boolean {
    return this.color === 'purple';
  }

  get isGreenBackground(): boolean {
    return this.color === 'green';
  }

  get isAppointmentIcon(): boolean {
    return this.icon === 'appointment';
  }

  get isInfoIcon(): boolean {
    return this.icon === 'info';
  }
}
