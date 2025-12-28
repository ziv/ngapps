import {computed, Injectable, signal} from '@angular/core';

export type Dimensions = {
  width: number;
  height: number;
};

export type Orientation = {
  absolute: boolean;
  alpha: number;
  beta: number;
  gamma: number;
};

export type Mode =
  'unknown'
  | 'portrait'
  | 'portraitUpsideDown'
  | 'landscapeLeft'
  | 'landscapeRight'
  | 'faceUp'
  | 'faceDown';

@Injectable({providedIn: 'root'})
export class Leveler {
  private readonly dimensions = signal<Dimensions>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  private readonly orientation = signal<Orientation>({
    absolute: false,
    alpha: 0,
    beta: 0,
    gamma: 0,
  });

  /**
   * case unknown
   * The orientation of the device can’t be determined.
   *
   * case portrait
   * The device is in portrait mode, with the device held upright and the front-facing camera at the top.
   *
   * case portraitUpsideDown
   * The device is in portrait mode but upside down, with the device held upright and the front-facing camera at the bottom.
   *
   * case landscapeLeft
   * The device is in landscape mode, with the device held upright and the front-facing camera on the left side.
   *
   * case landscapeRight
   * The device is in landscape mode, with the device held upright and the front-facing camera on the right side.
   *
   * case faceUp
   * The device is held parallel to the ground with the screen facing upwards.
   *
   * case faceDown
   * The device is held parallel to the ground with the screen facing downwards.
   */
  readonly mode = computed<Mode>(() => {
    const {beta, gamma} = this.orientation();
    if (beta === null || gamma === null) {
      return 'unknown';
    }
    if (Math.abs(beta) < 10 && Math.abs(gamma) < 10) {
      return 'faceUp';
    }
    if (Math.abs(beta) > 170 && Math.abs(gamma) < 10) {
      return 'faceDown';
    }
    if (Math.abs(beta) > Math.abs(gamma)) {
      return beta > 0 ? 'portrait' : 'portraitUpsideDown';
    } else {
      return gamma > 0 ? 'landscapeRight' : 'landscapeLeft';
    }
  });

  constructor() {
    window.addEventListener('resize', () => {
      this.dimensions.set({
        width: window.innerWidth,
        height: window.innerHeight
      });
    });
    window.addEventListener('deviceorientation', (e: DeviceOrientationEvent) => {
      this.orientation.set({
        absolute: e.absolute,
        alpha: e.alpha ?? 0,
        beta: e.beta ?? 0,
        gamma: e.gamma ?? 0,
      });
    });
  }
}
