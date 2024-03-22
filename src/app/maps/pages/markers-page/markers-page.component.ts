import { Component, ElementRef, ViewChild } from '@angular/core';

import { Color, LngLat, Map, Marker}from 'maplibre-gl';

interface MarkerAndColor{
  color: string;
  marker: Marker;
}

interface PlainMarker{
  color: string;
  lngLat: number[];
}

@Component({
  selector:'markesPage',
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {
  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[]= [];


  public zoom: number = 13;
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

    this.readFromLocalStorage();
    // const markerElement = document.createElement('div');
    // markerElement.innerHTML = 'carlos diaz'

    // const marker = new Marker({
    //   color: 'green',
    //   element: markerElement
    // })
    // .setLngLat(this.curremtLngLat)
    // .addTo(this.map);

  }

  createMarker(){
    if (!this.map) return;
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();
    this.addMarker(lngLat,color);
  }

  addMarker(lngLat: LngLat, color:string){
    if (!this.map) return;
    const marker = new Marker({
      color: color,
      draggable: true
    }).setLngLat(lngLat).addTo(this.map);

    this.markers.push({color,marker});
    this.saveToLocalStorage();
      //dragend
      marker.on('dragend', ()=> this.saveToLocalStorage());
  }

  deleteMarker(index:number){
    this.markers[index].marker.remove();
    this.markers.splice(index,1);


  }

  flyTo(maker: Marker){
    this.map?.flyTo({
      zoom:14,
      center: maker.getLngLat()
    })
  }

  saveToLocalStorage(){
    const plainMarker: PlainMarker[]= this.markers.map(({color, marker}) =>{
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarker));
  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);
    plainMarkers.forEach(({ color, lngLat }) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);
      this.addMarker(coords, color);
    });
  }


}
