import { Fire } from './../../providers/fire';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  contatos: any[] = []
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public fire: Fire) {
    this.fire.getContatos().subscribe(contatos => {
      this.contatos = contatos;
      this.contatos.map((contato, index) => {
        contato['classificacao'] = 0;
        Object.keys(contato).map((key, indexKey) => {
          if(contato[key] == true && (key == 'confianca' || key == 'credibilidade' || key == 'network' || key == 'perfil' || key == 'financeiro'))
            contato['classificacao'] += 1
        })
      })
      this.contatos.sort(function(a,b) {
          return a.classificacao < b.classificacao ? 1 : a.nome > b.classificacao ? -1 : 0;
      });
    })
  }

  selecionaContato(contato){
    this.navCtrl.push('ContatoDetailPage',{contato: contato})
  }

  
  adicionarContato(){
    let modal = this.modalCtrl.create('ModalContatoPage',{adicionar: true});
    modal.present();
  }
}
