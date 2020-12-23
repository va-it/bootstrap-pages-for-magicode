import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BootstrapPageComponent } from './bootstrap-page.component';
import { RandomStringPipe } from './pipes/random-string.pipe';

@NgModule({
  declarations: [
    BootstrapPageComponent,
    RandomStringPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [BootstrapPageComponent]
})
export class AppModule { }
