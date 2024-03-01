import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';

export interface SelectOption {
  id: number | string;
  name: string
}

@Component({
  selector: 'app-select-option',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  templateUrl: './select-option.component.html',
  styleUrl: './select-option.component.scss'
})
export class SelectOptionComponent {
  @Input() dataSource: any[] = [];
  @Input() idKey: string = '';
  isOpen: boolean = false;

  @HostListener("click", ["$event"])
  toggle(e: any): void {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen, 'isOpen');
    // console.log(e, 'toggle');
  }
}
