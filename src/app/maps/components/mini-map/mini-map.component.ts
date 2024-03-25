import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker}from 'maplibre-gl';
@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  @Input() lngLat?: [number,number];

  public map? : Map;
  public zoom : number = 15;


  ngAfterViewInit(): void {
    if (!this.divMap?.nativeElement) throw 'map div not found';
    if(!this.lngLat) throw 'lng cant be null';
    const MAPTILER_KEY = 'get_your_own_OpIi9ZULNHzrESv6T2vL';
    this.map = new Map  ({
      container: this.divMap?.nativeElement,
      //style: 'https://demotiles.maplibre.org/style.json',  ubicación de la hoja de estilo
      style: `https://api.maptiler.com/maps/basic-v2/style.json?key=${MAPTILER_KEY}`,
      center: this.lngLat, // posición inicial [lng, lat]
      zoom:  this.zoom,// zoom inicial
      pitch: 45,
      bearing: -17.6,
      antialias: true,
      interactive: false,


    });
    new Marker()
    .setLngLat(this.lngLat)
    .addTo(this.map)
  }
}
