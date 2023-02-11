import { FormArray, FormControl, FormGroup } from '@angular/forms';

type FormGroupControls<Interface extends object> = {
  [Key in keyof Interface]:
  Interface[Key] extends Array<infer ArrayValue>
  ? FormArray<FormControl<ArrayValue>>
  : Interface[Key] extends object
  ? any
  : Interface[Key] extends Date
  ? FormControl<Interface[Key]>
  : FormControl<NonNullable<Interface[Key]>>
};

export type FormGroupFrom<Interface extends object> = FormGroup<FormGroupControls<Interface>>;
