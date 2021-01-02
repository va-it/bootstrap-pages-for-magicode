import { Component } from '@angular/core';
import { CommonData } from '../common/common-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-form',
  styleUrls: ['settings-form.component.css'],
  templateUrl: 'settings-form.component.html'
})
export class SettingsFormComponent {
  public commonData = new CommonData();

  constructor(private router: Router) {
  }

  public checkMaxHeader(): void {
    if (this.commonData.maxNumberOfButtonsInHeader < this.commonData.minNumberOfButtonsInHeader) {
      this.commonData.maxNumberOfButtonsInHeader = this.commonData.minNumberOfButtonsInHeader;
    }
  }

  public checkMaxRows(): void {
    if (this.commonData.maxNumberOfRows < this.commonData.minNumberOfRows) {
      this.commonData.maxNumberOfRows = this.commonData.minNumberOfRows;
    }
  }

  public checkMaxCards(): void {
    if (this.commonData.maxNumberOfCardsPerRow < this.commonData.minNumberOfCardsPerRow) {
      this.commonData.maxNumberOfCardsPerRow = this.commonData.minNumberOfCardsPerRow;
    }
  }

  public checkMaxElements(): void {
    if (this.commonData.maxNumberOfElementsPerCard < this.commonData.minNumberOfElementsPerCard) {
      this.commonData.maxNumberOfElementsPerCard = this.commonData.minNumberOfElementsPerCard;
    }
  }

  public submit(): void {
    localStorage.setItem('commonData', JSON.stringify(this.commonData));
    this.router.navigate(['/', 'bootstrap-pages']);
  }
}
