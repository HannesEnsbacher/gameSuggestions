import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";

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
  private searchSubject = new Subject<string>(); // Observable for debouncing
  private manualSearch: boolean = false;
  private inThrottle: boolean = false;

  constructor() {
    // Set up debounce logic
    this.searchSubject.pipe(
      debounceTime(500), // Wait 300ms after the last keystroke
      distinctUntilChanged(), // Emit only if the value has changed
    ).subscribe(term => {
      if (!this.manualSearch && (term.length >= 3 || term.length === 0)) { // Only emit if term has at least 3 characters
        this.search.emit(term);
      }
      this.manualSearch = false;
    });

  }

  onSearch() {
    this.manualSearch = true;
    if (!this.inThrottle){
      this.search.emit(this.searchTerm);
      this.inThrottle = true;
      setTimeout(() => (this.inThrottle = false), 1500);
    }
  }

  onSearchInput($event: any) {
    this.manualSearch = false;
    this.searchSubject.next(this.searchTerm);

  }

}
