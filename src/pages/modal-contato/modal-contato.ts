import { UtilProvider } from './../../providers/util';
import { Fire } from './../../providers/fire';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, TextInput, ToastController } from 'ionic-angular';

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
  feedbackInput: string = '';

  @ViewChild('inputNome') inputNome: TextInput;
  @ViewChild('inputTelefone') inputTelefone: TextInput;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public fire: Fire,
    public util: UtilProvider
    ) {
    this.adicionando = this.navParams.get('adicionar');
    this.alterando = this.navParams.get('editar');
    this.feedback = this.navParams.get('feedback');
    if(this.adicionando){
      this.contato = {nome: '', telefone: '', credibilidade: false, financeiro: false, perfil: false, network: false, confianca: false, contato: false }
    }
    else if(this.alterando || this.feedback){
      this.contato = this.navParams.get('contato')
      this.contato.feedback? this.feedbackInput = this.contato.feedback: this.feedbackInput = ''; 
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalContatoPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  registrarFeedback(){
    console.log('feedback')
    this.fire.registrarFeedback(this.contato,this.feedbackInput)
      .then(() => {
        let alert = this.alertCtrl.create({
          title: 'Feedback registrado',
          message: 'Deseja arquivar o contato?',
          buttons: [
            {
            text: 'Não', role: 'cancel',
            handler: () => {
              this.dismiss();
            }
            }, {
              text: 'Sim',
              handler: () => {
              this.fire.arquivar(this.contato)
                .then(() => {
                  this.util.toast('Contato arquivado');
                  this.dismiss();
                })
            }
            }
          ]
        });
        alert.present();  
      })
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
              if(this.adicionando)
                this.fire.salvarContato(this.contato)
                  .then(() => {
                    let toast = this.toastCtrl.create({
                      message: 'Contato criado com sucesso',
                      duration: 2500
                    });
                    toast.present();
                    this.dismiss();
                  })
                else if(this.alterando){
                  this.fire.alterarContato(this.contato)
                    .then(() => {
                      this.util.toast('Contato alterado com sucesso');
                      this.dismiss();
                    })
                }
              }
          }
        ]
      });
      alert.present();
    }
  }

}
