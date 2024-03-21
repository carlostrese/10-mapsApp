import { Component } from '@angular/core';

interface MenuItem{
  route: string;
  name: string;
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  public menuItem: MenuItem[]=[
    { route: '/maps/fullscreen', name: 'fullscreen'},
    { route: '/maps/zoom-range', name: 'zoom-range'},
    { route: '/maps/markers', name: 'markers'},
    { route: '/maps/properties', name: 'properties'},
  ]
}
