import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormatInputDirective } from '../../shared/directive/custom-format-input.directive';

@Component({
  selector: 'app-subsc',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CustomFormatInputDirective],
  templateUrl: './subsc.component.html',
  styleUrl: './subsc.component.scss'
})
export class SubscComponent {
  public dsTermCondition: { id: number, name: string }[] = [
    { id: 1, name: 'Contract 1 Year' },
    { id: 2, name: 'Payment Monthly' },
  ];

  public form: FormGroup = new FormGroup({
    userDetailPhone: new FormControl(''),
    serviceInstall: new FormControl(''),
    serviceYearly: new FormControl('')
  });

  constructor() {}

  selectTermCondition(args: any) {
    console.log(args.value);
  }

}
