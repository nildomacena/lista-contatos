import { Fire } from './../../providers/fire';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-contatos-arquivados',
  templateUrl: 'contatos-arquivados.html',
})
export class ContatosArquivadosPage {
  contatos: any[] = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fire: Fire
    ) {
    this.fire.getContatosArquivados().subscribe(contatos => {
      this.contatos = contatos;
      this.contatos.map((contato, index) => {
        contato['classificacao'] = 0;
        Object.keys(contato).map((key, indexKey) => {
          if(contato[key] == true && (key == 'confianca' || key == 'credibilidade' || key == 'network' || key == 'perfil' || key == 'financeiro'))
            contato['classificacao'] += 1
        })
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContatosArquivadosPage');
  }

  selecionaContato(contato){
    this.navCtrl.push('ContatoDetailPage',{contato: contato})
  }
}
