import { AbstractControl, ValidationErrors, Validators } from "@angular/forms"
export const INSERT_FORM_SETTINGS = {
    'bomb': [12,[Validators.max(250)]],
    'size': [10,[Validators.max(50)]]
}

