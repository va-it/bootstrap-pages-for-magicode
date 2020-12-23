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
  public dataForHtml: Data = { header: [], body: { rows: [] } };
  public data = '';
  public chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  public numbers = '0123456789';
  public blob: Blob = new Blob();
  public fileName = '';
  public dataLink: HTMLAnchorElement;
  public imageLink: HTMLAnchorElement;
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

  public saveAll(): void {
    // generate a random filename (e.g. 254-geiud-8701-utgbxpla.png)
    this.fileName =
      CommonFunctionsComponent.randomString(3, this.numbers) +
      '-' +
      CommonFunctionsComponent.randomString(5, this.chars) +
      '-' +
      CommonFunctionsComponent.randomString(4, this.numbers) +
      '-' +
      CommonFunctionsComponent.randomString(8, this.chars);
    // save the DSL code used to produce the page
    this.saveData();
    // save a screenshot of the page
    this.savePicture();
  }

  public saveData(): void {
    this.dataLink = this.dataAnchor.nativeElement;
    this.dataLink.download = this.fileName + '.gui';
    // (1) CREATE BLOB OBJECT
    this.blob = new Blob([this.data], {
      type: 'text/plain'
    });
    // (2) CREATE DOWNLOAD LINK
    this.dataLink.href = URL.createObjectURL(this.blob);
    this.dataLink.click();
    this.dataLink.remove();
  }

  public savePicture(): void {
    // HAS ISSUES WITH STYLED CHECKBOX AND RADIO INPUTS
    domtoimage.toBlob(this.page.nativeElement).then((blob: any) => {
      // To download directly on browser default 'downloads' location
      this.imageLink = this.imageAnchor.nativeElement;
      this.imageLink.download = this.fileName + '.png';
      this.imageLink.href = URL.createObjectURL(blob);
      this.imageLink.click();
      this.imageLink.remove();
    }, error => {
      console.log(error);
    });
  }

  public getRandomButton(): string {
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

  public getRandomElement(): string {
    const randomChoice = Math.floor(Math.random() * 3) + 1;
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

  public getRandomInputType(): string {
    const randomChoice = Math.floor(Math.random() * 4) + 1;
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

  public generateRandomData(): void {
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