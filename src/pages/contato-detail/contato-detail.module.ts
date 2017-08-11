import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContatoDetailPage } from './contato-detail';

@NgModule({
  declarations: [
    ContatoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ContatoDetailPage),
  ],
})
export class ContatoDetailPageModule {}
