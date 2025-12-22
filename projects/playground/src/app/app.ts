import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1>Welcome to {{ title() }}!</h1>
    <h2>sub heading</h2>
    <button>hello</button>
    <p>simple text</p>
    <router-outlet />
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('playground');
}
