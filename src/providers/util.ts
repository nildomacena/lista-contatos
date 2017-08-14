import { Contacts, ContactFindOptions, ContactFieldType } from '@ionic-native/contacts';
import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UtilProvider {

  constructor(
    public toastCtrl: ToastController,
    public contacts: Contacts
    ) {
    console.log('Hello UtilProvider Provider');

  }

  toast(message: string){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2500
    })
    toast.present();
  }

  importarContatos(){
    let options = new ContactFindOptions();
    options.filter = '';
    this.contacts.find(['*'])
      .then(contacts => {
        console.log(contacts);
      })
  }
}
