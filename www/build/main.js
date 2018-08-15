webpackJsonp([5],{

/***/ 186:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 186;

/***/ }),

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/configuracao/config.module": [
		482,
		4
	],
	"../pages/home/home.module": [
		483,
		3
	],
	"../pages/mapa/mapa.module": [
		486,
		0
	],
	"../pages/perfil/perfil.module": [
		484,
		2
	],
	"../pages/tabs/tabs.module": [
		485,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 227;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_firebase__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_loading_service__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_toast_service__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(148);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { AuthProvider } from '../../providers/auth';




var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, loadingCtrl, toastCtrl, authProvider, firebaseProvider, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.authProvider = authProvider;
        this.firebaseProvider = firebaseProvider;
        this.storage = storage;
        this.login = true;
        this.register = false;
        this.loginForm = {
            email: '',
            password: ''
        };
        this.registerForm = {
            email: '',
            password: '',
            name: ''
        };
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.slides.lockSwipes(true);
        this.storage.get('usuarios').then(function (usuario) {
            _this.loginForm.email = usuario.email;
        }).catch(function (err) {
            console.log(err);
        });
    };
    LoginPage.prototype.navLogin = function () {
        this.slides.lockSwipes(false);
        this.slides.slideTo(0, 200);
        this.slides.lockSwipes(true);
    };
    LoginPage.prototype.navRegister = function () {
        this.slides.lockSwipes(false);
        this.slides.slideTo(1, 200);
        this.slides.lockSwipes(true);
    };
    //Login
    LoginPage.prototype.fazerLogin = function () {
        var _this = this;
        if (this.loginForm.email === '' || this.loginForm.password === '') {
            this.toastCtrl.showToastAlert('Preencha os campos!');
            return;
        }
        this.loadingCtrl.startLoading('Autenticando');
        this.authProvider.login(this.loginForm).then(function (res) {
            var uid = res.user.uid;
            _this.firebaseProvider.getUser(uid).then(function (res) {
                var data = res.data();
                _this.storage.set('usuarios', data).then(function () {
                    _this.loadingCtrl.stopLoading();
                    _this.navCtrl.setRoot('TabsPage');
                }).catch(function (err) {
                    console.log(err);
                    _this.loadingCtrl.stopLoading();
                    _this.toastCtrl.showToastAlert('Não foi possível autenticar');
                });
            });
        }).catch(function (err) {
            _this.loadingCtrl.stopLoading();
            _this.toastCtrl.showToastAlert('Credenciais Inválidas');
        });
    };
    //Registro
    LoginPage.prototype.criarNovaConta = function () {
        var _this = this;
        if (this.registerForm.email === '' || this.registerForm.password === '' || this.registerForm.name === '') {
            this.toastCtrl.showToastAlert('Preencha os campos!');
            return;
        }
        this.loadingCtrl.startLoading('Criando conta');
        this.authProvider.register(this.registerForm).then(function (res) {
            var uid = res.user.uid;
            //Organizar dados
            var data = {
                uid: uid,
                name: _this.registerForm.name,
                email: _this.registerForm.email
            };
            //Gravar user no firestore
            _this.firebaseProvider.postUser(data).then(function () {
                _this.loadingCtrl.stopLoading();
                _this.toastCtrl.showToastAlert('Sua conta foi criada com sucesso');
                _this.loginForm.email = _this.registerForm.email;
                _this.loginForm.password = _this.registerForm.password;
                _this.navLogin();
            }).catch(function (err) {
                _this.loadingCtrl.stopLoading;
                _this.toastCtrl.showToastAlert('Não foi possível cadastrar');
                console.log('ERR', err);
            });
        }).catch(function (err) {
            _this.loadingCtrl.stopLoading();
            _this.toastCtrl.showToastAlert('Não foi possível cadastrar');
            console.log('ERR', err);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Slides */])
    ], LoginPage.prototype, "slides", void 0);
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\Daniel\Documents\HoA\app\src\pages\login\login.html"*/'<ion-content class="bg-login">\n<div class="overlay">\n  <div class="center padding-top-10-percent">\n    <img src="assets/imgs/logo-white.png" class="logo-white-login">\n  </div>\n  <!--TEXTOS-->\n  <ion-slides #slide class="slider">\n\n    <ion-slide class="slide-class">\n        <!--TITULO-->\n        <h5 class="gray center bold no-margin">\n          Que Bom te ver Aqui\n        </h5>\n        <!--SUBTITULO-->\n        <p class="gray center light no-margin mg-top-5">\n          Entre com sua conta para continuar\n        </p>\n      <div class="padding-20">\n        <ion-item class="bg-transparent no-padding mg-top-30">\n          <ion-label stacked class="snow bold">E-mail</ion-label>\n          <ion-input type="email" class="snow" [(ngModel)]="loginForm.email"></ion-input>\n        </ion-item>\n\n        <ion-item class="bg-transparent no-padding mg-top-20">\n          <ion-label stacked class="snow bold">Senha</ion-label>\n          <ion-input type="password" class="snow" [(ngModel)]="loginForm.password"></ion-input>\n        </ion-item>\n        <!--CTA-->\n        <div class="ctaLogin center bold mg-top-30" (click)="fazerLogin()">\n          Entrar\n        </div>\n        <!--NOVA CONTA-->\n        <div class="txtRegistrar bold mg-top-20 center" (click)="navRegister()">\n          Quero criar uma nova conta\n        </div>\n      </div>\n    </ion-slide>\n    <ion-slide class="slide-class">\n      <!--TITULO-->\n      <h5 class="gray center bold no-margin">\n        Eba! Vamos lá.\n      </h5>\n      <!--SUBTITULO-->\n      <p class="gray center light no-margin mg-top-5">\n        Crie suas credenciais para acessar o app\n      </p>\n      <!--FORMS e CTA-->\n      <div class="padding-20">\n        <ion-item class="bg-transparent no-padding mg-top-30">\n          <ion-label stacked class="snow bold">Como você se chama?</ion-label>\n          <ion-input type="text" class="snow" [(ngModel)]="registerForm.name"></ion-input>\n        </ion-item>\n\n        <ion-item class="bg-transparent no-padding mg-top-20">\n          <ion-label stacked class="snow bold">Qual é o seu e-mail?</ion-label>\n          <ion-input type="email" class="snow" [(ngModel)]="registerForm.email"></ion-input>\n        </ion-item>\n\n        <ion-item class="bg-transparent no-padding mg-top-20">\n          <ion-label stacked class="snow bold">Escolha uma super senha!</ion-label>\n          <ion-input type="password" class="snow" [(ngModel)]="registerForm.password"></ion-input>\n        </ion-item>\n        <!--CTA-->\n        <div class="ctaRegister center bold mg-top-30" (click)="criarNovaConta()">\n          Cadastrar\n        </div>\n        <!--NOVA CONTA-->\n        <div class="txtRegistrar bold mg-top-20 center" (click)="navLogin()">\n          Já tenho uma conta\n        </div>\n      </div>\n    </ion-slide>\n  </ion-slides>\n\n</div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Daniel\Documents\HoA\app\src\pages\login\login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_5__providers_toast_service__["a" /* ToastService */],
            __WEBPACK_IMPORTED_MODULE_2__providers_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_firebase__["a" /* FirebaseProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(272);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthProvider = /** @class */ (function () {
    function AuthProvider(afAuth) {
        var _this = this;
        this.afAuth = afAuth;
        //Create user
        this.register = function (data) { return _this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password); };
        //Login
        this.login = function (data) { return _this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password); };
    }
    AuthProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], AuthProvider);
    return AuthProvider;
}());

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__ = __webpack_require__(276);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FirebaseProvider = /** @class */ (function () {
    function FirebaseProvider(afs) {
        var _this = this;
        this.afs = afs;
        //Create user on firestore
        this.postUser = function (data) {
            return _this.afs
                .collection("Users")
                .doc(data.uid)
                .set(data);
        };
        this.getUser = function (uid) {
            return _this.afs.firestore.collection('Users').doc(uid)
                .get();
        };
    }
    FirebaseProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__["a" /* AngularFirestore */]])
    ], FirebaseProvider);
    return FirebaseProvider;
}());

//# sourceMappingURL=firebase.js.map

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoadingService = /** @class */ (function () {
    function LoadingService(loadCtrl) {
        this.loadCtrl = loadCtrl;
        this.loader = this.loadCtrl.create({
            content: 'Aplicando Filtro',
        });
    }
    LoadingService.prototype.startLoading = function (message) {
        this.loader = this.loadCtrl.create({
            content: message,
        });
        this.loader.present();
    };
    LoadingService.prototype.stopLoading = function () {
        if (this.loader) {
            this.loader.dismiss();
        }
    };
    LoadingService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], LoadingService);
    return LoadingService;
}());

//# sourceMappingURL=loading.service.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToastService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ToastService = /** @class */ (function () {
    function ToastService(toastCtrl) {
        this.toastCtrl = toastCtrl;
        this.baseUrl = 'sigtrack/';
    }
    ToastService.prototype.showToastAlert = function (message, time) {
        if (time === void 0) { time = 1500; }
        if (this.activeToast != null) {
            this.dismissToast();
        }
        this.activeToast = this.toastCtrl.create({
            message: message,
            duration: time,
            position: 'top'
        });
        this.activeToast.present();
    };
    ToastService.prototype.dismissToast = function () {
        this.activeToast.dismiss();
    };
    ToastService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], ToastService);
    return ToastService;
}());

//# sourceMappingURL=toast.service.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EstabelecimentosProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/*
  Generated class for the EstabelecimentosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var EstabelecimentosProvider = /** @class */ (function () {
    function EstabelecimentosProvider() {
        this.estabelecimentos = [
            {
                nome: 'EST 1',
                nota: 5,
                url: '',
                lat: -20.336141,
                lng: -40.289168
            },
            {
                nome: 'EST 2',
                nota: 5,
                url: '',
                lat: -20.337041,
                lng: -40.300168
            },
            {
                nome: 'EST 3',
                nota: 5,
                url: '',
                lat: -20.336920,
                lng: -40.295921
            },
            {
                nome: 'EST 4',
                nota: 5,
                url: '',
                lat: -20.336990,
                lng: -40.294485
            }
        ];
        console.log('Hello EstabelecimentosProvider Provider');
    }
    EstabelecimentosProvider.prototype.getEstabelecimentos = function () {
        return this.estabelecimentos;
    };
    EstabelecimentosProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], EstabelecimentosProvider);
    return EstabelecimentosProvider;
}());

//# sourceMappingURL=estabelecimentos.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(406);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__configs_firebase__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_firestore__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_auth__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_login_login__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_auth__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_firebase__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_loading_service__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_toast_service__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_estabelecimentos__ = __webpack_require__(282);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





//ionic



//Plugin

//Firebase config




//pages

//Providers





var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_13__pages_login_login__["a" /* LoginPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                //plugins
                __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                //firebase
                __WEBPACK_IMPORTED_MODULE_10_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_9__configs_firebase__["a" /* firebaseConfig */]),
                __WEBPACK_IMPORTED_MODULE_11_angularfire2_firestore__["b" /* AngularFirestoreModule */],
                __WEBPACK_IMPORTED_MODULE_12_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/configuracao/config.module#ConfigPageModule', name: 'ConfigPage', segment: 'config', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#PerfilPageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/perfil/perfil.module#PerfilPageModule', name: 'PerfilPage', segment: 'perfil', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mapa/mapa.module#MapaPageModule', name: 'MapaPage', segment: 'mapa', priority: 'low', defaultHistory: [] }
                    ]
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_13__pages_login_login__["a" /* LoginPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_14__providers_auth__["a" /* AuthProvider */],
                __WEBPACK_IMPORTED_MODULE_15__providers_firebase__["a" /* FirebaseProvider */],
                //ionic
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_16__providers_loading_service__["a" /* LoadingService */],
                __WEBPACK_IMPORTED_MODULE_17__providers_toast_service__["a" /* ToastService */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_18__providers_estabelecimentos__["a" /* EstabelecimentosProvider */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(270);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, storage) {
        var _this = this;
        this.storage = storage;
        platform.ready().then(function () {
            //Decidir para qual pagina levar o usuário
            _this.storage.get('usuario')
                .then(function (usuario) {
                console.log('usuario', usuario);
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */]; ///usuario ? 'TabsPage':'TabsPage'; // ainda sem home pg
            });
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Daniel\Documents\HoA\app\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\Daniel\Documents\HoA\app\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 481:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return firebaseConfig; });
// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyAF2c3gQ52dxjAraPAMbD1ysB9lXdNeKMo",
    authDomain: "projeto-hoa.firebaseapp.com",
    databaseURL: "https://projeto-hoa.firebaseio.com",
    projectId: "projeto-hoa",
    storageBucket: "projeto-hoa.appspot.com",
    messagingSenderId: "415953801757"
};
//# sourceMappingURL=firebase.js.map

/***/ })

},[283]);
//# sourceMappingURL=main.js.map