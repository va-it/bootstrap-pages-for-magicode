export class CommonData {
  static readonly characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  static readonly numbers = '0123456789';
  private _minNumberOfButtonsInHeader = 2;
  private _maxNumberOfButtonsInHeader = 6;
  private _minNumberOfRows = 1;
  private _maxNumberOfRows = 3;
  private _minNumberOfCardsPerRow = 1;
  private _maxNumberOfCardsPerRow = 4;
  private _minNumberOfElementsPerCard = 3;
  private _maxNumberOfElementsPerCard = 3;
  private _automaticReload = true;
  private _reloadTimer = 4;
  private _savePicture = true;
  private _saveData = true;

  get minNumberOfButtonsInHeader(): number {
    return this._minNumberOfButtonsInHeader;
  }

  set minNumberOfButtonsInHeader(value: number) {
    this._minNumberOfButtonsInHeader = value;
  }

  get maxNumberOfButtonsInHeader(): number {
    return this._maxNumberOfButtonsInHeader;
  }

  set maxNumberOfButtonsInHeader(value: number) {
    this._maxNumberOfButtonsInHeader = value;
  }

  get minNumberOfRows(): number {
    return this._minNumberOfRows;
  }

  set minNumberOfRows(value: number) {
    this._minNumberOfRows = value;
  }

  get maxNumberOfRows(): number {
    return this._maxNumberOfRows;
  }

  set maxNumberOfRows(value: number) {
    this._maxNumberOfRows = value;
  }

  get minNumberOfCardsPerRow(): number {
    return this._minNumberOfCardsPerRow;
  }

  set minNumberOfCardsPerRow(value: number) {
    this._minNumberOfCardsPerRow = value;
  }

  get maxNumberOfCardsPerRow(): number {
    return this._maxNumberOfCardsPerRow;
  }

  set maxNumberOfCardsPerRow(value: number) {
    this._maxNumberOfCardsPerRow = value;
  }

  get minNumberOfElementsPerCard(): number {
    return this._minNumberOfElementsPerCard;
  }

  set minNumberOfElementsPerCard(value: number) {
    this._minNumberOfElementsPerCard = value;
  }

  get maxNumberOfElementsPerCard(): number {
    return this._maxNumberOfElementsPerCard;
  }

  set maxNumberOfElementsPerCard(value: number) {
    this._maxNumberOfElementsPerCard = value;
  }

  get automaticReload(): boolean {
    return this._automaticReload;
  }

  set automaticReload(value: boolean) {
    this._automaticReload = value;
  }

  get reloadTimer(): number {
    return this._reloadTimer;
  }

  set reloadTimer(value: number) {
    this._reloadTimer = value;
  }

  get savePicture(): boolean {
    return this._savePicture;
  }

  set savePicture(value: boolean) {
    this._savePicture = value;
  }

  get saveData(): boolean {
    return this._saveData;
  }

  set saveData(value: boolean) {
    this._saveData = value;
  }
}
