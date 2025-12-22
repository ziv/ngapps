import {Component, OnInit, signal} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

type Scheme = 'dark' | 'light' | 'normal';

@Component({
  selector: 'na-color-scheme',
  host: {
    class: 'flex flex-row items-center gap-2',
  },
  imports: [
    MatIconButton,
    MatIcon
  ],
  template: `
    @switch (mode()) {
      @case ('normal') {
        <button matIconButton (click)="setScheme('dark')">
          <mat-icon>dark_mode</mat-icon>
        </button>
      }
      @case ('dark') {
        <button matIconButton (click)="setScheme('light')">
          <mat-icon>light_mode</mat-icon>
        </button>
      }
      @case ('light') {
        <button matIconButton (click)="setScheme('normal')">
          <mat-icon>computer</mat-icon>
        </button>
      }
    }
    <span><ng-content/></span>
  `,
})
export class ColorScheme implements OnInit {
  mode = signal<Scheme>('normal');

  setScheme(scheme: 'dark' | 'light' | 'normal') {
    this.mode.set(scheme);
    document.documentElement.style.setProperty('color-scheme', scheme);
  }

  ngOnInit() {
    // if the user has a dark mode preference, set it initially
    if (
      // read from media query
      window.matchMedia('(prefers-color-scheme: dark)').matches ||
      // or from computed style
      window.getComputedStyle(document.documentElement).getPropertyValue('color-scheme') === 'dark') {
      this.setScheme('dark');
    }
  }
}
