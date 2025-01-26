# Weather Project

This project is an application that retrieves weather data using the **WeatherAPI**. It is designed to display real-time weather information, including temperature, humidity, wind speed, and more.

## Table of Contents
1. [Requirements](#requirements)
2. [Project Setup](#project-setup)
3. [Running the Project](#running-the-project)
4. [Integration with WeatherAPI](#integration-with-weatherapi)
5. [Optimizations Made](#optimizations-made)

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
