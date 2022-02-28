import { Directive, ElementRef, HostListener, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Cell } from 'src/app/models/cell.models';

@Directive({
  selector: '[appFlagSetter]'
})
export class FlagSetterDirective {
  @Output('appFlagSetter') flag: EventEmitter<boolean> = new EventEmitter();
  @Output() checker: EventEmitter<boolean> = new EventEmitter();
  @Input() cell?: Cell;
  @Input() gameStart: boolean | any;
  @Input() nbrFlag: number|any;
  constructor(
    private elem: ElementRef
  ) { }

  @HostListener('contextmenu',['$event']) setFlag(e:any){
    e.preventDefault();
    if(this.cell && this.gameStart){
      if(!this.cell.$isFlag && !this.cell.$isShow){
        if(this.nbrFlag !== 0){
          this.cell.$isFlag = true;
          this.flag.emit(true);
        }
      }else if(this.cell.$isFlag){
        this.flag.emit(false);
        this.cell.$isFlag = false;
        
      }
    }
  }
  @HostListener('click') setColor(){
    if(this.cell){
      if(!this.cell.$isFlag){
        this.checker.emit(true);
      }
    }
  }
}
