import { UtilProvider } from './../../providers/util';
import { Fire } from './../../providers/fire';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-contato-detail',
  templateUrl: 'contato-detail.html',
})
export class ContatoDetailPage {
  contato: any
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public fire: Fire,
    public util: UtilProvider
    ) {
    this.contato = this.navParams.get('contato');
    !this.contato? this.navCtrl.setRoot(HomePage): '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContatoDetailPage');
  }

  feedback(){
    let modal = this.modalCtrl.create('ModalContatoPage',{contato: this.contato, feedback:true});
    modal.present();
    modal.onDidDismiss(() => {
      this.fire.getContato(this.contato)
        .then(contato => this.contato = contato);
    })
  }

  editar(){
    let modal = this.modalCtrl.create('ModalContatoPage',{contato: this.contato, editar:true});
    modal.present();
    modal.onDidDismiss(() => {
      this.fire.getContato(this.contato)
        .then(contato => this.contato = contato);
    })
  }
  apagar(){
    // Import the AlertController from ionic package 
    // Consume it in the constructor as 'alertCtrl' 
    let alert = this.alertCtrl.create({
      title: 'Apagar contato',
      message: 'Tem certeza que deseja apagar esse contato?',
      buttons: [
        {
        text: 'Cancel', role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
        }, {
          text: 'Ok',
          handler: () => {
          this.fire.apagarContato(this.contato)
            .then(() => {
              this.util.toast('Contato deletado');
              this.navCtrl.pop();
            })
          }
        }
      ]
    });
    alert.present();

  }

  arquivar(){
    let texto: string;
    this.contato.arquivado? texto = "Contato desarquivado": "Contato arquivado";
    this.fire.arquivar(this.contato)
      .then(() => {
        this.util.toast(texto);
        this.navCtrl.pop();
      })
  }

  ligar(){
    console.log(this.contato.telefone)
  }
}
