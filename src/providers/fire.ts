import { Facebook } from '@ionic-native/facebook';
import { AlertController, Platform } from 'ionic-angular';
import { Sim } from '@ionic-native/sim';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';
import * as firebase from 'firebase';

@Injectable()
export class Fire {
  user: any;
  authState: Observable<firebase.User>;
  constructor(
    public sim: Sim, 
    public alertCtrl: AlertController, 
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public platform: Platform,
    public facebook: Facebook
    ) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      this.user = firebase.auth().currentUser;
    })
    console.log('Hello FireProvider Provider');
  }


  loginComFacebook(): firebase.Promise<any>{
    if(this.platform.is('mobile') && this.platform.is('cordova')){
      console.log('rodando no smartphone');
      return this.facebook.login(['user_friends', 'public_profile', 'email'])
        .then(userFacebook => {
          let accessToken = userFacebook.authResponse.accessToken;
          let credential: firebase.auth.AuthCredential;
          console.log(userFacebook);
          firebase.auth().signInWithCredential(firebase.auth.FacebookAuthProvider.credential(accessToken))
            .then(user => {
                console.log('User após credencial: ', user);
                this.checkUserInfo(user.uid)
                  .then(() => {
                    return Promise.resolve('logado');
                  })
            })
            .catch(err => {
              console.error(err);
            })
        })
    }
    else{
      console.log('rodando no navegador');
      let provider = new firebase.auth.FacebookAuthProvider();
      return firebase.auth().signInWithRedirect(provider)
        .then(user => {
          console.log(user)
            return this.checkUserInfo(firebase.auth().currentUser.uid);
        })

    }
  }

  checkUserInfo(user):Promise<any>{
    console.log('check user', this.user.uid);
    return this.db.list(`users/${this.user.uid}`).first().toPromise()
              .then(snap => {
                console.log(snap)
                if(snap.length == 0){
                  return this.db.object(`users/${this.user.uid}`).update({
                    nome: user.displayName,
                  })
                  .then(() => {
                    return Promise.resolve(true)
                  })
                }
                
                else return Promise.resolve(true);
              })
    /*
    return this.db.list('users',{query : {
      orderByChild: 'uid',
      equalTo: user.uid
    }}).first().toPromise()
      .then(snap => {
        console.log('snap',snap)
        if(snap.length == 0){
          return this.db.list('users').push({
            nome: user.displayName,
            uid: user.uid
          })
        }
        else return Promise.resolve(true);
      })*/
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  getContatos():Observable<any>{
    return this.db.list(`users/${this.user.uid}/contatos`, {query : {
      orderByChild: 'arquivado',
      equalTo: false
    }})
  }

  getContatosArquivados():Observable<any>{
    return this.db.list(`users/${this.user.uid}/contatos`, {query : {
      orderByChild: 'arquivado',
      equalTo: true
    }})
  }

  salvarContato(contato){
    contato['arquivado'] = false;
    return this.db.list(`users/${this.user.uid}/contatos`).push(contato);
  }

  registrarFeedback(contato,feedback){
    return this.db.object(`users/${this.user.uid}/contatos/${contato.$key}`).update({feedback:feedback});
  }

  apagarContato(contato){
    return this.db.list(`users/${this.user.uid}/contatos`).remove(contato.$key);
  }

  alterarContato(contato){
    return this.db.list(`users/${this.user.uid}/contatos`).update(contato.$key,contato);
  }

  arquivar(contato){
    return this.db.object(`users/${this.user.uid}/contatos/${contato.$key}`).update({arquivado:!contato.arquivado});
  }

  getContato(contato){
    return this.db.object(`users/${this.user.uid}/contatos/${contato.$key}`).first().toPromise();
  }
}