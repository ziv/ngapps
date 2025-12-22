import {Component, inject} from '@angular/core';
import {Field, form} from '@angular/forms/signals';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatDialogClose, MatDialogContent} from '@angular/material/dialog';
import {Service} from './service';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {ColorScheme} from '@shared';

@Component({
  selector: 'app-settings',
  styles: ``,
  imports: [
    Field,
    MatCard,
    MatCardContent,
    MatButton,
    MatCardActions,
    MatDialogContent,
    MatSlideToggle,
    MatDialogClose,
    ColorScheme
  ],
  template: `
    <mat-dialog-content>
      <section class="flex flex-col gap-4">
        <mat-card>
          <mat-card-content>
            <p>Calibration, set the device current orientation to (0,0).</p>
            <p>Reset to remove the calibration settings.</p>
          </mat-card-content>
          <mat-card-actions class="gap-2">
            <button matButton="filled" (click)="service.calibrate()">Calibrate</button>
            <button matButton="tonal" (click)="service.resetCalibration()">Reset</button>
          </mat-card-actions>
        </mat-card>
        <mat-card>
          <mat-card-content>
            <section class="flex flex-col gap-4">
              <mat-slide-toggle [field]="frm.showVerticalLine">Show vertical leveler</mat-slide-toggle>
              <mat-slide-toggle [field]="frm.showHorizontalLine">Show horizontal leveler</mat-slide-toggle>
              <mat-slide-toggle [field]="frm.showDebugInfo">Show Debug Info</mat-slide-toggle>
            </section>
          </mat-card-content>
        </mat-card>
        <mat-card>
          <mat-card-content>
              <na-color-scheme>Color scheme</na-color-scheme>
          </mat-card-content>
        </mat-card>
        <button matButton="tonal" mat-dialog-close>Close</button>
      </section>
    </mat-dialog-content>
  `,
})
export class Settings {
  protected readonly service = inject(Service);
  protected readonly frm = form(this.service.settings);
}
