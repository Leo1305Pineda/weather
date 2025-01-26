import { Component, Input, OnInit } from '@angular/core';
import { WeatherData } from 'src/app/entities/weather-data/weather-data';
import { WeatherService } from 'src/app/services/weather/weather.service';

@Component({
  selector: 'app-hourly-forecast',
  templateUrl: './hourly-forecast.component.html',
  styleUrls: ['./hourly-forecast.component.scss'],
  providers: [WeatherService]
})
export class HourlyForecastComponent implements OnInit {

  @Input() set weather(weather: WeatherData) {
    const sub = this.weatherService.get('forecast/hourly', [
      `lat=${weather.coord.lat}`,
      `lon=${weather.coord.lat}`,
      '_=1737849409906'
    ]).subscribe({
      next: (res) => {
        sub.unsubscribe();
        console.log(weather, 'AJA', res)
      }, error: () => {
        sub.unsubscribe();
      }
    })
  }

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit() { }

}
