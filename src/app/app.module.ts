import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BootstrapPage } from './bootstrap-page';
import { RandomStringPipe } from './random-string.pipe';

@NgModule({
  declarations: [
    BootstrapPage,
    RandomStringPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [BootstrapPage]
})
export class AppModule { }
