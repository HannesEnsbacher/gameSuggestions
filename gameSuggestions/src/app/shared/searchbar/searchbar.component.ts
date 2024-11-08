import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {
  @Input() placeholder: string = 'Search...'; // Default button label
  @Output() search = new EventEmitter<string>();

  searchTerm: string = '';

  constructor() {
  }

  onSearch() {
    this.search.emit(this.searchTerm);
  }

}
