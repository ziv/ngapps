import {Component, inject} from '@angular/core';
import {Service} from './service';
import {MatDialogContent} from '@angular/material/dialog';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {Field, form} from '@angular/forms/signals';

@Component({
  selector: 'app-settings',
  imports: [
    MatDialogContent,
    MatCard,
    MatCardContent,
    MatSlideToggle,
    Field
  ],
  host: {
    class: 'h-full w-full flex flex-row'
  },
  template: `
    <mat-dialog-content>
      <section class="flex flex-col gap-4">
        <mat-card>
          <mat-card-content>
            <section class="flex flex-col gap-4">
              <mat-slide-toggle [field]="frm.showOuterCircle">Show outer circle</mat-slide-toggle>
              <mat-slide-toggle [field]="frm.showInnerCircle">Show inner circle</mat-slide-toggle>
            </section>
          </mat-card-content>
        </mat-card>
      </section>
    </mat-dialog-content>
  `,
})
export class Settings {
  service = inject(Service);
  frm = form(this.service.settings);
}
