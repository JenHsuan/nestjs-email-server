import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { ShowModalService } from './show-modal.service';

@Component({
  selector: 'app-show-modal',
  templateUrl: './show-modal.component.html',
  styleUrls: ['./show-modal.component.scss']
})
export class ShowModalComponent implements OnInit {
  constructor(private showModalService: ShowModalService) { }

  ngOnInit(): void {}

  close() {
    this.showModalService.hideModal();
  }
}
