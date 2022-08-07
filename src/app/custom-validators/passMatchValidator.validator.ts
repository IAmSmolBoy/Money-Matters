import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const PassMatchValidator = (): ValidatorFn =>
    (control: AbstractControl): ValidationErrors | null =>
    control.value.pass1 !== control.value.pass2 ?
    { notMatch: true } : null;