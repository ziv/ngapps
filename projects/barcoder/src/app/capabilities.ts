import {Component, OnInit} from '@angular/core';
import {ColorScheme} from '@shared/components';

declare class BarcodeDetector {
  static getSupportedFormats(): Promise<string[]>;
}


@Component({
  selector: 'app-capabilities',
  imports: [
    ColorScheme
  ],
  template: `
    Capabilities

    <p>todo complete me</p>

    <na-color-scheme>Color scheme</na-color-scheme>
  `
})
export class Capabilities implements OnInit {

  async ngOnInit() {
    let barcodeFormats: string[] = [];
    try {
      barcodeFormats = await BarcodeDetector.getSupportedFormats();
      console.log(barcodeFormats);
    } catch (e) {
      console.warn('BarcodeDetector is not supported in this browser.');
    }

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
        },
        audio: false
      });
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();
      console.log('Camera Capabilities:', capabilities);
      console.log('Supported Barcode Formats:', barcodeFormats);
    } catch (e) {
      console.warn('Error accessing camera:', e);
    }

  }
}
