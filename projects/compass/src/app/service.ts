import {Injectable, signal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class Service {
  readonly heading = signal<number>(0);

  readonly settings = signal({
    showOuterCircle: true,
    showInnerCircle: true,
    showCompassDirections: true,
    showDegreeMarkers: true,
    showDebugInfo: false,
  });

  constructor() {
    window.addEventListener('deviceorientation', this.handleOrientation.bind(this));
  }

  private handleOrientation(event: DeviceOrientationEvent) {
    if (event.alpha === null || event.beta === null || event.gamma === null) {
      return;
    }
    let compass = -(event.alpha + event.beta * event.gamma / 90);
    compass -= Math.floor(compass / 360) * 360;
    let heading = 360 - event.alpha;
    // Normalize to 0-360
    heading = ((heading % 360) + 360) % 360;
    this.heading.set(Math.round(compass));
  }
}
