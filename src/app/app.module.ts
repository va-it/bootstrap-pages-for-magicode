import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RandomTextPipe } from './pipes/random-text.pipe';
import { BootstrapPageComponent } from './bootstrap-page/bootstrap-page.component';
import { SettingsFormComponent } from './settings-form/settings-form.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    BootstrapPageComponent,
    RandomTextPipe,
    SettingsFormComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
