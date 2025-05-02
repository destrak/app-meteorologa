import React, { useState, useEffect } from 'react';

function WeatherAPI2() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY
    const lat = -36.82
    const lon = -73.04
    const apiUrl= `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
  
        try {
          const response = await fetch(apiUrl);
          const json = await response.json();
          console.log(json)
          setData(json);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [apiUrl]);

    useEffect(() => {
      if (forecastData) {
        const daily = getDailyForecasts(forecastData);
        setDailyForecasts(daily);
      }
    }, [forecastData]);
    
    if (loading) {
      return <div>Loading data...</div>;
    }
  
    if (error) {
      return <div>Error fetching data: {error.message}</div>;
    }

      return (
        <div>
          <h2>Data from API:</h2>
          <p>{data.list[0].main.temp}</p>
        </div>
      );


  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };
}
export default WeatherAPI2;