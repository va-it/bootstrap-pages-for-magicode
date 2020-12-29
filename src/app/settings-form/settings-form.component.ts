import { Component, EventEmitter, Output } from '@angular/core';
import { CommonData } from '../common/common-data';

@Component({
  selector: 'app-settings-form',
  styleUrls: ['settings-form.component.css'],
  templateUrl: 'settings-form.component.html'
})
export class SettingsFormComponent {
  @Output() submitted: EventEmitter<CommonData> = new EventEmitter<CommonData>();
  public commonData = new CommonData();


  public checkMaxHeader(event): void {
    if (this.commonData.maxNumberOfButtonsInHeader < this.commonData.minNumberOfButtonsInHeader) {
      this.commonData.maxNumberOfButtonsInHeader = this.commonData.minNumberOfButtonsInHeader;
    }
  }

  public checkMaxRows(event): void {
    if (this.commonData.maxNumberOfRows < this.commonData.minNumberOfRows) {
      this.commonData.maxNumberOfRows = this.commonData.minNumberOfRows;
    }
  }

  public checkMaxCards(event): void {
    if (this.commonData.maxNumberOfCardsPerRow < this.commonData.minNumberOfCardsPerRow) {
      this.commonData.maxNumberOfCardsPerRow = this.commonData.minNumberOfCardsPerRow;
    }
  }

  public checkMaxElements(event): void {
    if (this.commonData.maxNumberOfElementsPerCard < this.commonData.minNumberOfElementsPerCard) {
      this.commonData.maxNumberOfElementsPerCard = this.commonData.minNumberOfElementsPerCard;
    }
  }

  public submit(): void {
    this.submitted.emit(this.commonData);
  }
}
