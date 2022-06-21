import { Component, ViewChild, ElementRef, ViewEncapsulation, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { dataJalan } from '../../../assets/excel/data_detail_jalan';

import 'leaflet';
import 'leaflet-ajax';
declare var L: any;

@Component({
  selector: 'app-peta',
  templateUrl: './peta.component.html',
  styleUrls: ['./peta.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PetaComponent {

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  mapL: any;
  tileOsm = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  tileImage = 'assets/tiles/{z}/{x}/{y}.png';
  latLong = [-7.982929, 112.631333];
  geoJsonLayer: any;
  popupData: any;
  isPopup = false;



  constructor(
    private router: Router) {
    Window["petaComponent"] = this;
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.leafletInit();
    }, 10)
  }

  leafletInit(){
    this.mapL = L.map("map", {
      zoomControl: false,
      // 130.995195324319,-2.5659269488061,133.457940099782,-0.915689659260994
      maxBounds: L.latLngBounds(L.latLng(-2.5659269488061, 130.995195324319), L.latLng(-0.915689659260994, 133.457940099782)),
      minZoom: 10,
      maxZoom: 15
    }).setView([-1.474562, 132.086938], 10);

    L.tileLayer(this.tileImage, {
      maxNativeZoom: 15
    }).addTo(this.mapL);
    this.geoJsonLayer = new L.GeoJSON.AJAX(["./assets/geojson/JARINGAN_JALAN_SORONG_SELATAN_GEO.geojson"],{
      onEachFeature: this.popUp
    });
    this.geoJsonLayer.addTo(this.mapL);

    this.mapL.on('popupopen', data => {
      this.popupData = data.popup._source.feature.properties;
    })
    this.mapL.on('popupclose', data => {
      this.popupData = null;
    })

    this.geoJsonLayer.on('mouseover', data => {
      console.log("cursor hover");
      // L.DomUtil.addClass(this.mapL._container, 'custome-cursor');
      // document.getElementById('map').style.cursor = 'crosshair'
    })
    this.geoJsonLayer.on('mouseout', data => {
      console.log("curdor out")
      // document.getElementById('map').style.cursor = ''
      // L.DomUtil.removeClass(this.mapL._container, 'custome-cursor');
    })


  }

  popUp(f, l){
    if (f.properties){
      // l.bindPopup("<center><img src='assets/images/jalan.jpg' style='width: 90%;'></center><br /><h5 style='margin-top:-10px; margin-bottom:-10px; background-color:blue; color:white; font-family:Arial;font-size: 18px;text-align: center;'> Data Survey Jalan</h5><br/><b style='font-family: Open Sans, sans-serif;font-size: .8125rem;'>Nama Jalan :"+f.properties.NAMA_RUAS+"</b><center><hr /><button style='background-color: #4CAF50;border: none;color: white;padding: 10px 33px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;' onclick='Window.myComponent.openWindow()'>Detail</button></center>");
      // l.bindPopup('<center><img src="assets/images/jalan.jpg" style="width: 90%;"></center><br /><h5 style="margin-top:-10px; margin-bottom:-10px; background-color:blue; color:white; font-family:Arial;font-size: 18px;text-align: center;"> Data Survey Jalan</h5><br/><b style="font-family: Open Sans, sans-serif;font-size: .8125rem;">Nama Jalan :'+f.properties.NAMA_RUAS+'</b><center><hr /><button style="background-color: #4CAF50;border: none;color: white;padding: 10px 33px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;" onclick="Window.myComponent.openWindow(\''+f.properties.NAMA_RUAS+'\', \''+f.properties.KECAMATAN_+'\',\''+f.properties.PANJANG_KM+'\',\''+f.properties.LEBAR_M+'\',\''+f.properties.LAPEN_KM+'\',\''+f.properties.BETON_KM+'\',\''+f.properties.TANAH_KM+'\',\''+f.properties.BELUMTEMBU+'\',\''+f.properties.BAIK_KM+'\',\''+f.properties.BAIK__PERS+'\',\''+f.properties.SEDANG_KM+'\',\''+f.properties.SEDANG_PER+'\',\''+f.properties.RUSAKRINGA+'\',\''+f.properties.RUSAKRIN00+'\',\''+f.properties.RUSAKBERAT+'\',\''+f.properties.RUSAKBER00+'\')">Detail</button></center>');
      l.bindPopup(`
        <div>
          <img src="assets/images/jalan.jpg" style="width: 100%;">
        </div>
        <div style="padding: 10px;">
          <div style="font-size: 9pt; color: #999;">Nama Jalan</div>
          <div style="color: #36f; font-weight: bold;">` + f.properties.NAMA_RUAS + `</div>
        </div>
        <div style="padding: 0px 10px 10px 10px;">
          <button class="detail-pop" onclick="Window.petaComponent.openDetail()">Detail</button>
        </div>
      `)
    }
  }

  openDetail(){
    this.isPopup = true;
    console.log(this.popupData)
  }
}
