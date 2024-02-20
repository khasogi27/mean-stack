import { Component, inject } from '@angular/core';
import { SelectOption, SelectOptionComponent } from '../../shared/select-option/select-option.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SelectOptionComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public dsStreetSelect: SelectOption[] = [{ id: '1',  name: 'Street 1' }, { id: '2', name: 'Street 2' }];
  public dsCountrySelect: SelectOption[] = [{ id: '1',  name: 'Country 1' }, { id: '2', name: 'Country 2' }];
  public id_key: string = 'name';
  public isShellbarAction: boolean = true;

  private _authSvc = inject(AuthService);

  onSignout() {
    this._authSvc.logout();
  }
}
