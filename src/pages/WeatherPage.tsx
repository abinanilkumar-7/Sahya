import React, { useState, useEffect } from 'react';
import { weatherService } from '../services/weatherService';
import { useLocation } from '../context/LocationContext';
import { WeatherInfo } from '../types';
import { CloudRain, Thermometer, Wind, Droplets, AlertCircle } from 'lucide-react';

export const WeatherPage: React.FC = () => {
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const { latitude, longitude, city } = useLocation();

  useEffect(() => {
    weatherService.getWeather(latitude, longitude, city).then(setWeather);
  }, [latitude, longitude, city]);

  if (!weather) return null;

  return (
    <div className="pt-28 pb-24 bg-brandbg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Regional Environment
          </span>
          <h1 className="font-serif text-4xl font-normal text-navy-950 mt-2 mb-2">
            Weather & Climate Advisories — {weather.city}
          </h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Live atmospheric metrics and community hydration center announcements.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-subtle mb-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-sky-50 text-sky-600">
                <CloudRain className="w-10 h-10" />
              </div>
              <div>
                <span className="font-serif text-5xl font-bold text-navy-950">{weather.temperature}°C</span>
                <p className="text-sm font-semibold text-slate-500">{weather.condition}</p>
              </div>
            </div>

            <div className="text-right text-xs text-slate-500 space-y-1">
              <p>High: <strong>{weather.highTemp}°C</strong> | Low: <strong>{weather.lowTemp}°C</strong></p>
              <p>Precipitation Chance: <strong>{weather.rainProbability}%</strong></p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <Droplets className="w-5 h-5 text-sky-500 mb-1" />
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Relative Humidity</span>
              <span className="text-lg font-bold text-navy-950">{weather.humidity}%</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <Wind className="w-5 h-5 text-teal-500 mb-1" />
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Wind Speed</span>
              <span className="text-lg font-bold text-navy-950">{weather.windSpeed} km/h</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 col-span-2 sm:col-span-1">
              <Thermometer className="w-5 h-5 text-rose-500 mb-1" />
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Thermal Index</span>
              <span className="text-lg font-bold text-navy-950">Normal Range</span>
            </div>
          </div>

          {weather.alert && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-amber-950">{weather.alert.title}</h5>
                <p className="text-amber-800 mt-0.5">{weather.alert.description}</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
