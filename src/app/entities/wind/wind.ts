export class Wind {
  speed: number = 0;
  deg: number = 0;
  gust: number = 0;

  constructor(speed: number = 0, deg: number = 0, gust: number = 0) {
    this.speed = speed;
    this.deg = deg;
    this.gust = gust;
  }
}
