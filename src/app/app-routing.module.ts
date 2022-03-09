import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameinitComponent } from './component/game/gameinit/gameinit.component';
import { SettingsComponent } from './component/game/settings/settings.component';
import { MainmenuComponent } from './component/mainmenu/mainmenu.component';
import { ReloaderGuard } from './guard/reloader.guard';

const routes: Routes = [
  { path:'',redirectTo:'settings',pathMatch:'full'},
  { path:'acceuil', component:MainmenuComponent},
  { path:'settings', component:SettingsComponent},
  { path:'game',component:GameinitComponent, canActivate: [ReloaderGuard]}
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
