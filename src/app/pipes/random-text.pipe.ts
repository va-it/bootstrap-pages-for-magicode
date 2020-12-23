import { Pipe, PipeTransform } from '@angular/core';
import { CommonFunctionsComponent } from '../common-functions/common-functions.component';

@Pipe({
  name: 'randomText'
})
export class RandomTextPipe extends CommonFunctionsComponent implements PipeTransform {

  transform(value: any, chars: string, length?: number, spaces?: number, upperCase?: boolean): any {
    return CommonFunctionsComponent.randomText(chars, length, spaces, upperCase);
  }
}
