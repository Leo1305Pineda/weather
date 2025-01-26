import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController, ModalController } from '@ionic/angular';
import { IonContent, IonHeader, IonIcon, IonItem, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { search } from 'ionicons/icons';
import { HeaderComponent } from '../components/header/header.component';
import { SearchWeatherComponent } from '../components/search-weather/search-weather.component';
import { StorageService } from '../services/storage/storage.service';
import { WeatherService } from '../services/weather/weather.service';
import { Geolocation } from '@capacitor/geolocation';
import { FACTOR_X_C, LANGS, PATH } from '../services/constants';
import { WeatherData } from '../entities/weather-data/weather-data';
import { NgxStarsComponent } from '../components/ngx-stars/ngx-stars.component';
import { TranslateModule } from '@ngx-translate/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
const ION_IMPORTS = [
  IonContent, IonHeader, IonToolbar
];

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [
    ...ION_IMPORTS,
    HeaderComponent,
    SearchWeatherComponent,
    NgxStarsComponent,
    FormsModule,
    DecimalPipe,
    NgForOf,
    TranslateModule
  ],
  providers: [
    ModalController,
    WeatherService
  ]
})
export class WeatherPage implements OnInit {

  private isModal: boolean = false;
  public current_weather: WeatherData = new WeatherData();

  constructor(
    private modalCtrl: ModalController,
    private storageService: StorageService,
    private weatherService: WeatherService,
    private sanitizer: DomSanitizer
  ) {
    addIcons({ search })
  }

  get lang(): string {
    return localStorage.getItem('lang') || LANGS[0];
  }

  get factorXC(): number {
    return FACTOR_X_C;
  }

  ngOnInit() {
    console.log(this.storageService.get(PATH.CURRENT_WATHER))
    this.current_weather = new WeatherData(this.storageService.get(PATH.CURRENT_WATHER));
    this.storageService.onChange.subscribe(({ key }) => {
      if (key === PATH.CURRENT_WATHER) {
        this.current_weather = new WeatherData(this.storageService.get(PATH.CURRENT_WATHER));
      }
    })
    // this.init();
  }

  async init() {
    let coordinates = JSON.parse(localStorage.getItem('coordinates') || "{}")
    try {
      coordinates = await Geolocation.getCurrentPosition();
      localStorage.setItem('coordinates', JSON.stringify(coordinates));
    } catch (error) {
      console.error(error);
    }
    const sub = this.weatherService.get('weather', [`lat=${coordinates.coords.latitude}`, `lon=${coordinates.coords.longitude}`]).subscribe({
      next: (res: any) => {
        sub.unsubscribe();
        const weathers = this.storageService.get(PATH.WEATHER);
        weathers[res.id] = new WeatherData(res);
        this.storageService.set(PATH.CURRENT_WATHER, weathers[res.id]);
        this.storageService.set(PATH.WEATHER, weathers);
      }
    })
  }

  onSelectFavorite() {
    this.current_weather.favorite = !this.current_weather.favorite;
    const weathers = this.storageService.get(PATH.WEATHER);
    weathers[this.current_weather.id] = this.current_weather;
    console.log(weathers, 'weathersweathers')
    this.storageService.set(PATH.WEATHER, weathers);
    this.storageService.set(PATH.CURRENT_WATHER, this.current_weather);
  }

  async openSearhWeather() {
    if (this.isModal) {
      return;
    }
    const modal = await this.modalCtrl.create({
      component: SearchWeatherComponent
    })
    modal.onDidDismiss().then(() => {
      this.isModal = false;
    })
    return modal.present();
  }

}
