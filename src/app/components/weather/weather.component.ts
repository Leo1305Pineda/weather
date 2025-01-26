import { DecimalPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { WeatherData } from 'src/app/entities/weather-data/weather-data';
import { FACTOR_X_C } from 'src/app/services/constants';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  imports: [
    DecimalPipe,
    TranslateModule
  ]
})
export class WeatherComponent  implements OnInit {

  @Input() item: WeatherData = new WeatherData;

  constructor() { }

  ngOnInit() {}

  get factorXC(): number {
    return FACTOR_X_C;
  }

}
