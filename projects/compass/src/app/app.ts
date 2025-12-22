import {Component, computed, inject} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Settings} from './settings';
import {Service} from './service';

@Component({
  selector: 'app-root',
  host: {
    '(dblclick)': 'settings()',
    class: 'h-full w-full flex flex-row',
  },
  template: `
    <svg class="compass-svg"
         viewBox="0 0 300 300"
         xmlns="http://www.w3.org/2000/svg">
      @if (service.settings().showOuterCircle) {
        <circle
          cx="150"
          cy="150"
          r="140"
          fill="none"
          stroke="#333"
          stroke-width="2"
        />
      }
      @if (service.settings().showInnerCircle) {
        <circle
          cx="150"
          cy="150"
          r="130"
          fill="#f8f9fa"
          stroke="#dee2e6"
          stroke-width="1"
        />
      }
      <!-- Rotating compass group -->
      <g [attr.transform]="compassTransform()">

        @if (service.settings().showDegreeMarkers) {
          <!-- Degree markers -->
          @for (i of degreeMarkers; track i) {
            @if (i % 90 !== 0) {
              <line
                [attr.x1]="150"
                [attr.y1]="30"
                [attr.x2]="150"
                [attr.y2]="i % 30 === 0 ? 45 : 40"
                [attr.stroke]="i % 30 === 0 ? '#333' : '#999'"
                [attr.stroke-width]="i % 30 === 0 ? '2' : '1'"
                [attr.transform]="'rotate(' + i + ' 150 150)'"
              />
            }
          }
        }

        @if (service.settings().showCompassDirections) {
          <!-- Cardinal directions -->
          <text x="150" y="35" text-anchor="middle" class="cardinal north">N</text>
          <text x="265" y="155" text-anchor="middle" class="cardinal">E</text>
          <text x="150" y="275" text-anchor="middle" class="cardinal">S</text>
          <text x="35" y="155" text-anchor="middle" class="cardinal">W</text>
        }

        <!-- Compass needle -->
        <g class="needle">
          @if (service.settings().showNorthIndicator) {
            <!-- North pointer (red) -->
            <path
              d="M 150 50 L 160 150 L 150 140 L 140 150 Z"
              fill="#dc3545"
              stroke="#000"
              stroke-width="1"
            />
          }
          @if (service.settings().showSouthIndicator) {
            <!-- South pointer (white/gray) -->
            <path
              d="M 150 250 L 160 150 L 150 160 L 140 150 Z"
              fill="#e9ecef"
              stroke="#000"
              stroke-width="1"
            />
          }
        </g>
      </g>
    </svg>
  `,
  styles: `
    .compass-svg {
      filter: drop-shadow(0 10px 20px light-dark(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)));
    }

    .cardinal {
      font-size: 24px;
      font-weight: bold;
      fill: light-dark(#495057, #ced4da);
      text-shadow: -1px -1px 0 light-dark(white, black),
      1px -1px 0 light-dark(white, black),
      -1px 1px 0 light-dark(white, black),
      1px 1px 0 light-dark(white, black);
    }

    .cardinal.north {
      fill: light-dark(#dc3545, #ff6b6b);
      font-size: 28px;
      transform: translateY(5px);
    }

    .needle {
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
    }
  `,
})
export class App {
  protected readonly dialog = inject(MatDialog);
  protected readonly service = inject(Service);
  protected readonly degreeMarkers = Array.from({length: 36}, (_, i) => i * 10);
  protected readonly compassTransform = computed(() => `rotate(${-this.service.heading()} 150 150)`);

  settings() {
    this.dialog.open(Settings);
  }
}
