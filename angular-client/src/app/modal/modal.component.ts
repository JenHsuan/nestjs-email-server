import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { ShowModalService } from '../show-modal/show-modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit {
  @ViewChild("modalBackground")
  modalBackground!: ElementRef;

  constructor(private showModalService: ShowModalService) { }

  ngAfterViewInit(): void {
    fromEvent(this.modalBackground.nativeElement, 'click').subscribe(() => {
      this.close()
    })
  }

  ngOnInit(): void {}

  private close() {
    this.showModalService.hideModal();
  }
}
