import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({
  name: 'momentFormat'
})
export class MomentFormatPipe implements PipeTransform {

  transform(value: string | number, inputFormat: string, format: string): string {
    if(inputFormat === 'unix' && typeof value === 'number') {
      return moment.unix(value).format(format)
    }
    return moment(value, inputFormat).format(format);
  }

}
