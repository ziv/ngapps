import {Component, ElementRef, inject, OnInit, signal, viewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    JsonPipe
  ],
  template: `
    <h1>Welcome to {{ title() }}!</h1>
    <video #video id="webcam" autoplay playsinline width="640" height="480"></video>
    @if (barcode()) {
      <button (click)="startCapture()">start</button>
      <pre>{{ barcode() | json }}</pre>
    }
    <button id="snap">Capture Photo</button>
    <canvas id="canvas" width="640" height="480" style="display:none;"></canvas>
    <img id="photo" alt="The screen capture will appear in this box.">
  `,
})
export class App implements OnInit {
  private stream!: MediaStream;
  protected readonly snack = inject(MatSnackBar);
  protected readonly video = viewChild<ElementRef<HTMLVideoElement>>('video');
  protected readonly title = signal('barcoder');
  protected readonly barcode = signal<object | null>(null);

  startCapture() {
    this.barcode.set(null);
    // @ts-ignore
    const barcodeDetector = new BarcodeDetector();
    const timer = setInterval(async () => {
      const barcodes = await barcodeDetector.detect(this.video()?.nativeElement as HTMLVideoElement);
      if (barcodes.length > 0) {
        this.barcode.set(barcodes[0]);
        clearTimeout(timer);
      }
    }, 500);
  }
  async ngOnInit() {
    // console.log(this.video());
    // const video = document.getElementById('webcam') as HTMLVideoElement;
    // const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    // const snap = document.getElementById('snap') as HTMLButtonElement;
    // const photo = document.getElementById('photo') as HTMLImageElement;
    //
    const video = (this.video() as ElementRef<HTMLVideoElement>).nativeElement;
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment'
        },
        audio: false
      });
      video.srcObject = this.stream;
    } catch (e) {
      this.snack.open(`Error accessing camera: ${e}`, 'Close', {duration: 5000});
      return;
    }
    this.startCapture();


    //
    // setInterval(async () => {
    //   // @ts-ignore
    //   const barcodeDetector = new BarcodeDetector({
    //     formats: ['qr_code', 'ean_13', 'code_128']
    //   });
    //   const barcodes = await barcodeDetector.detect(video);
    //   if (barcodes.length > 0) {
    //     console.log('Barcodes detected: ', barcodes[0]);
    //   }
    // }, 500);

    // snap.addEventListener('click', async () => {
    //   // const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    //   // Draw the current video frame onto the canvas
    //   // context.drawImage(video, 0, 0, 640, 480);
    //
    //   // @ts-ignore
    //   const barcodeDetector = new BarcodeDetector({
    //     formats: ['qr_code', 'ean_13', 'code_128']
    //   });
    //   const barcodes = await barcodeDetector.detect(video);
    //   console.log(barcodes);
    //
    //   // Convert canvas content to a Base64 data URL
    //   // const data = canvas.toDataURL('image/png');
    //   // photo.setAttribute('src', data);
    // });
  }
}
