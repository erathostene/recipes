import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[rbDropdown]'
})
export class DropdownDirective {
  private isShowed = false;
  @HostBinding('class.show') get showed() {
    return this.isShowed;
  }
  @HostListener('click') open() {
    this.isShowed = true;
  }
  @HostListener('mouseleave') close() {
    this.isShowed = false;
  }

  constructor() { }

}
