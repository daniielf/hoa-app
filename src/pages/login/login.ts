import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Slides } from 'ionic-angular';
import { trigger, style, animate, transition } from '@angular/animations';
import { AuthProvider } from '../../providers/auth';
//import { AuthProvider } from '../../providers/auth';
import { FirebaseProvider } from '../../providers/firebase';
import { LoadingService } from '../../providers/loading.service';
import { ToastService } from '../../providers/toast.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  @ViewChild(Slides) slides: Slides;
  login = true;
  register = false;
  loginForm = {
    email: '',
    password: ''
  };

  registerForm = {
    email: '',
    password: '',
    name: ''
  }


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingService,
    private toastCtrl: ToastService,
    private authProvider: AuthProvider,
    private firebaseProvider: FirebaseProvider,
    private storage: Storage
  ) { }

  ionViewDidLoad() {
    this.slides.lockSwipes(true);
    this.storage.get('usuarios').then((usuario) => {
      this.loginForm.email = usuario.email;
    }).catch((err) => {
      console.log(err);
    });
  }

  navLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0, 200);
    this.slides.lockSwipes(true);
  }

  navRegister() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1, 200);
    this.slides.lockSwipes(true);
  }

  //Login
  fazerLogin() {
    if (this.loginForm.email === '' || this.loginForm.password === '') {
        this.toastCtrl.showToastAlert('Preencha os campos!');
        return;
    }
    this.loadingCtrl.startLoading('Autenticando');
    this.authProvider.login(this.loginForm).then((res) => {
        let uid = res.user.uid
        this.firebaseProvider.getUser(uid).then((res) => {
          let data = res.data();
          this.storage.set('usuarios', data).then(() => {
            this.loadingCtrl.stopLoading();
            this.navCtrl.setRoot('TabsPage');
          }).catch((err) => {
            console.log(err);
            this.loadingCtrl.stopLoading();
            this.toastCtrl.showToastAlert('Não foi possível autenticar');
          });
        });
      }).catch((err) => {
        this.loadingCtrl.stopLoading();
        this.toastCtrl.showToastAlert('Credenciais Inválidas');
      });
  }

  //Registro
  criarNovaConta() {
    if (this.registerForm.email === '' || this.registerForm.password === '' || this.registerForm.name === '') {
        this.toastCtrl.showToastAlert('Preencha os campos!');
        return;
    }
    this.loadingCtrl.startLoading('Criando conta');
    this.authProvider.register(this.registerForm).then((res) => {
      let uid = res.user.uid;

      //Organizar dados
      let data = {
        uid: uid,
        name: this.registerForm.name,
        email: this.registerForm.email
      };

      //Gravar user no firestore
      this.firebaseProvider.postUser(data).then(() => {
        this.loadingCtrl.stopLoading();
        this.toastCtrl.showToastAlert('Sua conta foi criada com sucesso');
        this.loginForm.email = this.registerForm.email;
        this.loginForm.password = this.registerForm.password;
        this.navLogin();
      }).catch((err) => {
        this.loadingCtrl.stopLoading
        this.toastCtrl.showToastAlert('Não foi possível cadastrar');
        console.log('ERR', err);
      });
    }).catch((err) => {
      this.loadingCtrl.stopLoading();
      this.toastCtrl.showToastAlert('Não foi possível cadastrar');
      console.log('ERR', err);
    });
  }

}
