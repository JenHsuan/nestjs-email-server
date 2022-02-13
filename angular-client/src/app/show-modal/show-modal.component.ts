import { Component, OnInit, } from '@angular/core';
import { ShowModalService } from './show-modal.service';

@Component({
  selector: 'app-show-modal',
  templateUrl: './show-modal.component.html',
  styleUrls: ['./show-modal.component.scss']
})
export class ShowModalComponent implements OnInit {
  private modalClass: string = 'hhidden';
  constructor(private showModalService:ShowModalService) { }

  getModalClass() {
    return this.modalClass;
  }

  ngOnInit(): void {
    this.showModalService.shouldModalOpen.subscribe((shouldShowModal: boolean) => {
      this.setDialog(shouldShowModal);
    })
  }

  setDialog(shouldOpen:boolean) {
    this.modalClass = shouldOpen ? 'sshow' : 'hhidden';
  }
}
