import {Component, inject} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import Settings from './settings';
import {Service} from './service';

@Component({
  selector: 'app-root',
  host: {
    '(dblclick)': 'openMenu()',
    class: 'block w-full h-full',
  },
  template: `
    @if (service.settings().showDebugInfo) {
      <pre class="absolute top-1 left-1">
α = {{service.orientation().alpha}}
β = {{service.orientation().beta}}
γ = {{service.orientation().gamma}}
Vertical Offset = {{service.settings().verticalOffset}}
Horizontal Offset = {{service.settings().horizontalOffset}}
      </pre>
    }
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

  constructor() {
    // document.documentElement.style.setProperty('color-scheme', 'normal');
  }

  openMenu() {
    this.dialog.open(Settings);
  }
}

