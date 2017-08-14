import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConvitePage } from './convite';

@NgModule({
  declarations: [
    ConvitePage,
  ],
  imports: [
    IonicPageModule.forChild(ConvitePage),
  ],
})
export class ConvitePageModule {}
