import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';

type TOccursFreq = 'daily' | 'weekly' | 'monthly';
type TRecursFreq = 'day' | 'the';
type TOccursDaily = 'once' | 'every';
type TOccursEvery = 'hour(s)';
type TDurationDate = 'no end date' | 'end date';

@Component({
  selector: 'app-job-schedule',
  standalone: true,
  imports: [TitleCasePipe, CommonModule],
  templateUrl: './job-schedule.component.html',
  styleUrl: './job-schedule.component.scss'
})
export class JobScheduleComponent {
  public occursFreqSelect: TOccursFreq = 'daily';
  public occursFreqOpt: { id: number, name: TOccursFreq }[] = [
    { id: 1, name: 'daily' },
    { id: 2, name: 'weekly' },
    { id: 3, name: 'monthly' }
  ];

  public recursFreqSelect: TRecursFreq = 'day';
  public recursFreqOpt: { id: number, name: TRecursFreq }[] = [
    { id: 1, name: 'day' },
    { id: 2, name: 'the' },
  ];

  public occursDailySelect: TOccursDaily = 'every';
  public occursDailylOpt: { id: number, name: TOccursDaily }[] = [
    { id: 1, name: 'every' },
    { id: 2, name: 'once' }
  ];

  public occursEverySelect: TOccursEvery = 'hour(s)';
  public occursEverylOpt: { id: number, name: TOccursEvery }[] = [
    { id: 1, name: 'hour(s)' }
  ];

  public durationDateSelect: TDurationDate = 'end date';
  public durationDateOpt: { id: number, name: TDurationDate }[] = [
    { id: 1, name: 'end date' },
    { id: 2, name: 'no end date' }
  ]

  constructor() {}

  public occursFreqClick(name: any): void {
    for (let select of this.occursFreqOpt) {
      if (select.id == name.value) this.occursFreqSelect = select.name;
    }
  }

  public recursFreqClick(name: any): void {
    for (let select of this.recursFreqOpt) {
      if (select.id == name.value) this.recursFreqSelect = select.name;
    }
  }

  public occursDailylClick(name: any): void {
    for (let select of this.occursDailylOpt) {
      if (select.id == name.value) this.occursDailySelect= select.name;
    }
  }

  public occursEverylClick(name: any): void {
    for (let select of this.occursEverylOpt) {
      if (select.id == name.value) this.occursEverySelect = select.name;
    }
  }

  public durationDateClick(name: any): void {
    for (let select of this.durationDateOpt) {
      if (select.id == name.value) this.durationDateSelect = select.name;
    }
  }
}
