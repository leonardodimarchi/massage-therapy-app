import { FormArray, FormControl, FormGroup } from "@angular/forms";

export type FormGroupFrom<Interface> = FormGroup<{
  [Key in keyof Interface]:
  Interface[Key] extends Array<infer ArrayValue>
    ? FormArray<FormControl<ArrayValue>>
    : Interface[Key] extends Date
      ? FormControl<Interface[Key]>
      : Interface[Key] extends object
        ? FormGroupFrom<Interface[Key]>
        : FormControl<Interface[Key]>
}>;
