import React, { useState, useEffect } from 'react';
import { weatherService } from '../../services/weatherService';
import { useLocation } from '../../context/LocationContext';
import { WeatherInfo } from '../../types';
import { CloudRain, Wind, Droplets, Thermometer, AlertCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { latitude, longitude, city } = useLocation();

  const fetchWeather = () => {
    setLoading(true);
    weatherService.getWeather(latitude, longitude, city).then((w) => {
      setWeather(w);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude, city]);

  if (!weather) return null;

  return (
    <section className="py-16 bg-brandbg border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle flex flex-col lg:flex-row items-center justify-between gap-6" data-aos="fade-up">
          
          {/* Left Weather Header */}
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-sky-50 text-sky-600">
              <CloudRain className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Environment & Weather Advisory
              </span>
              <h3 className="font-serif text-2xl font-bold text-navy-950 flex items-center gap-2">
                <span>{weather.city}</span>
                <span className="text-sm font-sans font-normal text-slate-500">({weather.condition})</span>
              </h3>
              {weather.alert && (
                <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {weather.alert.title}
                </div>
              )}
            </div>
          </div>

          {/* Weather Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto text-xs">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center gap-3">
              <Thermometer className="w-5 h-5 text-rose-500" />
              <div>
                <span className="text-[10px] text-slate-400 block">Temperature</span>
                <span className="font-bold text-navy-900 text-sm">{weather.temperature}°C</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center gap-3">
              <Droplets className="w-5 h-5 text-sky-500" />
              <div>
                <span className="text-[10px] text-slate-400 block">Humidity</span>
                <span className="font-bold text-navy-900 text-sm">{weather.humidity}%</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center gap-3">
              <Wind className="w-5 h-5 text-teal-500" />
              <div>
                <span className="text-[10px] text-slate-400 block">Wind Speed</span>
                <span className="font-bold text-navy-900 text-sm">{weather.windSpeed} km/h</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center gap-3">
              <CloudRain className="w-5 h-5 text-indigo-500" />
              <div>
                <span className="text-[10px] text-slate-400 block">Rain Chance</span>
                <span className="font-bold text-navy-900 text-sm">{weather.rainProbability}%</span>
              </div>
            </div>
          </div>

          {/* Action Link */}
          <div className="flex items-center gap-2">
            <button
              onClick={fetchWeather}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              title="Refresh Weather"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <Link
              to="/weather"
              className="px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-teal-600 text-white font-bold text-xs transition-colors whitespace-nowrap"
            >
              Full Forecast
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};
