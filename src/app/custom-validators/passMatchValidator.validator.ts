import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const PassMatchValidator = (): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
    const pass1 = control.value.pass1, pass2 = control.value.pass2
    return pass1 !== pass2 ? { passNotMatch: true } : null;
};