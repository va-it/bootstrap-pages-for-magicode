export class CommonFunctionsComponent {
  public static randomString(chars: string, length: number): string {
    let stringToReturn = '';
    for (let i = length; i > 0; --i) {
      stringToReturn += chars[this.randomNumber(0, chars.length)];
    }
    return stringToReturn.toLowerCase();
  }

  public static randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * max) + min;
  }

  public static randomText(chars: string, length: number = 10, spaces: number = 1, upperCase: boolean = true): string {
    const textCharacters = Array.from(this.randomString(chars, length));
    if (upperCase) {
      textCharacters[0] = textCharacters[0].toUpperCase();
    }
    const currentSpaces = [];
    while (currentSpaces.length < spaces) {
      const spacePosition = this.randomNumber(2, (length - 3));
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
}
