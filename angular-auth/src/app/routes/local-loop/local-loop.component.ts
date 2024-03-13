import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeafletDirective, LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from "leaflet";

@Component({
  selector: 'app-local-loop',
  standalone: true,
  imports: [CommonModule, LeafletModule],
  templateUrl: './local-loop.component.html',
  styleUrl: './local-loop.component.scss'
})
export class LocalLoopComponent {
  @ViewChild(LeafletDirective) leafletDirective!: LeafletDirective;

  public pageTitle: string = 'Cable';
  public pageSubTitle: string = 'Search by Pop or Coordinate';
  public isCollapsedHeader: boolean = false;

  private _initCenterCoord: { lat: number, lng: number } = { lat: -6.1753924, lng: 106.8271528 };
  public options = {
    center: L.latLng([this._initCenterCoord.lat, this._initCenterCoord.lng]),
    zoom: 12,
    zoomControl: false,
    layers: [
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; Unify by <a href="https://supersistem.id">Super Sistem</a>',
        maxZoom: 20
      }),
      L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_labels/{z}/{x}/{y}{r}.png', {
        minZoom: 0,
        maxZoom: 20,
      }),
      L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain_lines/{z}/{x}/{y}{r}.png', {
        minZoom: 0,
        maxZoom: 18,
      })
    ],
  };

  public layerPolyline = [
    L.polyline([
      [this._initCenterCoord.lat, this._initCenterCoord.lng], 
      [-6.1688863, 106.8403244], 
      [-6.1292900, 106.8300247],
    ], { color: '#bb0000', weight: 6 }),
    L.polyline([
      [this._initCenterCoord.lat, this._initCenterCoord.lng],
      [-6.174347648644826, 106.82281494140625],
      [-6.171275658817273, 106.82290077209474],
      [-6.1705076585772725, 106.82144165039062],
      [-6.138677338011652, 106.81371688842775],
      [-6.135007768415169, 106.83165550231935],
      [-6.1292900, 106.8300247],
    ], { color: '#df6e0c', weight: 6 })
  ];

  private _iconAend: L.Icon<L.IconOptions> = L.icon({
    iconUrl: 'assets/marker-icon.png',
    shadowUrl: 'assets/marker-shadow.png',
    iconAnchor: [12, 38],
  });

  private _iconBend: L.Icon<L.IconOptions> = L.icon({
    iconUrl: 'assets/marker-icon.png',
    shadowUrl: 'assets/marker-shadow.png',
    iconAnchor: [12, 38],
  });

  public layerMarker: L.Marker<any>[] = [
    L.marker(
      [ -6.1753924, 106.8271528], 
      { draggable: true, icon: this._iconAend  }
    ),
    L.marker(
      [-6.1292900, 106.8300247], 
      { draggable: true, icon: this._iconBend }
    )
  ];

  constructor() {}

  onClick(args: L.LeafletMouseEvent) {
    L.popup()
    .setLatLng(args.latlng)
    .setContent(`<p>LatLng : ${args.latlng.lat}, ${args.latlng.lng}</p>`)
    .openOn(this.leafletDirective.map);
  }

}
