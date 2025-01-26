import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonToolbar, IonToggle } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { StorageService } from '../services/storage/storage.service';
import { PATH } from '../services/constants';
import { WeatherData } from '../entities/weather-data/weather-data';
import { WeatherComponent } from '../components/weather/weather.component';
import { NgForOf } from '@angular/common';
import { NavController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { TableWeathersComponent } from '../components/table-weathers/table-weathers.component';
import { FormsModule } from '@angular/forms';

const IONIC_IMPORTS = [
  IonContent, IonHeader, IonToolbar, IonToggle
]

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
  standalone: true,
  imports: [
    ...IONIC_IMPORTS,
    HeaderComponent,
    WeatherComponent,
    NgForOf,
    FormsModule,
    TranslateModule,
    TableWeathersComponent
  ]
})
export class FavoritePage implements OnInit {
  isTable: boolean = false;

  weathers: Array<WeatherData> = new Array<WeatherData>();

  constructor(
    private storageService: StorageService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    const data = this.storageService.get(PATH.WEATHER) || {};
    Object.keys(data).forEach(key => {
      if (data[key]?.favorite) {
        this.weathers.push(new WeatherData(data[key]))
      }
    })
  }

  selectWeather(item: WeatherData) {
    const weathers = this.storageService.get(PATH.WEATHER) || {};
    item.favorite = weathers[item.id]?.favorite;
    weathers[item.id] = item;
    this.storageService.set(PATH.WEATHER, weathers);
    this.storageService.set(PATH.CURRENT_WATHER, item);
    this.navCtrl.navigateRoot(['weather']);
  }
}
