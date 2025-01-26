import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherComponent } from './weather.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DecimalPipe } from '@angular/common';
import { WeatherData } from 'src/app/entities/weather-data/weather-data';
import { FACTOR_X_C } from 'src/app/services/constants';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      imports: [
        TranslateModule.forRoot(),  // Initialize the translation module
        DecimalPipe                // Import the DecimalPipe module
      ],
      providers: [TranslateService],
      schemas: [NO_ERRORS_SCHEMA]  // Ignore unrecognized elements
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the name and country of the weather item', () => {
    const weatherData: WeatherData = new WeatherData({
      "coord": {
        "lon": -76.9956,
        "lat": 38.8828
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "weather_first": {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
      },
      "base": "stations",
      "main": {
        "temp": 280.88,
        "feels_like": 278.88,
        "temp_min": 280.07,
        "temp_max": 281.69,
        "pressure": 1024,
        "humidity": 44,
        "sea_level": 1024,
        "grnd_level": 1017
      },
      "visibility": 10000,
      "wind": {
        "speed": 3.09,
        "deg": 240,
        "gust": 0
      },
      "clouds": {
        "all": 0
      },
      "dt": 1737918014,
      "sys": {
        "country": "US",
        "sunrise": 1737893929,
        "sunset": 1737930126
      },
      "timezone": -18000,
      "id": 4140963,
      "name": "Washington D.C.",
      "cod": 200,
      "favorite": false
    });
    component.item = weatherData;
    fixture.detectChanges();

    const nameElement = fixture.debugElement.query(By.css('label')).nativeElement;
    const flagElement = fixture.debugElement.query(By.css('img')).nativeElement;

    expect(nameElement.textContent).toContain('Mexico City, MX');
    expect(flagElement.src).toContain('mx-flag.png');
  });

  it('should compute and display the temperature correctly with the factorXC adjustment', () => {
    const weatherData: WeatherData = new WeatherData({
      "coord": {
        "lon": -76.9956,
        "lat": 38.8828
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "weather_first": {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
      },
      "base": "stations",
      "main": {
        "temp": 280.88,
        "feels_like": 278.88,
        "temp_min": 280.07,
        "temp_max": 281.69,
        "pressure": 1024,
        "humidity": 44,
        "sea_level": 1024,
        "grnd_level": 1017
      },
      "visibility": 10000,
      "wind": {
        "speed": 3.09,
        "deg": 240,
        "gust": 0
      },
      "clouds": {
        "all": 0
      },
      "dt": 1737918014,
      "sys": {
        "country": "US",
        "sunrise": 1737893929,
        "sunset": 1737930126
      },
      "timezone": -18000,
      "id": 4140963,
      "name": "Washington D.C.",
      "cod": 200,
      "favorite": false
    });
    component.item = weatherData;
    fixture.detectChanges();

    const tempElement = fixture.debugElement.query(By.css('.badge')).nativeElement;
    const expectedTemp = (weatherData.main.temp - FACTOR_X_C).toFixed(2);  // Calculate the adjusted temperature

    expect(tempElement.textContent).toContain(`${expectedTemp}°С`);
  });

  it('should call translate service for translating fields', () => {
    spyOn(translateService, 'instant').and.callThrough();  // Spy on the translate method

    const weatherData: WeatherData = new WeatherData({
      "coord": {
        "lon": -76.9956,
        "lat": 38.8828
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "weather_first": {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
      },
      "base": "stations",
      "main": {
        "temp": 280.88,
        "feels_like": 278.88,
        "temp_min": 280.07,
        "temp_max": 281.69,
        "pressure": 1024,
        "humidity": 44,
        "sea_level": 1024,
        "grnd_level": 1017
      },
      "visibility": 10000,
      "wind": {
        "speed": 3.09,
        "deg": 240,
        "gust": 0
      },
      "clouds": {
        "all": 0
      },
      "dt": 1737918014,
      "sys": {
        "country": "US",
        "sunrise": 1737893929,
        "sunset": 1737930126
      },
      "timezone": -18000,
      "id": 4140963,
      "name": "Washington D.C.",
      "cod": 200,
      "favorite": false
    });
    component.item = weatherData;
    fixture.detectChanges();

    // Check if 'fields.main_temp' is being translated
    expect(translateService.instant).toHaveBeenCalledWith('fields.main_temp');
    expect(translateService.instant).toHaveBeenCalledWith('page.from');
    expect(translateService.instant).toHaveBeenCalledWith('page.to');
    expect(translateService.instant).toHaveBeenCalledWith('fields.wind');
    expect(translateService.instant).toHaveBeenCalledWith('fields.main_humidity');
    expect(translateService.instant).toHaveBeenCalledWith('fields.coord');
  });
});
