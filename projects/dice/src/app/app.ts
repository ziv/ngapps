import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PlusMinus} from '@shared/components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PlusMinus],
  template: `
    <h1>Welcome to {{ title() }}!</h1>
    <section>
      <na-plus-minus/>
      4 faces
    </section>
    <na-plus-minus/> 6 faces
    <na-plus-minus/> 8 faces
    <router-outlet/> 10 faces
    <na-plus-minus/> 12 faces
    <na-plus-minus/> 16 faces
    <na-plus-minus/> 20 faces
    <na-plus-minus/> 24 faces
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('dice');
}
