import {computed, inject, Injectable, signal} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

const clamp = (n: number) => Math.min(Math.max(n, -90), 90);

/**
 * Application logic and state management.
 */
@Injectable({providedIn: 'root'})
export class Service {
  /**
   * Snackbar service.
   * @private
   */
  private readonly snack = inject(MatSnackBar);

  /**
   * App viewport dimensions.
   * @private
   */
  private readonly dimensions = signal({width: window.innerWidth, height: window.innerHeight});

  /**
   * Device orientation data.
   */
  readonly orientation = signal({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });

  // public API

  /**
   * User settings.
   */
  readonly settings = signal({
    verticalOffset: 0,
    horizontalOffset: 0,
    showHorizontalLine: true,
    showVerticalLine: true,
    showDebugInfo: false,
  });

  /**
   * Computed vertical position based on device orientation.
   */
  readonly vertical = computed(() => {
    const size = this.dimensions().height / 2;
    return size + size * clamp(this.orientation().beta) / 90
  });

  /**
   * Computed horizontal position based on device orientation.
   */
  readonly horizontal = computed(() => {
    const size = this.dimensions().width / 2;
    return size + size * clamp(this.orientation().gamma) / 90;
  });

  vmark = computed(() => this.dimensions().height / 2 - this.settings().verticalOffset);
  hmark = computed(() => this.dimensions().width / 2 - this.settings().horizontalOffset);

  /**
   * Register event listeners.
   * Since the app does not have routes, there is no need to unregister them.
   */
  constructor() {
    window.addEventListener('deviceorientation', (e: DeviceOrientationEvent) => {
      this.orientation.set({
        alpha: e.alpha ?? 0,
        beta: e.beta ?? 0,
        gamma: e.gamma ?? 0,
      });
    });

    window.addEventListener('resize', () => {
      this.dimensions.set({
        width: window.innerWidth,
        height: window.innerHeight
      });
    });
  }

  /**
   * Calibrate the device by setting the current orientation as the (0,0) point.
   */
  calibrate() {
    this.settings.set({
      ...this.settings(),
      verticalOffset: (this.dimensions().height / 2) - this.vertical(),
      horizontalOffset: (this.dimensions().width / 2) - this.horizontal(),
    });
    this.snack.open('Calibrated', undefined, {duration: 2000});
  }

  /**
   * Reset calibration offsets to zero.
   */
  resetCalibration() {
    this.settings.set({
      ...this.settings(),
      verticalOffset: 0,
      horizontalOffset: 0,
    });
    this.snack.open('Calibration reset', undefined, {duration: 2000});
  }
}
