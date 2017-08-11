import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalContatoPage } from './modal-contato';

@NgModule({
  declarations: [
    ModalContatoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalContatoPage),
  ],
})
export class ModalContatoPageModule {}
