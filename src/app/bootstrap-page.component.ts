import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonFunctionsComponent } from './common-functions/common-functions.component';
import domtoimage from 'dom-to-image';

export interface Data {
  header: object[];
  body: Rows;
}
export interface Rows {
  rows: Row[];
}
export interface Row {
  cards: Card[];
}
export interface Card {
  card: object[];
}

@Component({
  selector: 'app-bootstrap-page',
  styleUrls: ['bootstrap-page.component.css'],
  templateUrl: 'bootstrap-page.component.html'
})
export class BootstrapPageComponent extends CommonFunctionsComponent implements OnInit, AfterViewInit {

  constructor() {
    super();
    setInterval(() => {
      window.location.reload();
    }, 4000);
  }
  public dataForHtml: Data;
  public characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private numbers = '0123456789';
  private data = '';
  private blob: Blob = new Blob();
  private fileName = '';
  private dataLink: HTMLAnchorElement;
  private imageLink: HTMLAnchorElement;
  @ViewChild('page') page: ElementRef;
  @ViewChild('dataAnchor') dataAnchor: ElementRef;
  @ViewChild('imageAnchor') imageAnchor: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;

  ngOnInit(): void {
    this.generateRandomData();
  }

  ngAfterViewInit(): void {
    this.saveAll();
  }

  private initialiseDataForHtml(): void {
    this.dataForHtml = { header: [], body: { rows: [] } };
  }

  private saveAll(): void {
    // generate a random filename (e.g. 254-geiud-8701-utgbxpla.png)
    this.fileName =
      CommonFunctionsComponent.getRandomString(this.numbers, 3) +
      '-' +
      CommonFunctionsComponent.getRandomString(this.characters, 5) +
      '-' +
      CommonFunctionsComponent.getRandomString(this.numbers, 4) +
      '-' +
      CommonFunctionsComponent.getRandomString(this.characters, 8);
    // save the DSL code used to produce the page
    this.saveData();
    // save a screenshot of the page
    this.savePicture();
  }

  private saveData(): void {
    this.dataLink = this.dataAnchor.nativeElement;
    this.dataLink.download = this.fileName + '.gui';
    // Create blob object
    this.blob = new Blob([this.data], {
      type: 'text/plain'
    });
    // Create link to download directly on browser default 'downloads' location
    this.dataLink.href = URL.createObjectURL(this.blob);
    this.dataLink.click();
    this.dataLink.remove();
  }

  public savePicture(): void {
    // HAS ISSUES WITH STYLED CHECKBOX AND RADIO INPUTS
    domtoimage.toBlob(this.page.nativeElement).then((blob: any) => {
      this.imageLink = this.imageAnchor.nativeElement;
      this.imageLink.download = this.fileName + '.png';
      this.imageLink.href = URL.createObjectURL(blob);
      this.imageLink.click();
      this.imageLink.remove();
    }, error => {
      console.log(error);
    });
  }

  private generateRandomData(): void {
    this.initialiseDataForHtml();
    this.data = '';

    const numberOfButtonsInHeader = CommonFunctionsComponent.getRandomNumber(2, 6);

    let headerString = 'header {\n';

    const buttonsInHeader = [];

    for (let i = 0; i < numberOfButtonsInHeader; ++i) {
      buttonsInHeader.push(CommonFunctionsComponent.getRandomButton());

      headerString += buttonsInHeader[i];
      if (i !== numberOfButtonsInHeader - 1) {
        headerString += ',';
      }
      this.dataForHtml.header.push({ element: buttonsInHeader[i] });
    }
    headerString += '\n}';

    const rowsContainer = '\nrows {';

    const numberOfRows = CommonFunctionsComponent.getRandomNumber(1, 3);

    let rowStrings = '';

    for (let i = 0; i < numberOfRows; ++i) {
      const row: Row = { cards: [] };
      let rowString = '\nrow {';
      let cardsStrings = '';
      const numberOfCards = CommonFunctionsComponent.getRandomNumber(1, 4);

      for (let j = 0; j < numberOfCards; ++j) {
        const element1 = 'title';
        const element2 = CommonFunctionsComponent.getRandomElement();
        const element3 = CommonFunctionsComponent.getRandomElement();

        let cardString = '\ncard {\n';
        cardString += element1 + ',' + element2 + ',' + element3 + '\n}';

        const card = {
          card: [
            { element: element1 },
            { element: element2 },
            { element: element3 }
          ]
        };
        row.cards.push(card);
        cardsStrings += cardString;
      }
      rowString += cardsStrings + '\n}';
      rowStrings += rowString;
      this.dataForHtml.body.rows.push(row);
    }
    this.data += headerString + rowsContainer + rowStrings + '\n}';
  }
}
