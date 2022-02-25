import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appColorchanger]'
})
export class ColorchangerDirective {
  @Input('appColorchanger') values?: number;
  constructor() { }

}
