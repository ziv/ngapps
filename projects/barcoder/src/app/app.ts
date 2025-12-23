import {Component, computed, ElementRef, inject, OnInit, Signal, signal, viewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {JsonPipe} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {Capabilities} from './capabilities';

type Barcode = {
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  cornerPoints: {
    x: number;
    y: number;
  }[];
  format: string;
  rawValue: string;
}

declare class BarcodeDetector {
  detect(video: HTMLVideoElement): Promise<Barcode[]>;
}

function el<T>(s: Signal<ElementRef | undefined>) {
  return (s() as ElementRef<T>).nativeElement as T;
}

@Component({
  selector: 'app-root',
  imports: [
    MatProgressSpinner,
    MatButton,
  ],
  host: {
    '(dblclick)': 'settings()',
  },
  template: `
    <!--
    here we are using display styles to switch between video and canvas
    instead of @if to avoid re-creating the elements and losing the video stream
    or loosing the reference to the elements
    -->
    <video #video id="webcam" autoplay playsinline [style.display]="showVideo()"></video>
    <canvas #canvas style="display: none;" width="1280" height="1280"></canvas>
    <img #image [style.display]="showBarcode()"/>


    <section class="flex flex-col items-center m-4 gap-4">
      @if (mode() === 'scan') {
        <p>Scan a barcode</p>
        <p>
          <mat-spinner style="max-width: 2em"/>
        </p>
      }

      @if (mode() === 'barcode') {
        <p>Format: <span>{{ barcode()?.format }}</span></p>
        <p>Value: <span>{{ barcode()?.rawValue }}</span></p>
        <p><button matButton="filled" (click)="scan()">Again</button></p>
      }
    </section>
  `,
})
export class App implements OnInit {
  private stream!: MediaStream;

  // state
  protected readonly mode = signal<'scan' | 'barcode'>('scan');
  protected readonly showVideo = computed(() => this.mode() === 'scan' ? 'block' : 'none');
  protected readonly showBarcode = computed(() => this.mode() === 'barcode' ? 'block' : 'none');

  // services
  protected readonly snack = inject(MatSnackBar);
  protected readonly dialog = inject(MatDialog);

  // element refs
  protected readonly video = viewChild<ElementRef<HTMLVideoElement>>('video');
  protected readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  protected readonly image = viewChild<ElementRef<HTMLImageElement>>('image');


  protected readonly title = signal('barcoder');
  protected readonly barcode = signal<Barcode | null>(null);
  protected readonly debugInfo = signal<object>({});


  async ngOnInit() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          // we ask for high-res to improve detection
          width: {ideal: 1280},
          height: {ideal: 1280},

          // todo we need to check for support
          //  in order to solve the focus issue
          //  on mobile devices
          advanced: [
            // @ts-ignore
            {torch: true}, // tested and works on Xiaomi, not on Galaxy
            // @ts-ignore
            {focusMode: 'continuous'}]
        },
        audio: false
      });
      el<HTMLVideoElement>(this.video).srcObject = this.stream;
      const track = this.stream.getVideoTracks()[0];
      this.debugInfo.set(track.getCapabilities());

    } catch (e) {
      this.snack.open(`Error accessing camera: ${e}`, 'Close', {duration: 5000});
      return;
    }
    this.scan();

  }

  settings() {
    this.dialog.open(Capabilities);
  }

  scan() {
    this.barcode.set(null);
    this.mode.set('scan');
    const barcodeDetector = new BarcodeDetector();
    const timer = setInterval(async () => {
      const barcodes = await barcodeDetector.detect(el<HTMLVideoElement>(this.video));
      if (barcodes.length > 0) {
        this.barcode.set(barcodes[0]);
        this.captureAndMark(barcodes[0]);
        clearInterval(timer);
      }
    }, 500);
  }

  captureAndMark(barcode: Barcode) {
    this.mode.set('barcode');
    const ctx = el<HTMLCanvasElement>(this.canvas).getContext('2d') as CanvasRenderingContext2D;

    // copy video frame to canvas
    ctx.drawImage(el<HTMLVideoElement>(this.video), 0, 0, 1280, 1280);

    // draw bounding box
    const {x, y, width, height} = barcode.boundingBox;
    ctx.strokeStyle = "#00FF00"; // Neon green
    ctx.lineWidth = 10;
    ctx.strokeRect(x, y, width, height);

    // draw corner points
    el<HTMLImageElement>(this.image).src = el<HTMLCanvasElement>(this.canvas).toDataURL('image/png');
  }
}
