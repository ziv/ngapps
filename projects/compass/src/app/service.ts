import {Injectable, signal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class Service {
  readonly heading = signal<number>(0);

  readonly settings = signal({
    showOuterCircle: true,
    showInnerCircle: true,
    showCompassDirections: true,
    showDegreeMarkers: true,
    showNorthIndicator: true,
    showSouthIndicator: true,
  });

  constructor() {
    window.addEventListener(
      'deviceorientation',
      this.handleOrientation.bind(this),
    );
  }

  /**
   * Converts device orientation event data to a compass heading.
   * @param event
   * @private
   */
  private handleOrientation(event: DeviceOrientationEvent) {
    if (event.alpha === null || event.beta === null || event.gamma === null) {
      return;
    }
    let compass = -(event.alpha + event.beta * event.gamma / 90);
    compass -= Math.floor(compass / 360) * 360 + 180;
    this.heading.set(Math.round(compass));
  }
}
