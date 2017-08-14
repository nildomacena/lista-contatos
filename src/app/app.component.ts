import { UtilProvider } from './../providers/util';
import { Fire } from './../providers/fire';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import * as firebase  from 'firebase';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';
  user: any;
  pages: Array<{title: string, component: any}>;
  logado:boolean = false;
  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public fire: Fire,
    public util: UtilProvider
    ) {
    this.initializeApp();
    this.fire.authState.subscribe(dados => {
        console.log(dados);
        if(dados){
          this.user = firebase.auth().currentUser;
          console.log(this.user);
          this.fire.checkUserInfo(this.user);
          this.nav.setRoot(HomePage)
          this.logado = true;
        }
        else{
          this.logado = false;
          console.log('Não está logado');
        }
      })
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  arquivados(){
    this.nav.push('ContatosArquivadosPage');
  }
  atividades(){
    this.nav.push('AtividadesPage')
  }
  importar(){
    this.util.importarContatos();
  }
  logout(){
    this.fire.logout();
    this.nav.setRoot('LoginPage');
  }
}
