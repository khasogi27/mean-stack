import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div [class]="contentSize">
      <router-outlet></router-outlet>
    </div>
    `
})
export class AppComponent {
  public contentSize: string = 'is-compact';
}
