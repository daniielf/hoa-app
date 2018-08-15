import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//ionic
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

import { PopupComponent } from '../components/popup-component/popup';

//Plugin
import { IonicStorageModule } from '@ionic/storage';

//Firebase config
import { firebaseConfig } from '../configs/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
//pages
import { LoginPage } from '../pages/login/login';
//Providers
import { AuthProvider } from '../providers/auth';
import { FirebaseProvider } from '../providers/firebase';
import { LoadingService } from '../providers/loading.service';
import { ToastService } from '../providers/toast.service';
import { EstabelecimentosProvider } from '../providers/estabelecimentos';



@NgModule({
  declarations: [
    MyApp,
    LoginPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    //plugins
    IonicStorageModule.forRoot(),
    //firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage
  ],
  providers: [
    AuthProvider,
    FirebaseProvider,
    //ionic
    StatusBar,
    SplashScreen,
    LoadingService,
    ToastService,
    Geolocation,
    EstabelecimentosProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
