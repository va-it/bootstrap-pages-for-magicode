import { Pipe, PipeTransform } from '@angular/core';
import { CommonFunctions } from '../common/common-functions';

@Pipe({
  name: 'randomText'
})
export class RandomTextPipe extends CommonFunctions implements PipeTransform {

  transform(value: any, chars: string, length?: number, spaces?: number, upperCase?: boolean): any {
    return CommonFunctions.getRandomText(chars, length, spaces, upperCase);
  }
}
