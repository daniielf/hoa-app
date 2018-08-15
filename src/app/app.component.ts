import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage) {
    platform.ready().then(() => {

      //Decidir para qual pagina levar o usuário
      this.storage.get('usuario')
      .then((usuario) => {
        console.log('usuario', usuario);
        this.rootPage = LoginPage; ///usuario ? 'TabsPage':'TabsPage'; // ainda sem home pg
      });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
