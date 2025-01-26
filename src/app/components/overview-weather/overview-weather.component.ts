import { Component, Input, OnInit } from '@angular/core';
import { WeatherData } from 'src/app/entities/weather-data/weather-data';
import { WeatherService } from 'src/app/services/weather/weather.service';

@Component({
  selector: 'app-overview-weather',
  templateUrl: './overview-weather.component.html',
  styleUrls: ['./overview-weather.component.scss'],
  providers: [
    WeatherService
  ]
})
export class OverviewWeatherComponent implements OnInit {

  @Input() set weather(weather: WeatherData) {
    const sub = this.weatherService.get('onecall/overview', [
      `lat=${weather.coord.lat}`, `lon=${weather.coord.lat}`
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
