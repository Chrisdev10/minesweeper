import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainmenuComponent } from './component/mainmenu/mainmenu.component';
import { GameinitComponent } from './component/game/gameinit/gameinit.component';
import { ColorchangerDirective } from './component/game/gameinit/colorchanger.directive';

@NgModule({
  declarations: [
    AppComponent,
    MainmenuComponent,
    GameinitComponent,
    ColorchangerDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
