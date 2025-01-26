import { Clouds } from "../clouds/clouds";
import { Weather } from "../weather/weather";
import { Main } from "../main/main";
import { Sys } from "../sys/sys";
import { Wind } from "../wind/wind";
import { Coord } from "../coord/coord";
import moment from "moment";

export class WeatherData {
  coord: Coord = new Coord();
  weather: Weather[] = [];
  weather_first: Weather = new Weather();
  base: string = '';
  main: Main = new Main();
  visibility: number = 0;
  wind: Wind = new Wind();
  clouds: Clouds = new Clouds();
  dt: number = 0;
  sys: Sys = new Sys();
  timezone: number = 0;
  id: number = 0;
  name: string = '';
  cod: number = 0;
  favorite: boolean = false;

  constructor(o: any = {}) {
    o = o || {};
    this.coord = new Coord(o.coord?.lon, o.coord?.lat);
    this.weather = (o.weather || []).map((w: any) => new Weather(w.id, w.main, w.description, w.icon));
    this.weather_first = this.weather[0] || new Weather;
    this.base = o.base || '';
    this.main = new Main(
      o.main?.temp,
      o.main?.feels_like,
      o.main?.temp_min,
      o.main?.temp_max,
      o.main?.pressure,
      o.main?.humidity,
      o.main?.sea_level,
      o.main?.grnd_level
    );
    this.visibility = o.visibility || 0;
    this.wind = new Wind(o.wind?.speed, o.wind?.deg, o.wind?.gust);
    this.clouds = new Clouds(o.clouds?.all);
    this.dt = o.dt || 0;
    this.sys = new Sys(o.sys?.country, o.sys?.sunrise, o.sys?.sunset);
    this.timezone = o.timezone || 0;
    this.id = o.id || 0;
    this.name = o.name || '';
    this.cod = o.cod || 0;
    this.favorite = o.favorite || false;
  }

  get date(): moment.Moment {
    return moment(this.dt * 1000);
  }
}
