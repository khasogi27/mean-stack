import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SelectOptionComponent, SelectOption } from '../../shared/components/select-option/select-option.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, SelectOptionComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  public dsStreetSelect: SelectOption[] = [{ id: '1',  name: 'Street 1' }, { id: '2', name: 'Street 2' }];
  public dsCountrySelect: SelectOption[] = [{ id: '1',  name: 'Country 1' }, { id: '2', name: 'Country 2' }];
  public id_key: string = 'name';
}
