import { formatCurrency } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Input, LOCALE_ID, OnInit, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

type CurrencyFormat = 'IDR' | 'USD' | '';
type CurrencyType = 'Rp' | '$' | '';
type InputType = 'currency' | 'phone' | '';

@Directive({
  selector: '[formatType]',
  standalone: true
})
export class CustomFormatInputDirective implements OnInit {

  private locale = inject(LOCALE_ID)
  private el = inject(ElementRef);
  private control = inject(NgControl);

  public format: InputType = '';
  public currency: CurrencyType = '';

  @Input('formatType') set formatSetter(value: InputType) {
    this.format = value;
  }

  @Input('currency') set currencySetter(value: CurrencyFormat) {
    if (value == 'IDR') this.currency = 'Rp';
    else if (value  == 'USD') this.currency = '$';
  }

  @HostListener('blur', ['$event.target']) blur(target: any) {
    target.value = this.parse(target.value);
  }

  @HostListener('focus', ['$event.target']) focus(target: any) {
    target.value = this.control.value;
  }

  constructor() {}

  ngOnInit() {
    this.el.nativeElement.value = this.parse(this.el.nativeElement.value);
  }

  public parse(value: any): string {
    let newValue = value;
    if (this.format == 'currency') {
      newValue = formatCurrency(value, this.locale, this.currency);
    }

    return newValue;
  }
}
