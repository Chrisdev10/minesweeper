import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainmenuComponent } from './component/mainmenu/mainmenu.component';
import { GameinitComponent } from './component/game/gameinit/gameinit.component';
import { ChronoComponent } from './component/game/chrono/chrono.component';
import { FlagSetterDirective } from './component/game/gameinit/flag-setter.directive';
import { WinnerComponent } from './component/game/winner/winner.component';
import { LoserComponent } from './component/game/loser/loser.component';

@NgModule({
  declarations: [
    AppComponent,
    MainmenuComponent,
    GameinitComponent,
    ChronoComponent,
    FlagSetterDirective,
    WinnerComponent,
    LoserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
