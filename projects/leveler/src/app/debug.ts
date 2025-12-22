import {Component, inject} from '@angular/core';
import {Service} from './service';

@Component({
  selector: 'app-debug',
  host: {
    class: 'absolute top-2 left-2'
  },
  template: `
    <pre>
α = {{ service.orientation().alpha }}
β = {{ service.orientation().beta }}
γ = {{ service.orientation().gamma }}
Vertical Offset = {{ service.settings().verticalOffset }}
Horizontal Offset = {{ service.settings().horizontalOffset }}
    </pre>
  `,
})
export class LevelerDebug {
  protected readonly service = inject(Service);
}
