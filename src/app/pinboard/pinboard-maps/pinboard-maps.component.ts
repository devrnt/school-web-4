import { Component, OnInit, Input } from '@angular/core';
import { Pinboard } from '../../models/pinboard.model';
import { Location } from '../../models/location.model';

@Component({
  selector: 'app-pinboard-maps',
  templateUrl: './pinboard-maps.component.html',
  styleUrls: ['./pinboard-maps.component.css']
})
export class PinboardMapsComponent implements OnInit {
  @Input() pinboards: Pinboard[];

  mapCenterLat: number = 50.495696;
  mapCenterLon: number = 3.3450918;

  constructor() { }

  ngOnInit() {
    
  }
  clickedLocation(index: Number){
    // eventueel verder iets met doen
    console.log(`Index ${index}`)
  }



}
