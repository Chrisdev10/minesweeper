import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Cell } from 'src/app/models/cell.models';
import { ChronoComponent } from '../chrono/chrono.component';

@Component({
  selector: 'app-gameinit',
  templateUrl: './gameinit.component.html',
  styleUrls: ['./gameinit.component.css']
})
export class GameinitComponent implements OnInit {
  gamePanel: Cell[][] = [];
  bomb: number = 12 ;
  flag: number = this.bomb;
  panelSize: number = 10;
  sizeArray: any[] = Array(this.panelSize).fill("");
  cellLeft: number = this.panelSize * this.panelSize;
  firstclick: boolean = false;
  indexOfFC: number[] = [];
  gameEndW: boolean = false;
  gameEndL: boolean = false;
  gameEnd: boolean = false;
  @ViewChild(ChronoComponent) chrono: any;   
  tab: {
    cell: Cell;
    i:number;
    j:number;
  }[] = [];
  constructor(){ }

  ngOnInit(): void {
    this.iniTab();    
  }

  Rclick(check:boolean){  
    if(this.firstclick){
      if(check && this.flag > 0){
        this.flag--;
      }else{
        this.flag++;
      }  
    }
    
  }

  restart(){
    window.location.reload();
  }

  endGame(): boolean{
    
    return _.flatten(this.gamePanel).some(x => !x.$isBomb && !x.$isShow)
  }
  iniTab(){
    for(let i = 0; i < this.panelSize; i++){
      this.gamePanel[i] = []
      for(let j = 0; j < this.panelSize ; j++){
        this.gamePanel[i][j] = new Cell();
      }
    }
  }
  setBomb(){
    for(let i = 0; i < this.panelSize; i++){
      for(let j = 0; j < this.panelSize ; j++){
        let numb = Math.floor((Math.random()*this.cellLeft));
        if(numb <= this.bomb && this.saveZone(i,j) && this.bomb > 0){
          this.gamePanel[i][j].$isBomb = true;
          this.gamePanel[i][j].$value = -1;
          this.bomb--;
          this.cellLeft--;
        }else{
          this.gamePanel[i][j].$value = 0;
          this.cellLeft--;
        }        
      }
    }    

  }
  iteratorPanel(){
    for(let i = 0; i < this.panelSize; i++){
      for(let j = 0; j < this.panelSize; j++){
        if(this.gamePanel[i][j].$value == -1){
          this.setNeightbours(i,j);
        }
      }
    }
  }

  setNeightbours(i: number, j: number){

    for(let row = -1; row <= 1; row++){
      for(let col = -1; col <= 1; col++){
        if(this.isValid((row+i),(col+j))){
          if(this.gamePanel[row+i][col+j].$value !== -1){
            this.gamePanel[row+i][col+j].$value += 1;
          }
        }
      }
    }
  }
  getPos(i:number,j:number){
    if(!this.firstclick){
      this.indexOfFC[0] = i;
      this.indexOfFC[1] = j;
      this.firstclick = true;
      this.setBomb();
      this.chrono.start();
      this.iteratorPanel();
      this.endGame();
    }else{
      this.gamePanel[i][j].$isShow = true;      
    }
    if(!this.endGame()){
      this.chrono.stop();
      _.flatten(this.gamePanel).forEach(x => x.$isShow = true);
      this.gameEndW = true;
      this.gameEnd = true;
    }
    if(this.gamePanel[i][j].$isBomb){
      this.chrono.stop();
      _.flatten(this.gamePanel).forEach(x => x.$isShow = true);
      this.gameEndL = true;
      this.gameEnd = true;
      
    }
    if(this.gamePanel[i][j].$value == 0){
      for( let cell of this.getNeightbours(i,j)){
        this.getPos(cell.i,cell.j);
      }
    }
    
    
    
  }

  getNeightbours(i:number,j:number){
    let tab: {
      cell: Cell;
      i:number;
      j:number;
    }[] = [];
    for(let x = -1; x <= 1; x++){
      for(let y = -1; y <= 1; y++){
        if(this.isValid(i+x,j+y)){
          if(this.gamePanel[i+x][j+y].$isShow !== true){
          tab.push({
            cell: this.gamePanel[i+x][j+y],
            i: x+i,
            j: j+y
          });
        
      }
        }
      }
    }
    return tab;
  }

  // @RETURN TRUE if @param ! neightbours

  saveZone(x:number,y:number):boolean{
    const i = this.indexOfFC[0];
    const j = this.indexOfFC[1];    
    for(let row = -1; row <= 1; row++){
      for(let col = -1; col <= 1; col++){
        if((i+row) == x && (j+col) == y){
            return false;
        }
      }
    }
    return true;
    

  }

 // @Return TRUE 
 // If in BOUND 

  isValid(i:number,j:number){
    return i>=0 && i <= this.panelSize - 1 && j >= 0 && j <= this.panelSize -1; 
  }

  setColors(item: Cell){
   
    switch(item.$value){
      case 1 : return 'blue';
      break;
      case 2 : return 'green';
      break;
      case 3 : return 'orange';
      break;
      case 4 : return 'red';
      break;
      default : return 'black';
    }
  }
}
