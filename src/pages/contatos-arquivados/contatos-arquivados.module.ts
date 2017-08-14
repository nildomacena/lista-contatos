import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContatosArquivadosPage } from './contatos-arquivados';

@NgModule({
  declarations: [
    ContatosArquivadosPage,
  ],
  imports: [
    IonicPageModule.forChild(ContatosArquivadosPage),
  ],
})
export class ContatosArquivadosPageModule {}
