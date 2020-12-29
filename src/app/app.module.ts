import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BootstrapPageComponent } from './bootstrap-page.component';
import { RandomTextPipe } from './pipes/random-text.pipe';
import {FormsModule} from '@angular/forms';
import {SettingsFormComponent} from './settings-form/settings-form.component';

@NgModule({
  declarations: [
    BootstrapPageComponent,
    RandomTextPipe,
    SettingsFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [BootstrapPageComponent]
})
export class AppModule { }
