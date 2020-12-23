import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BootstrapPageComponent } from './bootstrap-page.component';
import { RandomTextPipe } from './pipes/random-text.pipe';

@NgModule({
  declarations: [
    BootstrapPageComponent,
    RandomTextPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [BootstrapPageComponent]
})
export class AppModule { }
