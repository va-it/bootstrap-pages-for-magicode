export class CommonFunctionsComponent {
  public static randomString(length: number, chars: string): string {
    let result = '';
    for (let i = length; i > 0; --i) {
      result += chars[this.randomNumber(0, chars.length)];
    }
    return result.toLowerCase();
  }
  public static randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * max) + min;
  }
}
