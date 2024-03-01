import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { SelectOptionComponent } from '../shared/components/select-option/select-option.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IProfile } from '../shared/interfaces/response';

type ProgressColor = 'positive' | 'informative' | 'critical';

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

  private _authSvc: AuthService = inject(AuthService);
  public progress: number = 0;
  public progressColor!: ProgressColor;
  
  public user: IProfile = this._authSvc.guest;

  constructor() {
    this.progressColor = this.updateBarColor();
    setInterval(() => {
      if (this.progress < 100) {
        this.progress++;
        this.progressColor = this.updateBarColor();
      } 
    },100);
    this._authSvc.userProfile().subscribe((e: IProfile) => this.user = e);
  }
  

  get initialName(): string {
    return this.user.fullName.split('')[0];
  }

  onSignout(): void {
    this._authSvc.logout();
  }

  get progressDasharray(): string {
    return this.progress + ' '  + (100 - this.progress);
  }

  updateBarColor(): ProgressColor {
    return this.progress >= 90 ? 'positive' : this.progress >= 60 ? 'informative' : 'critical';
  }

}
