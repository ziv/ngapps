import {Component, inject} from '@angular/core';
import {Field, form} from '@angular/forms/signals';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatDialogClose, MatDialogContent} from '@angular/material/dialog';
import {Service} from './service';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {ColorScheme} from '@shared/components';
import {MatChip} from '@angular/material/chips';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-settings',
  imports: [
    Field,
    MatCard,
    MatCardContent,
    MatButton,
    MatCardActions,
    MatDialogContent,
    MatSlideToggle,
    MatDialogClose,
    ColorScheme,
    MatChip,
    DecimalPipe
  ],
  template: `
    <mat-dialog-content>
      <section class="col g-10">
        <mat-card>
          <mat-card-content>
            <section class="row center between">
              <span>Offset</span>
              <mat-chip>
                {{ service.settings().verticalOffset | number:'1.2-2' }},
                {{ service.settings().horizontalOffset | number:'1.2-2' }}
              </mat-chip>
            </section>
          </mat-card-content>
          <mat-card-actions class="between g-10">
            <p>Set the device current orientation as origin</p>
            <button matButton="filled" (click)="service.calibrate()">Calibrate</button>
          </mat-card-actions>
          <mat-card-actions class="between g-10">
            <p>Reset to remove the calibration settings</p>
            <button matButton="tonal" (click)="service.resetCalibration()">Reset</button>
          </mat-card-actions>
        </mat-card>
        <mat-card>
          <mat-card-content>
            <section class="col g-10">
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
