export class Sys {
  country: string = '';
  sunrise: number = 0;
  sunset: number = 0;

  constructor(country: string = '', sunrise: number = 0, sunset: number = 0) {
    this.country = country;
    this.sunrise = sunrise;
    this.sunset = sunset;
  }

  get flag(): string {
    const cn = this.country.toLocaleLowerCase();
    return `http://openweathermap.org/images/flags/${cn}.png`
  }
}
