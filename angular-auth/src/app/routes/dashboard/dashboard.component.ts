import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night' | 'today';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public progress: number = 0;
  public getToday: TimeOfDay = 'today';

  constructor() {
    setInterval(() => {
      if (this.progress < 100) {
        this.progress++;
      } else {
        this.progress = 0;
      }
    },100);

    this.getToday = this._timeOfDay();
  }

  private _timeOfDay(): TimeOfDay  {
    const hour = new Date().getHours();
    if (hour >= 4 && hour <= 11) return 'morning';
    if (hour >= 12 && hour <= 16) return 'afternoon';
    if (hour >= 17 && hour <= 20) return 'evening';
    if (hour >= 21 || hour <= 3) return 'night';
    else return 'today'
  }

  get progressDasharray(): string {
    return this.progress + ' '  + (100 - this.progress);
  }
}
