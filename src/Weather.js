import { useState, useEffect, useCallback } from 'react';
import './Weather.css';
import WeatherDisplay from './WeatherDisplay';

function Weather() {
    const [zip, setZip] = useState('');
    const [unit, setUnit] = useState('');
    const [data, setData] = useState(null);
    
    const fetchWeatherByCoords = useCallback(async (latitude, longitude) => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const path = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
        
        try {
            const res = await fetch(path);
            const json = await res.json();
            
            const cod = json.cod;
            const message = json.message;

            if (cod !== 200) {
                setData({ cod, message });
                return;
            }

            const temp = json.main.temp;
            const feelsLike = json.main.feels_like;
            const description = json.weather[0].description;
            const humidity = json.main.humidity;
            const pressure = json.main.pressure;
            const windSpeed = json.wind.speed;

            setData({
                cod,
                message,
                temp,
                feelsLike,
                description,
                humidity,
                pressure,
                windSpeed,
            });
        } catch (error) {
            console.error('Error fetching weather:', error);
        }
    }, [unit]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeatherByCoords(latitude, longitude);
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        }
    }, [unit, fetchWeatherByCoords]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetchWeatherByZip();
    };

    const fetchWeatherByZip = async () => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const path = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=${unit}`;
        
        try {
            const res = await fetch(path);
            const json = await res.json();
            
            const cod = json.cod;
            const message = json.message;

            if (cod !== 200) {
                setData({ cod, message });
                return;
            }

            const temp = json.main.temp;
            const feelsLike = json.main.feels_like;
            const description = json.weather[0].description;
            const humidity = json.main.humidity;
            const pressure = json.main.pressure;
            const windSpeed = json.wind.speed;

            setData({
                cod,
                message,
                temp,
                feelsLike,
                description,
                humidity,
                pressure,
                windSpeed,
            });
        } catch (error) {
            console.error('Error fetching weather:', error);
        }
    };

    const handleLocationButtonClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeatherByCoords(latitude, longitude);
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        }
    };

    return (
        <div className='Weather'>
            {data && <WeatherDisplay {...data} />}
            <form onSubmit={handleFormSubmit}>
                <div>
                    <input 
                        placeholder='Enter zip code'
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </div>
                
                <select 
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                >
                    <option value="metric">Celsius</option>
                    <option value="imperial">Fahrenheit</option>
                    <option value="standard">Kelvin</option>
                </select>
            </form>
            <button className="getLocationButton" onClick={handleLocationButtonClick}>
                Get Weather By Location
            </button>
        </div>
    );
}

export default Weather;