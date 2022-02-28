import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chrono',
  templateUrl: './chrono.component.html',
  styleUrls: ['./chrono.component.css']
})
export class ChronoComponent implements OnInit {
  minute: string = "00";
  seconde: string = "00";
  cpt: number = 0;
  interval: any;
  @Input() isStart:boolean = false;
  @Input() bombLeft:number = 0;

  constructor() { }

  ngOnInit(): void {
  }
  start(){    
      this.interval = setInterval(()=>{
      this.cpt++;
      this.seconde = (this.cpt % 60).toLocaleString(undefined,{minimumIntegerDigits:2,maximumSignificantDigits:2});
      this.minute = Math.floor(this.cpt / 60).toLocaleString(undefined,{minimumIntegerDigits:2,maximumSignificantDigits:2});;

    },1000);
  }

  stop(){
    clearInterval(this.interval);
  }


}
