import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonFunctions } from './common/common-functions';
import { CommonData } from './common/common-data';
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
export class BootstrapPageComponent extends CommonFunctions implements OnInit, AfterViewInit {

  private numbers = CommonData.numbers;
  private data = '';
  private blob = new Blob();
  private fileName = '';
  private dataLink: HTMLAnchorElement;
  private imageLink: HTMLAnchorElement;
  @ViewChild('page') private page: ElementRef;
  @ViewChild('dataAnchor') private dataAnchor: ElementRef;
  @ViewChild('imageAnchor') private imageAnchor: ElementRef;
  public dataForHtml: Data;
  public characters = CommonData.characters;
  public displayPage = false;
  public settings = new CommonData();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.generateRandomData();
    if (this.displayPage && this.settings.automaticReload) {
      setInterval(() => {
        window.location.reload();
      }, this.settings.reloadTimer * 1000);
    }
  }

  ngAfterViewInit(): void {
    if (this.displayPage) {
      this.saveAll();
    }
  }

  private initialiseDataForHtml(): void {
    this.dataForHtml = { header: [], body: { rows: [] } };
  }

  private saveAll(): void {
    // generate a random filename (e.g. 254-geiud-8701-utgbxpla.png)
    this.fileName =
      CommonFunctions.getRandomString(this.numbers, 3) +
      '-' +
      CommonFunctions.getRandomString(this.characters, 5) +
      '-' +
      CommonFunctions.getRandomString(this.numbers, 4) +
      '-' +
      CommonFunctions.getRandomString(this.characters, 8);
    if (this.settings.saveData) {
      // save the DSL code used to produce the page
      this.saveData();
    }
    if (this.settings.savePicture) {
      // save a screenshot of the page
      this.savePicture();
    }
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

    // Get a random number of buttons to display in the header between predefined min and max
    const numberOfButtonsInHeader = CommonFunctions.getRandomNumber(
      this.settings.minNumberOfButtonsInHeader, this.settings.maxNumberOfButtonsInHeader
    );

    // Start the header in the DSL code
    let headerString = 'header {\n';

    const buttonsInHeader = [];

    for (let i = 0; i < numberOfButtonsInHeader; ++i) {
      // add a random button to the header
      buttonsInHeader.push(CommonFunctions.getRandomButton());
      // add said button to the DSL code
      headerString += buttonsInHeader[i];
      if (i !== numberOfButtonsInHeader - 1) {
        // if this is not the last button in the header add a comma to the DSL code
        headerString += ',';
      }
      // add the object to the variable used to generate the HTML code
      this.dataForHtml.header.push({ element: buttonsInHeader[i] });
    }
    // close the header element in the DSL code
    headerString += '\n}';

    // start the rows element in the DSL code
    const rowsContainer = '\nrows {';

    // get a random number of rows between predefined min and max
    const numberOfRows = CommonFunctions.getRandomNumber(
      this.settings.minNumberOfRows, this.settings.maxNumberOfRows
    );
    // variable to store all the rows elements in the DSL code
    let rowStrings = '';

    for (let i = 0; i < numberOfRows; ++i) {
      // build the row object used to generate the HTML code
      const row: Row = { cards: [] };
      // start the row element in the DSL code
      let rowString = '\nrow {';
      // variable to store all the cards per row in the DSL code
      let cardsStrings = '';
      // get a random number of cards for the current row, between predefined min and max
      const numberOfCards = CommonFunctions.getRandomNumber(
        this.settings.minNumberOfCardsPerRow, this.settings.maxNumberOfCardsPerRow
      );

      for (let j = 0; j < numberOfCards; ++j) {
        // start the card element in the DSL code
        let cardString = '\ncard {\n';
        // build the card object used to generate the HTML code
        const card = { card: [] };
        const elements = [];
        // get a random number of elements for the current card, between predefined min and max
        const numberOfElementsPerCard = CommonFunctions.getRandomNumber(
          this.settings.minNumberOfElementsPerCard, this.settings.maxNumberOfElementsPerCard
        );

        for (let k = 0; k < numberOfElementsPerCard; ++k) {
          if (k === 0) {
            // first element in a card is always the title
            elements.push('title');
          } else {
            elements.push(CommonFunctions.getRandomElement());
          }
          // add the current element to the DSL code for this card
          cardString += elements[k];
          if (k + 1 === numberOfElementsPerCard) {
            // if this is the last element inside the card then close the card element
            cardString += '\n}';
          } else {
            cardString += ',';
          }
          // add the current element to the variable for the current card used to generate the HTML code
          card.card.push({ element : elements[k] });
        }
        // add the current card to the cards variable used to generate the HTML code
        row.cards.push(card);
        // add the current card to the DSL code
        cardsStrings += cardString;
      }
      // add all the cards of the current row to the DSL code and close the current row element
      rowString += cardsStrings + '\n}';
      // add the current row to the DSL code
      rowStrings += rowString;
      // add the current row to the rows variable used to generate the HTML code
      this.dataForHtml.body.rows.push(row);
    }
    // add each element to the DSL code and close the whole thing
    this.data += headerString + rowsContainer + rowStrings + '\n}';
  }

  public setDisplayPage(settings: CommonData): void {
    this.displayPage = true;
    this.settings = settings;
    this.generateRandomData();
  }
}
