import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Cell } from 'src/app/models/cell.models';

@Component({
  selector: 'app-gameinit',
  templateUrl: './gameinit.component.html',
  styleUrls: ['./gameinit.component.css']
})
export class GameinitComponent implements OnInit {
  gamePanel: Cell[][] = [];
  bomb: number = 15;
  panelSize: number = 8;
  sizeArray: any[] = Array(this.panelSize).fill("");
  cellLeft: number = this.panelSize * this.panelSize;
  constructor() { }

  ngOnInit(): void {
    
    this.setBomb();
    
    
    
  }

  setBomb(){

    for(let i = 0; i < this.panelSize; i++){
      this.gamePanel[i] = []
      for(let j = 0; j < this.panelSize ; j++){
        this.gamePanel[i][j] = new Cell();
        const numb = Math.floor(Math.random()*this.cellLeft);
        if(numb <= this.bomb){
          this.gamePanel[i][j].$isBomb = true;
          this.gamePanel[i][j].$value = "X";
          this.bomb--;
        }else{
          this.gamePanel[i][j].$value = "0";
        }
        
        this.cellLeft--;
      }
    }

  }
  initPanel(){
    
  }


}
