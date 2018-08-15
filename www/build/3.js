webpackJsonp([3],{

/***/ 483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PerfilPageModule", function() { return PerfilPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home__ = __webpack_require__(489);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PerfilPageModule = /** @class */ (function () {
    function PerfilPageModule() {
    }
    PerfilPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]),
            ],
        })
    ], PerfilPageModule);
    return PerfilPageModule;
}());

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 489:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
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


/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.searchText = '';
        this.eventos = ['Evento 1', 'Evento 2', 'Evento 3', 'Evento 4', 'Evento 5', 'Evento 6', 'Evento 7', 'Evento 8', 'Evento 9'];
        this.eventosFiltered = [];
    }
    HomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PerfilPage');
        this.eventosFiltered = this.eventos;
    };
    HomePage.prototype.onInput = function () {
        var _this = this;
        this.eventosFiltered = this.eventos.filter(function (elem) { return elem.indexOf(_this.searchText) !== -1; });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\Daniel\Documents\HoA\app\src\pages\home\home.html"*/'<ion-content class="content">\n  <div class="list-content">\n    <div class="buscar-content">\n      <!-- <ion-item> -->\n        <ion-searchbar class="search" placeholder="Buscar..." (ionInput)="onInput($event)" [(ngModel)]="searchText"></ion-searchbar>\n        <!-- <ion-icon name="magnifier"></ion-icon> -->\n      <!-- </ion-item> -->\n    </div>\n    <ion-list>\n      <div class="h20"></div>\n      <ion-row class="event-row" *ngFor="let evento of eventosFiltered; let i = index">\n        <ion-col class="img-col" col-4>\n          <img class="img" src="https://scontent.fsdu2-2.fna.fbcdn.net/v/t1.0-9/39099567_2272050332810961_5995044140646137856_n.jpg?_nc_cat=0&oh=c46776ea8434e0d1d5eadb3383bbe75f&oe=5C00753F"/>\n        </ion-col>\n        <ion-col col-8>\n          <span class="event-title">{{ evento }}</span>\n          <br />\n          <span class="info"> Estabelecimento {{ i + 1 }} </span>\n          <span class="info"> Confirmados: {{ (i + 1)*((i + 1) + 22) - 12 }} </span>\n          <br />\n          <br />\n          <span class="info-time"> Início 20:00 - Término 04:00 </span>\n        </ion-col>\n      </ion-row>\n    </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Daniel\Documents\HoA\app\src\pages\home\home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

});
//# sourceMappingURL=3.js.map