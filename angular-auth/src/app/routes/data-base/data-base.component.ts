import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SelectOptionComponent, SelectOption } from '../../shared/select-option/select-option.component';

@Component({
  selector: 'app-data-base',
  standalone: true,
  imports: [CommonModule, SelectOptionComponent],
  templateUrl: './data-base.component.html',
  styleUrl: './data-base.component.scss'
})
export class DataBaseComponent {
  public dsStreetSelect: SelectOption[] = [{ id: '1',  name: 'Street 1' }, { id: '2', name: 'Street 2' }];
  public dsCountrySelect: SelectOption[] = [{ id: '1',  name: 'Country 1' }, { id: '2', name: 'Country 2' }];
  public id_key: string = 'name';
}
