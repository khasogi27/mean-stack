import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night' | 'today';

interface Tile {
  index: number;
  url: string;
  title: string;
  subtitle: string;
  footerText: string;
  contentIcon?: string;
  footerSection: string;
}

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
  public dsTitleBasic: Tile[] = [];

  constructor() {
    this.dsTitleBasic = [
      { index: 0, url: '/user', title: 'User', subtitle: 'Subtitle', footerText: 'Now', footerSection: 'Footer', contentIcon: 'refresh' },
      { index: 1, url: '/job-schedule', title: 'Job Schedule', subtitle: 'Subtitle', footerText: 'Now', footerSection: 'Footer', contentIcon: 'refresh' },
      { index: 2, url: '/subscription', title: 'Subscription', subtitle: 'Subtitle', footerText: 'Now', footerSection: 'Footer', contentIcon: 'refresh' },
      { index: 3, url: '/local-loop', title: 'Local Loop', subtitle: 'Subtitle', footerText: 'Now', footerSection: 'Footer', contentIcon: 'refresh' },
    ];

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
