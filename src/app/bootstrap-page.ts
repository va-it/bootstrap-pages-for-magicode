import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import domtoimage from 'dom-to-image';
import html2canvas from 'html2canvas';
import * as rasterizeHTML from 'rasterizehtml';

@Component({
  selector: 'bootstrap-page',
  styleUrls: ['bootstrap-page.css'],
  templateUrl: 'bootstrap-page.html'
})
export class BootstrapPage implements OnInit, AfterViewInit {
  public dataForHtml: any = {};
  public data: string = '';
  public chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  public numbers: string = '0123456789';
  public blob: Blob = new Blob;
  public fileName: string = '';
  public dataLink: HTMLAnchorElement;
  public imageLink: HTMLAnchorElement;
  public string: string = '';
  @ViewChild('page') page: ElementRef;
  @ViewChild('dataAnchor') dataAnchor: ElementRef;
  @ViewChild('imageAnchor') imageAnchor: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;

  constructor() {
    // setInterval(() => {
    //   window.location.reload();
    // }, 5000);
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
      this.randomString(3, this.numbers) +
      '-' +
      this.randomString(5, this.chars) +
      '-' +
      this.randomString(4, this.numbers) +
      '-' +
      this.randomString(8, this.chars);
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
  }

  public savePicture(): void {
    // html2canvas(this.page.nativeElement).then(canvas => {
    //   // Convert the canvas to blob
    //   canvas.toBlob(blob => {
    //     // To download directly on browser default 'downloads' location
    //     this.imageLink = this.imageAnchor.nativeElement;
    //     this.imageLink.download = this.fileName + '.png';
    //     this.imageLink.href = URL.createObjectURL(blob);
    //     this.imageLink.click();
    //   }, 'image/png');
    // });
    rasterizeHTML.drawDocument(this.page.nativeElement, this.canvas.nativeElement).then(result => {
      const blob = new Blob([result.image.src], {type : 'image/svg+xml'});
      // To download directly on browser default 'downloads' location
      this.imageLink = this.imageAnchor.nativeElement;
      this.imageLink.download = this.fileName + '.png';
      this.imageLink.href = URL.createObjectURL(blob);
      this.imageLink.click();
    });
  }

  public randomString(length: number, chars: string): string {
    let result = '';
    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result.toLowerCase();
  }

  public randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * max) + min;
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
    const randomChoice = Math.floor(Math.random() * 5) + 1;
    switch (randomChoice) {
      case 1:
        return 'text';
      case 2:
        return 'password';
      case 3:
        return 'checkbox';
      case 4:
        return 'radio';
      case 5:
        return 'range';
      default:
        return null;
    }
  }

  public generateRandomData(): void {
    this.dataForHtml = { header: [], body: { rows: [] } };

    this.data = '';

    const numberOfButtonsInHeader = this.randomNumber(2, 6);

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

    const numberOfRows = this.randomNumber(1, 3);

    let rowStrings = '';

    for (let i = 0; i < numberOfRows; ++i) {
      let rowString = '\nrow {';
      let cardsStrings = '';
      let myRow = {};
      const myCards = [];
      const numberOfCards = this.randomNumber(1, 4);

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
        myCards.push(card);
        cardsStrings += cardString;
      }
      myRow = { cards: myCards };

      rowString += cardsStrings + '\n}';
      rowStrings += rowString;
      this.dataForHtml.body.rows.push(myRow);
    }
    this.data += headerString + rowsContainer + rowStrings + '\n}';
  }
}
