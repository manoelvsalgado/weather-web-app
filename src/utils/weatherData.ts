import { useEffect, useState } from "react";
import { WeatherData } from "../types/types";

interface OpenMeteoGeocodingResult {
  latitude: number;
  longitude: number;
  name: string;
}

interface OpenMeteoGeocodingResponse {
  results?: OpenMeteoGeocodingResult[];
}

interface OpenMeteoForecastResponse {
  current?: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  hourly?: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
  daily?: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
  };
}

const weatherCodeMap: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

const getWeatherText = (code: number | undefined) => {
  if (code === undefined) return "Unavailable";
  return weatherCodeMap[code] ?? "Unavailable";
};

const getWeatherIcon = (code: number | undefined) => {
  if (code === undefined) return "❓";

  if (code === 0) return "☀️";
  if (code === 1 || code === 2) return "🌤️";
  if (code === 3) return "☁️";
  if (code === 45 || code === 48) return "🌫️";
  if ([51, 53, 55, 56, 57].includes(code)) return "🌦️";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "🌧️";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️";
  if ([95, 96, 99].includes(code)) return "⛈️";

  return "🌡️";
};

const formatHour = (isoDate: string | undefined) => {
  if (!isoDate) return null;
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

const normalizeForecastToWeatherData = (forecast: OpenMeteoForecastResponse): WeatherData => {
  const currentTemp = forecast.current?.temperature_2m ?? null;
  const currentHumidity = forecast.current?.relative_humidity_2m ?? null;
  const currentWind = forecast.current?.wind_speed_10m ?? null;
  const currentCode = forecast.current?.weather_code;

  const hourlyTimes = forecast.hourly?.time ?? [];
  const hourlyTemps = forecast.hourly?.temperature_2m ?? [];
  const hourlyCodes = forecast.hourly?.weather_code ?? [];

  const hour = hourlyTimes.map((time, index) => ({
    time,
    temp_c: hourlyTemps[index] ?? null,
    condition: {
      text: getWeatherText(hourlyCodes[index]),
      icon: getWeatherIcon(hourlyCodes[index]),
    },
  }));

  return {
    current: {
      temp_c: currentTemp,
      humidity: currentHumidity,
      wind_kph: currentWind,
      condition: {
        text: getWeatherText(currentCode),
        icon: getWeatherIcon(currentCode),
      },
    },
    forecast: {
      forecastday: [
        {
          astro: {
            sunrise: formatHour(forecast.daily?.sunrise?.[0]),
            sunset: formatHour(forecast.daily?.sunset?.[0]),
          },
          hour,
          day: {
            maxtemp_c: forecast.daily?.temperature_2m_max?.[0] ?? null,
            mintemp_c: forecast.daily?.temperature_2m_min?.[0] ?? null,
          },
        },
      ],
    },
  };
};

export const useWeatherData = (cityName: string | undefined) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cityName) {
      setError("City not provided");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchWeather = async () => {
      try {
        const geocodingResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
        );

        if (!geocodingResponse.ok) {
          throw new Error("Failed to find city coordinates");
        }

        const geocodingData: OpenMeteoGeocodingResponse = await geocodingResponse.json();
        const location = geocodingData.results?.[0];

        if (!location) {
          throw new Error("City not found");
        }

        const forecastResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&forecast_days=1`
        );

        if (!forecastResponse.ok) {
          throw new Error("Failed to fetch weather forecast");
        }

        const forecastData: OpenMeteoForecastResponse = await forecastResponse.json();
        setWeatherData(normalizeForecastToWeatherData(forecastData));
      } catch (err) {
        setWeatherData(null);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [cityName]);

  return { weatherData, loading, error };
};
