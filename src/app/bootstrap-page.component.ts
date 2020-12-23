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
  public dataForHtml: Data;
  public chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
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

  constructor() {
    super();
    setInterval(() => {
      window.location.reload();
    }, 4000);
  }

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
      CommonFunctionsComponent.randomString(this.numbers, 3) +
      '-' +
      CommonFunctionsComponent.randomString(this.chars, 5) +
      '-' +
      CommonFunctionsComponent.randomString(this.numbers, 4) +
      '-' +
      CommonFunctionsComponent.randomString(this.chars, 8);
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

  private getRandomButton(): string {
    const randomChoice = Math.floor(Math.random() * 6) + 1;
    switch (randomChoice) {
      case 1:
        return 'btn-primary';
      case 2:
        return 'btn-secondary';
      case 3:
        return 'btn-danger';
      case 4:
        return 'btn-warning';
      case 5:
        return 'btn-success';
      default:
        return 'btn-info';
    }
  }

  private getRandomElement(): string {
    const randomChoice = CommonFunctionsComponent.randomNumber(1, 3);
    switch (randomChoice) {
      case 1:
        return 'text';
      case 2:
        return this.getRandomButton();
      case 3:
        return 'input-' + this.getRandomInputType();
      default:
        return null;
    }
  }

  private getRandomInputType(): string {
    const randomChoice = CommonFunctionsComponent.randomNumber(1, 4);
    switch (randomChoice) {
      case 1:
        return 'text';
      case 2:
        return 'password';
      case 3:
        return 'checkbox';
      case 4:
        return 'radio';
      default:
        return null;
    }
  }

  private generateRandomData(): void {
    this.initialiseDataForHtml();
    this.data = '';

    const numberOfButtonsInHeader = CommonFunctionsComponent.randomNumber(2, 6);

    let headerString = 'header {\n';

    const buttonsInHeader = [];

    for (let i = 0; i < numberOfButtonsInHeader; ++i) {
      buttonsInHeader.push(this.getRandomButton());

      headerString += buttonsInHeader[i];
      if (i !== numberOfButtonsInHeader - 1) {
        headerString += ',';
      }
      this.dataForHtml.header.push({ element: buttonsInHeader[i] });
    }
    headerString += '\n}';

    const rowsContainer = '\nrows {';

    const numberOfRows = CommonFunctionsComponent.randomNumber(1, 3);

    let rowStrings = '';

    for (let i = 0; i < numberOfRows; ++i) {
      const row: Row = { cards: [] };
      let rowString = '\nrow {';
      let cardsStrings = '';
      const numberOfCards = CommonFunctionsComponent.randomNumber(1, 4);

      for (let j = 0; j < numberOfCards; ++j) {
        const element1 = 'title';
        const element2 = this.getRandomElement();
        const element3 = this.getRandomElement();

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
