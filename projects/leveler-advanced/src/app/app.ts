import {Component, computed, inject} from '@angular/core';
import {Leveler} from './leveler';

@Component({
  selector: 'app-root',
  template: `
    <pre>{{ leveler.mode() }}</pre>
  `,
})
export class App {
  protected readonly leveler = inject(Leveler);

  mode = computed(() => {
    switch (this.leveler.mode()) {
      case 'unknown':
      case 'portrait':
        return 'Portrait';
      // case 'unknown':
      //   return 'The orientation of the device can’t be determined.';
      // case 'portrait':
      //   return 'The device is in portrait mode, with the device held upright and the front-facing camera at the top.';
      // case 'portraitUpsideDown':
      //   return 'The device is in portrait mode but upside down, with the device held upright and the front-facing camera at the bottom.';
      // case 'landscapeLeft':
      //   return 'The device is in landscape mode, with the device held upright and the front-facing camera on the left side.';
      // case 'landscapeRight':
      //   return 'The device is in landscape mode, with the device held upright and the front-facing camera on the right side.';
      // case 'faceUp':
      //   return 'The device is held parallel to the ground with the screen facing upwards.';
      // case 'faceDown':
      //   return 'The device is held parallel to the ground with the screen facing downwards.';
      default:
        return '';
    }
  });
}
