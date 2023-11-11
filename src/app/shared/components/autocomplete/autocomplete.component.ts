import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { IContacts } from '../../models/icontacts';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="autocomplete form-group">
      <input
        type="text"
        class="form-control"
        (input)="filterItems()"
        [(ngModel)]="searchTerm"
      />
      <div class="autocomplete-dropdown" *ngIf="filteredItems.length > 0">
        <div *ngFor="let item of filteredItems" (click)="selectItem(item)">
          {{ item.contactNo }}
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .autocomplete {
        position: relative;
      }

      .autocomplete-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        z-index: 1000;
        background-color: #fff;
        border: 1px solid #ccc;
        border-top: none;
      }

      .autocomplete-dropdown div {
        padding: 8px;
        cursor: pointer;
      }

      .autocomplete-dropdown div:hover {
        background-color: #f0f0f0;
      }
    `,
  ],
})
export class AutocompleteComponent implements OnDestroy {
  searchTerm: string = '';
  items: string[] = [];

  @Output() selectedValue: EventEmitter<IContacts> =
    new EventEmitter<IContacts>();
  filteredItems: IContacts[] = [];
  subscribes!: Subscription;
  constructor(private service: SignupService) {}

  filterItems() {
    if (this.searchTerm.length > 2) {
      this.subscribes = this.service
        .getByPhoneNumber(this.searchTerm)
        .subscribe((res: IContacts[]) => (this.filteredItems = res));
    }
  }

  selectItem(item: IContacts) {
    this.searchTerm = item.contactNo;
    this.selectedValue.emit(item);
    this.filteredItems = [];
  }

  ngOnDestroy(): void {
    if (this.subscribes) this.subscribes.unsubscribe();
  }
}
