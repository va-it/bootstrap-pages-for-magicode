import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'randomString'
})
export class RandomStringPipe implements PipeTransform {

  transform(value: any, length: number, chars: string): any {
    for (var i = length; i > 0; --i) {
      value += chars[Math.floor(Math.random() * chars.length)];
    }
    return value.toLowerCase();
  }

}
