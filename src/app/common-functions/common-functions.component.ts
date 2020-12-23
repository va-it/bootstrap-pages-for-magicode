export class CommonFunctionsComponent {
  protected static getRandomString(chars: string, length: number): string {
    let stringToReturn = '';
    for (let i = length; i > 0; --i) {
      stringToReturn += chars[this.getRandomNumber(0, chars.length)];
    }
    return stringToReturn.toLowerCase();
  }

  protected static getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * max) + min;
  }

  protected static getRandomText(chars: string, length: number = 10, spaces: number = 1, upperCase: boolean = true): string {
    const textCharacters = Array.from(this.getRandomString(chars, length));
    if (upperCase) {
      textCharacters[0] = textCharacters[0].toUpperCase();
    }
    const currentSpaces = [];
    while (currentSpaces.length < spaces) {
      const spacePosition = this.getRandomNumber(2, (length - 3));
      if (currentSpaces.indexOf(spacePosition) !== -1) {
        break;
      }
      textCharacters[spacePosition] = ' ';
      if (upperCase) {
        textCharacters[spacePosition + 1] = textCharacters[spacePosition - 1].toUpperCase();
      }
      currentSpaces.push(spacePosition);
    }
    return textCharacters.join('');
  }

  protected static getRandomButton(): string {
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

  protected static getRandomInputType(): string {
    const randomChoice = CommonFunctionsComponent.getRandomNumber(1, 4);
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

  protected static getRandomElement(): string {
    const randomChoice = CommonFunctionsComponent.getRandomNumber(1, 3);
    switch (randomChoice) {
      case 1:
        return 'text';
      case 2:
        return CommonFunctionsComponent.getRandomButton();
      case 3:
        return 'input-' + CommonFunctionsComponent.getRandomInputType();
      default:
        return null;
    }
  }
}
