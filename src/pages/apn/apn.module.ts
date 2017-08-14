import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApnPage } from './apn';

@NgModule({
  declarations: [
    ApnPage,
  ],
  imports: [
    IonicPageModule.forChild(ApnPage),
  ],
})
export class ApnPageModule {}
