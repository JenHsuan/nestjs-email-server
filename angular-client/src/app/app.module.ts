import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { MailComponent } from './mail/mail.component';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { PreviewComponent } from './preview/preview.component';
import { ModalComponent } from './modal/modal.component';
import { ShowModalComponent } from './show-modal/show-modal.component';
import { ExternalLinkBarComponent } from './external-link-bar/external-link-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { MessageComponent } from './message/message.component';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MailComponent,
    PreviewComponent,
    ModalComponent,
    ShowModalComponent,
    ExternalLinkBarComponent,
    AuthModalComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
