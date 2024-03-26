import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

interface MenuItem{
  route: string;
  name: string;
}

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
})
export class SideMenuComponent {

  public menuItem: MenuItem[]=[
    { route: '/maps/fullscreen', name: 'fullscreen'},
    { route: '/maps/zoom-range', name: 'zoom-range'},
    { route: '/maps/markers', name: 'markers'},
    { route: '/maps/properties', name: 'properties'},
    { route: '/alone', name: 'Alone page'},
  ]
}
