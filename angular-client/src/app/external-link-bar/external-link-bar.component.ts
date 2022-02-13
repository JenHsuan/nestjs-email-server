import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-external-link-bar',
  templateUrl: './external-link-bar.component.html',
  styleUrls: ['./external-link-bar.component.scss']
})
export class ExternalLinkBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  navigate(url: string) {
    window.open(url, '_blank');
  }
}
