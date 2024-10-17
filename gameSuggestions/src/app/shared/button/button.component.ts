import {booleanAttribute, Component, Input} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label: string = 'Button'; // Default button label
  @Input() type: 'button' | 'submit' = 'button'; // Button or submit type
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'tertiary' = 'primary'; // Button style
  @Input() size: 'small' | 'medium' | 'large' = 'large'; // Button size
  @Input({transform: booleanAttribute}) disabled: boolean = false; // Disabled state
  @Input({transform: booleanAttribute}) loading: boolean = false; // Show loading spinner

  handleClick(event: Event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      return;
    }
    // Custom logic for button clicks (if any)
  }
}
