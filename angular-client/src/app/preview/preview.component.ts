import { Component, OnInit } from '@angular/core';
import { MailService } from '../mail/mail.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';

enum layoutEnum {
  mobile = 0,
  tablet = 1,
  desktop = 2
}
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  layoutType: layoutEnum = layoutEnum.tablet;

  preview?: SafeHtml;
  constructor(private mailService: MailService, private sanitizer: DomSanitizer) { }

  layoutForm = new FormGroup({
    'layout': new FormControl(this.layoutType.toString(), [
      Validators.required
    ])
  })

  ngOnInit(): void {
    this.mailService.mail.subscribe(data => {
      this.preview = data ? this.sanitizer.bypassSecurityTrustHtml(data) : '';
    })
  }

  setLayout(type: layoutEnum) {
    this.layoutType = type;
  }

  getProperLayout() {
    switch (this.layoutType) {
      case layoutEnum.mobile:
        return 'demo-mobile'
      case layoutEnum.tablet:
        return 'demo-tablet'
      case layoutEnum.desktop:
        return 'demo-desktop'
      case layoutEnum.mobile:
        return 'demo-tablet'
    }
  }
}
