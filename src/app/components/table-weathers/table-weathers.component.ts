import { DecimalPipe, NgForOf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { WeatherData } from 'src/app/entities/weather-data/weather-data';
import { FACTOR_X_C, LANGS } from 'src/app/services/constants';

@Component({
  selector: 'app-table-weathers',
  templateUrl: './table-weathers.component.html',
  styleUrls: ['./table-weathers.component.scss'],
  imports: [
    DecimalPipe,
    TranslateModule,
    NgForOf
  ]
})
export class TableWeathersComponent implements OnInit {

  @Input() weathers: Array<WeatherData> = new Array<WeatherData>();

  constructor() { }

  ngOnInit() { }


  get lang(): string {
    return localStorage.getItem('lang') || LANGS[0];
  }

  get factorXC(): number {
    return FACTOR_X_C;
  }

}
