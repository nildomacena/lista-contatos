import { Fire } from './../../providers/fire';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  contatos: any[] = [
    {nome: 'Ednildo', telefone: '9930-4488', credibilidade: true, financeiro: true, perfil: true, network: true, confianca: true, contato: false, data: 1502455619 },
    {nome: 'Maria', telefone: '9920-5478', credibilidade: false, financeiro: true, perfil: true, network: false, confianca: true, contato: false, data: 1502455619 },
    {nome: 'João', telefone: '9878-8974', credibilidade: true, financeiro: false, perfil: false, network: true, confianca: false, contato: false, data: 1502455619 },
    {nome: 'Pedro', telefone: '9845-5014', credibilidade: false, financeiro: true, perfil: false, network: true, confianca: false, contato: false, data: 1502455619 },
    {nome: 'Carla', telefone: '8879-9871', credibilidade: true, financeiro: false, perfil: true, network: false, confianca: true, contato: false, data: 1502455619 }
  ]
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public fire: Fire) {
    this.fire.login();
    this.contatos.map((contato, index) => {
      contato['classificacao'] = 0;
      Object.keys(contato).map((key, indexKey) => {
        if(contato[key] == true)
          contato['classificacao'] += 1
      })
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
