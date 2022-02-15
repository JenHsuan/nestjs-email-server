import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  errorMsg = new Subject<string | undefined>();
  successMsg = new Subject<string | undefined>();
  constructor() { }
}
