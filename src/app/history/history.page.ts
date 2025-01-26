import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonToggle } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { WeatherData } from '../entities/weather-data/weather-data';
import { StorageService } from '../services/storage/storage.service';
import { PATH } from '../services/constants';
import { NavController } from '@ionic/angular';
import { WeatherComponent } from '../components/weather/weather.component';
import { HeaderComponent } from '../components/header/header.component';
import { TableWeathersComponent } from '../components/table-weathers/table-weathers.component';

const IONIC_IMPORTS = [IonContent, IonHeader, IonToolbar, IonToggle]

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [
    ...IONIC_IMPORTS,
    FormsModule,
    HeaderComponent,
    WeatherComponent,
    NgForOf,
    TranslateModule,
    TableWeathersComponent
  ]
})
export class HistoryPage implements OnInit {

  isTable: boolean = false;

  weathers: Array<WeatherData> = new Array<WeatherData>();

  constructor(
    private storageService: StorageService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    const data = this.storageService.get(PATH.SEARCH_WATHERS) || {};
    Object.keys(data).forEach(key => {
      this.weathers.push(new WeatherData(data[key]))
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
