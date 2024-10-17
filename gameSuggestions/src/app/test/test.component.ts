import { Component } from '@angular/core';
import {ButtonComponent} from "../shared/button/button.component";

@Component({
  selector: 'app-test',
  standalone: true,
    imports: [
        ButtonComponent
    ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

  onCancel($event: MouseEvent) {
    console.log('Cancel button clicked', $event);
  }
}
