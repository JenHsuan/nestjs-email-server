import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowModalService {
  constructor(private router: Router) { }

  showModal() {
    this.router.navigate([{
      outlets: {
        popup: 'compose'
      }
    }])
  }

  hideModal() {
    this.router.navigate([{
      outlets: {
        popup: null
      }
    }])
  }
}
