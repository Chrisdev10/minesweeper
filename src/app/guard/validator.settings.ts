import { AbstractControl, ValidationErrors, Validators as V} from "@angular/forms"
export const INSERT_FORM_SETTINGS = {
    'bomb': [12,[V.max(500),V.min(10),V.required]],
    'size': [10,[V.max(50),V.min(10),V.required]]
}

export function logicValues(control: AbstractControl): ValidationErrors | null{
    const bomb = control.value.bomb;
    const size = control.value.size;
    const cells = size*size;
    
    if(bomb > (cells/2)){
        return {
            message:`Not valid values. bomb must be lower than Half game panel. max BOMB : ${Math.floor(cells/2)}`
        }
    }
    return null;

}

