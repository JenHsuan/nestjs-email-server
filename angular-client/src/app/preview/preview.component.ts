import { Component, OnInit } from '@angular/core';
import { MailService } from '../mail/mail.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  preview?:SafeHtml;
  constructor(private mailService:MailService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.mailService.mail.subscribe(data => {
      this.preview = data ? this.sanitizer.bypassSecurityTrustHtml(data) : '';
    })
  }

}
