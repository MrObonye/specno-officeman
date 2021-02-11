import {Directive, Input, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[appNgInit]'
})
export class NgInitDirective {

  @Output('appNgInit') initEvent: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.initEvent.emit();
  }
}
