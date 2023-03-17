import { EventEmitter, forwardRef } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface PillSelectItem<TValue> {
  label: string;
  value: TValue;
}

@Component({
  selector: 'app-pill-select',
  templateUrl: './pill-select.component.html',
  styleUrls: ['./pill-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PillSelectComponent),
      multi: true
    },
  ]
})
export class PillSelectComponent<TItem = any> implements ControlValueAccessor {
  @Input()
  public items: PillSelectItem<TItem>[] = [];

  @Input()
  public value?: TItem;

  @Output()
  public valueChange: EventEmitter<TItem> = new EventEmitter<TItem>();

  public select(item: PillSelectItem<TItem>): void {
    this.value = item.value
    this.valueChange.emit(item.value);
    this.propagateChange(this.value);
  }


  //#region ControlValueAccessor

  public writeValue(value: TItem) {
    if (value !== undefined) {
      this.value = value;
    }
  }

  public propagateChange: (_: any) => void = (_: any) => {};

  public registerOnChange(fn: (_: any) => void) {
    this.propagateChange = fn;
  }

  public registerOnTouched() {}

  //#endregion
}
