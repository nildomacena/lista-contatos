import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { Sim } from '@ionic-native/sim';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook } from '@ionic-native/facebook';
import { Contacts } from '@ionic-native/contacts';

import { SplashScreen } from '@ionic-native/splash-screen';
import { Fire } from '../providers/fire';
import { UtilProvider } from '../providers/util';


const config = {
    apiKey: "AIzaSyBYUNHsD_X4yxr60N9Vjgb2kZSEQA3-Egs",
    authDomain: "tradegames-2dff6.firebaseapp.com",
    databaseURL: "https://tradegames-2dff6.firebaseio.com",
    projectId: "tradegames-2dff6",
    storageBucket: "tradegames-2dff6.appspot.com",
    messagingSenderId: "374168288805"
  };


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Sim,
    Facebook,
    Contacts,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Fire,
    UtilProvider
  ]
})
export class AppModule {}
