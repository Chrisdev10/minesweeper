import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameinitComponent } from './component/game/gameinit/gameinit.component';
import { MainmenuComponent } from './component/mainmenu/mainmenu.component';

const routes: Routes = [
  { path:'',redirectTo:'game',pathMatch:'full'},
  { path:'acceuil', component:MainmenuComponent},
  { path:'game',component:GameinitComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
