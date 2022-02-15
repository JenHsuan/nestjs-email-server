import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-modal',
  template: `
  <app-modal>
    <app-show-modal></app-show-modal>
  </app-modal>
  `
})
export class AuthModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
