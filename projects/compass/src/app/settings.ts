import {Component, inject} from '@angular/core';
import {Service} from './service';
import {MatDialogContent} from '@angular/material/dialog';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {Field, form} from '@angular/forms/signals';
import {ColorScheme} from '@shared/components';

@Component({
  selector: 'app-settings',
  imports: [
    MatDialogContent,
    MatCard,
    MatCardContent,
    MatSlideToggle,
    Field,
    ColorScheme
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
              <mat-slide-toggle [field]="frm.showCompassDirections">Show directions</mat-slide-toggle>
              <mat-slide-toggle [field]="frm.showDegreeMarkers">Show markers</mat-slide-toggle>
              <mat-slide-toggle [field]="frm.showNorthIndicator">Show north indicator</mat-slide-toggle>
              <mat-slide-toggle [field]="frm.showSouthIndicator">Show south indicator</mat-slide-toggle>
              <na-color-scheme />
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
