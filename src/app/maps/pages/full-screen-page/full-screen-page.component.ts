import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map}from 'maplibre-gl';

@Component({
  selector: 'fullScreen',
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'el elemento html no fue encontrado';
    const map = new Map({
      container: this.divMap.nativeElement,
      style: 'https://demotiles.maplibre.org/style.json', // ubicación de la hoja de estilo
      center: [-99.1332, 19.4326], // posición inicial [lng, lat]
      zoom: 9 // zoom inicial
    });
  }
}
