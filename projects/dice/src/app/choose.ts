import {Component} from '@angular/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  imports: [MatSlideToggle],
  template: `
    <h2>Select a dice or multiple dices to use</h2>
    <mat-slide-toggle>4 faces</mat-slide-toggle>
    <mat-slide-toggle> faces</mat-slide-toggle>
  `,
  styles: [],
})
export class Choose {

}

export default Choose;
