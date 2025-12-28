import {Component, inject} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Settings} from './settings';
import {Service} from './service';
import {LevelerDebug} from './debug';
import {MatMiniFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  host: {
    '(dblclick)': 'settings()',
    class: 'box f-w f-h',
  },
  imports: [
    LevelerDebug,
    MatMiniFabButton,
    MatIcon,
  ],
  styles: `
    .fab-button {
      position: absolute;
      bottom: 1em;
      right: 1em;
      z-index: 999;
    }
  `,
  template: `
    @if (service.settings().showDebugInfo) {
      <app-debug/>
    }
    <button matMiniFab
            class="fab-button"
            (click)="settings()">
      <mat-icon>settings</mat-icon>
    </button>
    <svg width="100%" height="100%">
      <line x1="0"
            [attr.y1]="service.vmark()"
            x2="100%"
            [attr.y2]="service.vmark()"
            stroke="var(--mat-sys-secondary-container)"
            stroke-width="5"/>

      <line [attr.x1]="service.hmark()"
            y1="0"
            [attr.x2]="service.hmark()"
            y2="100%"
            stroke="var(--mat-sys-secondary-container)"
            stroke-width="5"/>

      @if (service.settings().showHorizontalLine) {
        <line [attr.x1]="service.horizontal()"
              y1="0"
              [attr.x2]="service.horizontal()"
              y2="100%"
              stroke="var(--mat-sys-on-surface)" stroke-width="1"/>
      }

      @if (service.settings().showVerticalLine) {
        <line x1="0"
              [attr.y1]="service.vertical()"
              x2="100%"
              [attr.y2]="service.vertical()"
              stroke="var(--mat-sys-on-surface)" stroke-width="1"/>
      }
    </svg>
  `,
})
export class App {
  protected readonly dialog = inject(MatDialog);
  protected readonly service = inject(Service);

  settings() {
    this.dialog.open(Settings);
  }
}

