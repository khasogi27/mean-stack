import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { SelectOptionComponent } from '../../shared/select-option/select-option.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SelectOptionComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  public isShellbarAction: boolean = true;

  private _authSvc = inject(AuthService);

  onSignout() {
    this._authSvc.logout();
  }
}
