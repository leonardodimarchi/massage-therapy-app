import { EventEmitter } from '@angular/core';
import { Component, Input, Output } from '@angular/core';

export interface PillSelectItem<TValue> {
  label: string;
  value: TValue;
}

@Component({
  selector: 'app-pill-select',
  templateUrl: './pill-select.component.html',
  styleUrls: ['./pill-select.component.scss'],
})
export class PillSelectComponent<TItem = any> {
  @Input()
  public items: PillSelectItem<TItem>[] = [];

  @Input()
  public value?: TItem;

  @Output()
  public valueChange: EventEmitter<TItem> = new EventEmitter<TItem>();

  public select(item: PillSelectItem<TItem>): void {
    this.valueChange.emit(item.value)
  }
}
