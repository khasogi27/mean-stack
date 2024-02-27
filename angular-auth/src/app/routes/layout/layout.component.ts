import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { SelectOptionComponent } from '../../shared/select-option/select-option.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SelectOptionComponent, FormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  public isShellbarProfile: boolean = true;
  public isShellbarProgres: boolean = true;

  private _authSvc = inject(AuthService);
  public progress: number = 0;
  public progressColor!: 'positive' | 'informative' | 'critical';

  constructor() {
    this.updateBarColor();
    // setInterval(() => {
    //   if (this.progress < 100) {
    //     this.progress++;
    //     this.updateBarColor();
    //   } 
    // },100);
  }
  

  onSignout() {
    this._authSvc.logout();
  }

  get progressDasharray(): string {
    return this.progress + ' '  + (100 - this.progress);
  }

  updateBarColor() {
    if (this.progress >= 90) this.progressColor = 'positive';
    else if (this.progress >= 60) this.progressColor = 'informative';
    else this.progressColor = 'critical';
  }

}
