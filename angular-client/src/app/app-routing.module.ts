import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModalComponent } from './auth-modal/auth-modal.component';

const routes: Routes = [
  {
    path: 'compose',
    component: AuthModalComponent,
    outlet: 'popup'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
