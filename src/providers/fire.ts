import { AlertController } from 'ionic-angular';
import { Sim } from '@ionic-native/sim';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class Fire {

  constructor(public sim: Sim, public alertCtrl: AlertController) {
    console.log('Hello FireProvider Provider');
  }

    login(){
      this.sim.requestReadPermission()
        .then(() => {
                this.sim.getSimInfo()
                .then(info => {
                  console.log(info);
                });
              },
              () => {
                console.log('Permissão negada')
              }
      )
      
      /*
      this.sim.requestReadPermission() 
        .then(() => {
                this.sim.getSimInfo()
                  .then(info => {
                    console.log(info);
                  });
              },
              () => {
                let alert = this.alertCtrl.create({
                  title: 'Erro',
                  message: 'Forneça as permissões necessários para o aplicativo',
                  buttons: [
                    {
                    text: 'Cancel', role: 'cancel',
                    handler: () => {
                      console.log('Cancel clicked');
                    }
                    }, {
                      text: 'Ok',
                      handler: () => {
                      console.log('Ok clicked');
                    }
                    }
                  ]
                });
                alert.present();
              }
        )
      */
      //firebase.auth().signInWithPhoneNumber() 
    }
}
