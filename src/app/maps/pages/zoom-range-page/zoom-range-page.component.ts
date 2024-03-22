import { NodeWithI18n } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map}from 'maplibre-gl';
@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent  implements AfterViewInit, OnDestroy{

  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 15;
  public map?: Map;
  public curremtLngLat: LngLat = new LngLat(-99.1332, 19.4326);
  ngAfterViewInit(): void {
    const MAPTILER_KEY = 'get_your_own_OpIi9ZULNHzrESv6T2vL';

    if (!this.divMap) throw 'el elemento html no fue encontrado';
    this.map  = new Map({
      container: this.divMap.nativeElement,
      //style: 'https://demotiles.maplibre.org/style.json',  ubicación de la hoja de estilo
      style: `https://api.maptiler.com/maps/basic-v2/style.json?key=${MAPTILER_KEY}`,
      center: this.curremtLngLat, // posición inicial [lng, lat]
      zoom:  this.zoom,// zoom inicial
      pitch: 45,
      bearing: -17.6,

      antialias: true,


    });

    this.mapListeners();

  }
  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners(){
    if(!this.map) throw 'map no inicializado';

    this.map.on('zoom', (ev)=> {
      this.zoom = this.map!.getZoom();
    });
    if(!this.map) throw 'map no inicializado';

    this.map.on('zoomend', (ev)=> {
       if( this.map!.getZoom() < 18) return;
       this.map!.zoomTo(18);
    });

    this.map.on('move', ()=>{
      this.curremtLngLat = this.map!.getCenter();
      const { lng, lat} = this.curremtLngLat

    });
  }

  zoomIn (){
    this.map?.zoomIn();
  }
  zoomOut(){
    this.map?.zoomOut();
  }

  zoomChanged(value:string){
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }



}
