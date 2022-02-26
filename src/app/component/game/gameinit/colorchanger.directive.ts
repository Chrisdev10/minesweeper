import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Cell } from 'src/app/models/cell.models';

@Directive({
  selector: '[appColorchanger]'
})
export class ColorchangerDirective implements OnInit{
  @Input('appColorchanger') values?: Cell;
  constructor(
    private elem : ElementRef
  ) { }
  ngOnInit(): void {
    
  }
  setColors(item: Cell){
    
    switch(item.$value){
      case 1 : return 'blue'
      case 2 : return 'green';
      case 3 : return 'orange';
      case 4 : return 'red';
      default : return 'black';
    }
  }
  @HostListener('click') setCol(){
    if(this.values){
      
      console.log("here");
      
      this.elem.nativeElement.style.color = this.setColors(this.values);
    
  }
  }


}
