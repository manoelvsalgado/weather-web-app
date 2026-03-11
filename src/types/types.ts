export interface WeatherCondition {
  text: string;
  icon: string;
}

export interface CurrentWeather {
  temp_c: number | null;
  wind_kph: number | null;
  humidity: number | null;
  condition: WeatherCondition;
}

export interface ForecastHour {
  time: string;
  temp_c: number | null;
  condition?: WeatherCondition;
}

export interface AstroData {
  sunrise: string | null;
  sunset: string | null;
}

export interface ForecastDay {
  astro: AstroData;
  hour: ForecastHour[];
  day?: {
    maxtemp_c: number | null;
    mintemp_c: number | null;
  };
}

export interface Forecast {
  forecastday: ForecastDay[];
}

export interface WeatherData {
  current: CurrentWeather;
  forecast: Forecast;
}

export interface WeatherContextType {
  data: WeatherData | null;
  getWeather: (city: string) => Promise<void>;
}
