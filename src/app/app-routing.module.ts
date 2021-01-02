import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SettingsFormComponent } from './settings-form/settings-form.component';
import { BootstrapPageComponent } from './bootstrap-page/bootstrap-page.component';

const routes: Routes = [
  { path: '',   redirectTo: 'settings', pathMatch: 'full' },
  { path: 'settings', component: SettingsFormComponent},
  { path: 'bootstrap-pages', component: BootstrapPageComponent },
  { path: '**', redirectTo: 'settings', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
