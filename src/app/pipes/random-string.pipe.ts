import { Pipe, PipeTransform } from '@angular/core';
import { CommonFunctionsComponent } from '../common-functions/common-functions.component';

@Pipe({
  name: 'randomString'
})
export class RandomStringPipe extends CommonFunctionsComponent implements PipeTransform {

  transform(value: any, length: number, chars: string): any {
    return CommonFunctionsComponent.randomString(length, chars);
  }
}
