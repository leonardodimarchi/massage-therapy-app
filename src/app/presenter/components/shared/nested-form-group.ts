import { Directive } from '@angular/core';
import { OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { FormGroupFrom } from '@presenter/models/common/form-group-from';

@Directive()
export class NestedFormGroup<TGroup extends object> implements OnInit {
  constructor(
    protected readonly controlContainer: ControlContainer,
  ) { }

  public form!: FormGroupFrom<TGroup>;

  public ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroupFrom<TGroup>;
  }
}
