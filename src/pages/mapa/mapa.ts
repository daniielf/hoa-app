import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import leaflet from 'leaflet';
import 'leaflet-routing-machine';

import { EstabelecimentosProvider } from '../../providers/estabelecimentos';


declare var google;

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
  providers: [
    TabsPage,
  ]
})
export class MapaPage {
  @ViewChild('map') mapElement;
  tileLayer = 'https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
  public options: GeolocationOptions;
  public currentPos: Geoposition;
  private map:  any;

  private estabelecimentos = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tab: TabsPage,
    private geolocation: Geolocation,
    private estabelecimentosProviders: EstabelecimentosProvider
  ) { }

  ionViewDidLoad() {
    this.estabelecimentos = this.estabelecimentosProviders.getEstabelecimentos();
    this.initMap();
  }

  private initMap() {
    this.map = leaflet.map('map').setView([-20.33433759,-40.2849475], 14);
    leaflet.tileLayer(this.tileLayer, {
      maxZoom: 18
    }).addTo(this.map);
    this.setMarkers();
  }

  ionViewDidEnter() {

  }

  setMarkers() {
    let self = this;
    this.geolocation.getCurrentPosition().then((position)=>{
      const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
      leaflet.marker([pos.lat, pos.lng]).addTo(this.map);
      // let i = 0;
      // for (let estabelecimento of this.estabelecimentos) {
      //   leaflet.marker([estabelecimento.lat, estabelecimento.lng]).addTo(this.map).bindPopup(self.getPopUp(i));
      //   i++;
      // }

    }).catch((err) => {
      console.log(err);
    });
    const ctrl = leaflet.Routing.control({
  addWaypoints: false,
  createMarker: function(i, wp, nWps) {
    return leaflet.marker(wp.latLng).bindPopup(self.getPopUp(i));
  },
    waypoints: this.estabelecimentos,
    lineOptions: {
      styles: [{color: '#68BD5F', opacity: 0.70, weight: 5}]
    }
  }).addTo(this.map);
  }

  private getPopUp(i) {
    setTimeout(()=> {
      let test = document.getElementById('marker-' + i);
      console.log(test, i);
      return test;
    }, 200);
  }

}
