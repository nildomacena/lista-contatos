import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtividadesPage } from './atividades';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    AtividadesPage,
  ],
  imports: [
    SuperTabsModule,
    IonicPageModule.forChild(AtividadesPage),
  ],
})
export class AtividadesPageModule {}
