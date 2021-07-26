import { Component } from '@angular/core';

import {Geolocation, Geoposition} from '@ionic-native/geolocation/ngx'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  latitud: number
  longitud: number
  codigo_gps: any

  constructor(public geolocation: Geolocation) 
  {}

  getGeolocation()
  {
    document.getElementById("codigo-gps").innerHTML = this.codigo_gps;
    console.log(this.codigo_gps);
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
      this.latitud = geoposition.coords.latitude;
      this.longitud = geoposition.coords.longitude;
    }).catch((error) => {
      console.log("Ha ocuurido un error mientras se obtenian las coordenadas geograficas");
      console.log(error);
    });
  }
}