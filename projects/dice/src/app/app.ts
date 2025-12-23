import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PlusMinus} from '@shared/components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PlusMinus],
  template: `
    <h1>Welcome to {{ title() }}!</h1>
    <na-plus-minus/>
    <router-outlet/>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('dice');
}
