export class Main {
  temp: number = 0;
  feels_like: number = 0;
  temp_min: number = 0;
  temp_max: number = 0;
  pressure: number = 0;
  humidity: number = 0;
  sea_level: number = 0;
  grnd_level: number = 0;

  constructor(temp: number = 0, feels_like: number = 0, temp_min: number = 0, temp_max: number = 0,
              pressure: number = 0, humidity: number = 0, sea_level: number = 0, grnd_level: number = 0) {
    this.temp = temp || 0;
    this.feels_like = feels_like || 0;
    this.temp_min = temp_min || 0;
    this.temp_max = temp_max || 0;
    this.pressure = pressure || 0;
    this.humidity = humidity || 0;
    this.sea_level = sea_level || 0;
    this.grnd_level = grnd_level || 0;
  }

}
