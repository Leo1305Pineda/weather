import { NgForOf, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonSearchbar } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { WeatherData } from 'src/app/entities/weather-data/weather-data';
import { PATH } from 'src/app/services/constants';
import { StorageService } from 'src/app/services/storage/storage.service';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { WeatherComponent } from '../weather/weather.component';
import { TranslateModule } from '@ngx-translate/core';

const ION_IMPORTS = [
  IonSearchbar
];
@Component({
  selector: 'app-search-weather',
  templateUrl: './search-weather.component.html',
  styleUrls: ['./search-weather.component.scss'],
  imports: [
    ...ION_IMPORTS,
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    WeatherComponent,
    TranslateModule
  ]
})
export class SearchWeatherComponent implements OnInit, OnDestroy {

  public weathers: any[] = [];
  public search_weathers: any[] = [];
  public control: FormControl = new FormControl({
    value: '',
    disabled: false
  })
  private sub!: Subscription;

  constructor(
    private storageService: StorageService,
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    this.init();
    this.control.valueChanges.subscribe((keyword) => {
      console.log(keyword)
      if (!keyword) {
        this.weathers = [];
      }
      const sub = this.weatherService.get('find', [
        `q=${keyword}`,
        'type=like',
        'sort=population',
        'cnt=5',
        '_=1737849409906'
      ]).subscribe({
        next: async (res) => {
          sub.unsubscribe();
          this.weathers = keyword ? (res.list || []).map((x: any) => {
            return new WeatherData(x);
          }) : [];
          let arr = (this.storageService.get(PATH.SEARCH_WATHERS) || []);
          this.weathers.forEach((x: WeatherData) => {
            const index = arr.findIndex((sx: any) => sx.id === x.id)
            if (index > -1) {
              arr[index] = x;
            } else {
              arr.unshift(x)
            }
          })
          await this.storageService.set(PATH.SEARCH_WATHERS, arr);
          this.init()
        },
        error: () => {
          this.weathers = [];
          sub.unsubscribe()
        }
      })
    })
  }

  init() {
    const data = (this.storageService.get(PATH.SEARCH_WATHERS) || []).sort((a: any, b: any) => b.dt < a.dt);
    this.search_weathers = data.filter((x: any, i: number) => i < 6)
  }

  selectWeather(item: WeatherData) {
    this.weathers = [];
    this.search_weathers = [];
    this.control.reset();
    const weathers = this.storageService.get(PATH.WEATHER) || {};
    item.favorite = weathers[item.id]?.favorite;
    weathers[item.id] = item;
    this.storageService.set(PATH.WEATHER, weathers);
    this.storageService.set(PATH.CURRENT_WATHER, item);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
