# Weather Project

This project is an application that retrieves weather data using the **WeatherAPI**. It is designed to display real-time weather information, including temperature, humidity, wind speed, and more.

## Table of Contents
1. [Requirements](#requirements)
2. [Project Setup](#project-setup)
3. [Running the Project](#running-the-project)
4. [Integration with WeatherAPI](#integration-with-weatherapi)
5. [Test Made](#test-made)

---

## Requirements

Before you begin, make sure you have the following installed on your machine:

- **Node.js** (version 20 or higher)
- **npm** (Node.js package manager)
- **A WeatherAPI account** to get your own API key.

## Project Setup

Follow these steps to set up the project on your local machine:

1. **Clone the repository:**

  ```bash
  git clone https://github.com/your-username/weather-project.git

  ```

2. **Install dependencies:**

  ```bash
  cd weather-project
  npm install
  ```

3. **Configure environment variables:**

  ```typescript
  export const environment = {
    ...
    appid: '' // https://home.openweathermap.org/api_keys
  };

  ```

## Running the Project

1. **Start the server:**

Once all dependencies are installed and configured, you can start the local server with the following command:

  ```bash
 npm start
  ```

2. **Access the application:**

Open your browser and go to http://localhost:4200 to view the application in action.

## Integration with WeatherAPI

The integration with WeatherAPI is handled through HTTP requests. We use Axios to make requests to the API and retrieve weather data in JSON format.

1. **We make a GET request to the API with the following URL:**

  ```bash
  https://api.weatherapi.com/v1/current.json?key=your_api_key&q={location}
  ```

2. **API Response:**

The API response includes various weather data, such as temperature, humidity, wind speed, etc. This data is processed and displayed in the user interface.

Example JSON response:

```
const res = {
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
}
```

3. **Error Handling:**

If the API fails to retrieve data (e.g., if the API key is incorrect or the location doesn't exist), the app handles errors by displaying an appropriate message to the user.

## Test Made

```bash
ng test --include=**/components/weather.component.spec.ts
```
