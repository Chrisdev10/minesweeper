import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Cell } from 'src/app/models/cell.models';
import { SettingsService } from 'src/app/service/settings.service';
import { ChronoComponent } from '../chrono/chrono.component';

@Component({
  selector: 'app-gameinit',
  templateUrl: './gameinit.component.html',
  styleUrls: ['./gameinit.component.css']
})
export class GameinitComponent implements OnInit {
  gamePanel: Cell[][] = [];
  sizeArray: any[] = []
  indexOfFC: number[] = [];
  
  bomb: number = 12;
  flag: number = this.bomb;
  panelSize: number = 10;
  cellLeft: number = this.panelSize * this.panelSize;
  
  firstclick: boolean = false;
  gameEndW: boolean = false;
  gameEndL: boolean = false;
  gameEnd: boolean = false;
  @ViewChild(ChronoComponent) chrono: any;   
  tab: {
    cell: Cell;
    i:number;
    j:number;
  }[] = [];
  
  constructor(private service : SettingsService, private router: Router){ 
    this.bomb = this.service.$bombNb;
    this.panelSize = this.service.$panelsize;
    this.sizeArray = Array(this.panelSize).fill("");
    this.flag = this.bomb
    this.cellLeft = this.panelSize * this.panelSize;
  }
  
  ngOnInit(): void {     
    this.iniTab();    
  }

  // Instancied all Cells 
  iniTab(){
    for(let i = 0; i < this.panelSize; i++){
      this.gamePanel[i] = []
      for(let j = 0; j < this.panelSize ; j++){
        this.gamePanel[i][j] = new Cell();
      }
    }
  }

  // Set Random bomb position
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

  // Iterate on First click to set Cells value regardless to bomb
  iteratorPanel(){
    for(let i = 0; i < this.panelSize; i++){
      for(let j = 0; j < this.panelSize; j++){
        if(this.gamePanel[i][j].$value == -1){
          this.setNeightbours(i,j);
        }
      }
    }
  }

  // Check if neightbours are bomb and set right value of cells
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
    // if value = 0 -> show all neightbours until != 0
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
  
  // Set right colors of Cells
  // @Param : Cell
  /*
    --red -> Bomb
    --Grey -> Hide cells
    --LightGrey -> Showed Cells
  */
  setBackground(cell:Cell):string{
    if(cell.$isBomb && cell.$isShow){
      return "red";
    }
    if(!cell.$isShow && !cell.$isFlag){
      return "grey";
    }
    if(!cell.$isFlag){
      return 'lightgrey';
    }else{
      return "lightgreen";
    }
    
      
    
    
  }

  // Count Flag already set
  Rclick(check:boolean){  
    if(this.firstclick){
      if(check && this.flag > 0){
        this.flag--;
      }else{
        this.flag++;
      }  
    }
    
  }

  // Send to settings comp 
  restart(){
    this.router.navigate(['settings']);
  }

  // Return False when all not bomb cell are show (WIN)
  endGame(): boolean{
    return _.flatten(this.gamePanel).some(x => !x.$isBomb && !x.$isShow)
  }

  


  // @RETURN TRUE if @param ! neightbours

  // This is the zone where NO BOMBS are allowed (First clicked cells == center of the safe zone)
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

  // Check if not out of game panel
  isValid(i:number,j:number){
    return i>=0 && i <= this.panelSize - 1 && j >= 0 && j <= this.panelSize -1; 
  }

  // Set colors with Value of cells
  setColors(item: Cell){
    switch(item.$value){
      case 1 : return 'blue';
      break;
      case 2 : return 'green';
      break;
      case 3 : return 'orange';
      break;
      case 4 : return 'yellow';
      break;
      case 5 : return 'red'
      break;
      default : return 'black';
    }
  }
}
