import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowModalService {
  shouldModalOpen = new Subject<boolean>();
  constructor() { }

  showModal() {
    this.shouldModalOpen.next(true);
  }

  hideModal() {
    this.shouldModalOpen.next(false);
  }
}
