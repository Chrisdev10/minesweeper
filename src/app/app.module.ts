import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainmenuComponent } from './component/mainmenu/mainmenu.component';
import { GameinitComponent } from './component/game/gameinit/gameinit.component';
import { ChronoComponent } from './component/game/chrono/chrono.component';
import { FlagSetterDirective } from './component/game/gameinit/flag-setter.directive';
import { SettingsComponent } from './component/game/settings/settings.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainmenuComponent,
    GameinitComponent,
    ChronoComponent,
    FlagSetterDirective,
    SettingsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
