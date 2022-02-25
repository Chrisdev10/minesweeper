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
  bomb: number = 12;
  panelSize: number = 10;
  sizeArray: any[] = Array(this.panelSize).fill("");
  cellLeft: number = this.panelSize * this.panelSize;
  constructor() { }

  ngOnInit(): void {
    
    this.setBomb();    
    this.setNeightbours();
  }

  setBomb(){

    for(let i = 0; i < this.panelSize; i++){
      this.gamePanel[i] = []
      for(let j = 0; j < this.panelSize ; j++){
        this.gamePanel[i][j] = new Cell();
        const numb = Math.floor(Math.random()*this.cellLeft);
        if(numb <= this.bomb){
          this.gamePanel[i][j].$isBomb = true;
          this.gamePanel[i][j].$value = -1;
          this.bomb--;
        }else{
          this.gamePanel[i][j].$value = 0;
        }
        
        this.cellLeft--;
      }
    }

  }
  setNeightbours(){

    for(let i = 0; i < this.panelSize; i++){
      for(let j = 0; j < this.panelSize ; j++){
        if(this.gamePanel[i][j].$value == -1){
            if(i > 0 && this.gamePanel[i-1][j].$value !== -1){
              this.gamePanel[i-1][j].$value += 1;
              if(j > 0 && this.gamePanel[i-1][j-1].$value !== -1){
                this.gamePanel[i-1][j-1].$value += 1;
              }
              if ( j < this.panelSize -1 && this.gamePanel[i-1][j+1].$value !== -1){
                this.gamePanel[i-1][j+1].$value += 1;
              }
            }
            if(i < this.panelSize - 1 && this.gamePanel[i+1][j].$value !== -1){
              this.gamePanel[i+1][j].$value += 1;
              if(j > 0 && this.gamePanel[i+1][j-1].$value !== -1){
                this.gamePanel[i+1][j-1].$value += 1;
              }
              if ( j < this.panelSize -1 && this.gamePanel[i+1][j+1].$value !== 1){
                this.gamePanel[i+1][j+1].$value += 1;
              }
            }
            if(j > 0 && this.gamePanel[i][j-1].$value !== -1){
              this.gamePanel[i][j-1].$value += 1;
            }
            if(j < this.panelSize - 1 && this.gamePanel[i][j+1].$value !== -1){
              this.gamePanel[i][j+1].$value += 1;
            }
          }
      }
    }

  }


}
