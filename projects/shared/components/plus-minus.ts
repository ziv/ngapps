import {Component, input, model, numberAttribute} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {FormValueControl} from '@angular/forms/signals';

@Component({
  selector: 'na-plus-minus',
  host: {
    class: 'flex flex-row items-center gap-2',
  },
  imports: [
    MatIconButton,
    MatIcon
  ],
  styles:`
    /*span:has(input:focus) {*/
    /*  outline: 2px solid red;*/
    /*}*/
    input:focus,
    input:active {
      outline: none;
    }

    input {
      width: 2rem;
      text-align: center;
    }

    input[type="number"]::-webkit-inner-spin-button {
      display: none;
    }
  `,
  template: `
    <span class="flex flex-row items-center">
      <button matIconButton (click)="inc()">
        <mat-icon>add</mat-icon>
      </button>
      <input type="number" [value]="value()">
      <button matIconButton (click)="dec()">
        <mat-icon>remove</mat-icon>
      </button>
    </span>
  `,

})
export class PlusMinus implements FormValueControl<number> {
  readonly value = model<number>(0);
  readonly min = input(undefined, {transform: numberAttribute});
  readonly max = input(undefined, {transform: numberAttribute});

  protected inc() {
    const max = this.max();
    if (max !== undefined && this.value() >= max) {
      return;
    }
    this.value.set(this.value() + 1);
  }

  protected dec() {
    const min = this.min();
    if (min !== undefined && this.value() <= min) {
      return;
    }
    this.value.set(this.value() - 1);
  }
}
