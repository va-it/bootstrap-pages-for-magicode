import { Component } from '@angular/core';
import { CommonData } from '../common/common-data';
import { Router } from '@angular/router';
import {consoleTestResultHandler} from 'tslint/lib/test';

@Component({
  selector: 'app-settings-form',
  styleUrls: ['settings-form.component.css'],
  templateUrl: 'settings-form.component.html'
})
export class SettingsFormComponent {
  public commonData = new CommonData();

  constructor(private router: Router) {
  }

  public ensureMaxIsNotSmallerThanMin(propertySuffix: string): void {
    if (this.commonData['max' + propertySuffix] < this.commonData['min' + propertySuffix]) {
      this.commonData['max' + propertySuffix] = this.commonData['min' + propertySuffix];
    }
  }

  public submit(): void {
    localStorage.setItem('commonData', JSON.stringify(this.commonData));
    this.router.navigate(['/', 'bootstrap-pages']);
  }
}
