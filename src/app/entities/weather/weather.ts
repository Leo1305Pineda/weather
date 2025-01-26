export class Weather {
  id: number = 0;
  main: string = '';
  description: string = '';
  icon: string = '';

  constructor(id: number = 0, main: string = '', description: string = '', icon: string = '') {
    this.id = id;
    this.main = main;
    this.description = description;
    this.icon = icon;
  }
}
