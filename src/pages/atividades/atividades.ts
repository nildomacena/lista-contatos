import { AcompanhamentoPage } from './../acompanhamento/acompanhamento';
import { FechamentoPage } from './../fechamento/fechamento';
import { ApnPage } from './../apn/apn';
import { ConvitePage } from './../convite/convite';
import { ListaPage } from './../lista/lista';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-atividades',
  templateUrl: 'atividades.html',
})
export class AtividadesPage {
  lista = 'ListaPage'
  convite = 'ConvitePage';
  apn = 'ApnPage';
  fechamento = 'FechamentoPage';
  acompanhamento = 'AcompanhamentoPage';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AtividadesPage');
  }

}
