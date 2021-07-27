import { Component } from '@angular/core';

import {Geolocation, Geoposition} from '@ionic-native/geolocation/ngx'
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  latitud: number
  longitud: number
  codigo_gps: string

  constructor(public geolocation: Geolocation, public http: HttpClient)
  {}

  postEnviarCoordenadas(codigo_gps, latitud, longitud)
  {
    return this.http.post(`https://geo-sam-backend.herokuapp.com/ubicacion/${codigo_gps}/${latitud}/${longitud}`, {});
  }

  getGeolocation()
  {
    document.getElementById("codigo-gps").innerHTML = this.codigo_gps;
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
      this.latitud = geoposition.coords.latitude;
      this.longitud = geoposition.coords.longitude;
    }).catch((error) => {
      document.getElementById("error-ocurrido").innerHTML = "Ha ocuurido un error"
    });    
  }

  enviarCoordenadasTemporizado()
  {
    if(this.codigo_gps != undefined)
    {
      for (let i = 0; i < 5; i++) 
      {
       setTimeout(() => {this.getGeolocation()}, 5000);

        try 
        {
          this.postEnviarCoordenadas(this.codigo_gps, this.latitud, this.longitud).subscribe((respuesta: any) => {
          document.getElementById("mensaje-envio").innerHTML = "Enviando coordenadas";
          })
        } catch (error) 
        {
          document.getElementById("error-ocurrido").innerHTML = "Error al enviar las coordenadas";  
        }
      }
    }else
    {
      document.getElementById("error-ocurrido").innerHTML = "Ingrese codigo del GPS";
    }
  }
}