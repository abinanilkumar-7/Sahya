import { apiClient } from './apiClient';
import { WeatherInfo } from '../types';
import { MOCK_WEATHER } from './mockData';

export const weatherService = {
  async getWeather(lat: number = 19.0760, lng: number = 72.8777, city: string = 'Central City'): Promise<WeatherInfo> {
    try {
      // Try backend endpoint
      const response = await apiClient.get('/weather', { params: { lat, lng } });
      if (response.data?.success) {
        return response.data.data;
      }
    } catch {
      // Failover
    }

    try {
      // Try direct Open-Meteo free API
      const omRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=relativehumidity_2m`
      );
      const data = await omRes.json();
      if (data && data.current_weather) {
        const cw = data.current_weather;
        return {
          city,
          temperature: Math.round(cw.temperature),
          condition: cw.weathercode === 0 ? 'Clear Sky' : cw.weathercode < 3 ? 'Partly Cloudy' : 'Overcast & Light Rain',
          humidity: data.hourly?.relativehumidity_2m?.[0] || 65,
          windSpeed: Math.round(cw.windspeed),
          rainProbability: cw.weathercode > 50 ? 80 : 15,
          highTemp: Math.round(cw.temperature + 3),
          lowTemp: Math.round(cw.temperature - 4),
          alert: cw.weathercode > 50 ? {
            title: 'Precipitation & Rain Warning',
            severity: 'WARNING',
            description: 'Expect scattered showers. Sahya relief shelters are offering dry clothing and hot beverages.',
          } : MOCK_WEATHER.alert,
        };
      }
    } catch {
      // Direct open meteo failed, use mock weather
    }

    return MOCK_WEATHER;
  }
};
