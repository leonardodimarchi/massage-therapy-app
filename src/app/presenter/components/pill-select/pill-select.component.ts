import { Component, Input } from '@angular/core';

interface PillSelectItem<TValue = any> {
  label: string;
  value: TValue;
}

@Component({
  selector: 'app-pill-select',
  templateUrl: './pill-select.component.html',
  styleUrls: ['./pill-select.component.scss'],
})
export class PillSelectComponent {
  @Input()
  public items: PillSelectItem[] = [];

  @Input()
  public value: any;
}
