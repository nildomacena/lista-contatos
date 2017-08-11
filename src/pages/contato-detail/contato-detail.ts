import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-contato-detail',
  templateUrl: 'contato-detail.html',
})
export class ContatoDetailPage {
  contato: any
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.contato = this.navParams.get('contato');
    !this.contato? this.navCtrl.setRoot(HomePage): '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContatoDetailPage');
  }

  feedback(){
    let modal = this.modalCtrl.create('ModalContatoPage',{contato: this.contato, feedback:true});
    modal.present();
  }

  editar(){
    let modal = this.modalCtrl.create('ModalContatoPage',{contato: this.contato, editar:true});
    modal.present();
  }
  ligar(){
    console.log(this.contato.telefone)
  }
}
