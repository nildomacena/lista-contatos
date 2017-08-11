import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, TextInput } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-contato',
  templateUrl: 'modal-contato.html',
})
export class ModalContatoPage {
  adicionando: boolean = false;
  alterando: boolean = false;
  feedback: boolean = false;
  contato: any;
  @ViewChild('inputNome') inputNome: TextInput;
  @ViewChild('inputTelefone') inputTelefone: TextInput;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController) {
    this.adicionando = this.navParams.get('adicionar');
    this.alterando = this.navParams.get('editar');
    this.feedback = this.navParams.get('feedback');
    if(this.adicionando){
      this.contato = {nome: '', telefone: '', credibilidade: false, financeiro: false, perfil: false, network: false, confianca: false, contato: false }
    }
    else if(this.alterando || this.feedback){
      this.contato = this.navParams.get('contato')
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalContatoPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  salvar(){
    if(this.contato.nome == '' || this.contato.telefone == ''){

      let alert = this.alertCtrl.create({
        title: 'Erro',
        message: 'Preencha o nome e o telefone do contato',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              this.contato.nome == ''? this.inputNome.setFocus(): this.inputTelefone.setFocus();
            }
          }
        ]
      });
      alert.present();
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Confirma',
        message: 'Deseja salvar o contato?',
        buttons: [
          {
          text: 'Cancelar', role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
          }, {
            text: 'Ok',
            handler: () => {
            console.log(this.contato);
          }
          }
        ]
      });
      alert.present();
    }
  }
}
