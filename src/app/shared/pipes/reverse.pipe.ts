import { Pipe, PipeTransform } from '@angular/core';
import { reverse } from 'dns';
import { filter } from 'rxjs/operators';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: any): any {
    if (!value) { return; }
    value = filter(value, ['dismissed', false]); // remove dismissed notifications
    return reverse(value, () => {});
  }

}
