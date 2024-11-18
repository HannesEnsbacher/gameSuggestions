import { Component } from '@angular/core';
import {ButtonComponent} from "../../shared/button/button.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router) {
  }

  onGetStarted($event: MouseEvent) {
    console.log('Get Started button clicked', $event)
    this.router.navigate(['/gameSelection']);
  }
}
