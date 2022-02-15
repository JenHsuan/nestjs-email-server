import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  errorMsg?: string;
  successMsg?: string;
  constructor(private messageService:MessageService) { }

  ngOnInit(): void {
    this.messageService.successMsg.subscribe(successMsg => {
      if (successMsg) {
        this.successMsg = successMsg;
        this.errorMsg = undefined
      }
    });
    this.messageService.errorMsg.subscribe(errorMsg => {
      this.errorMsg = errorMsg;
      this.successMsg = undefined;
    });
  }

}
