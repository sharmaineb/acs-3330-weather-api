import './WeatherDisplay.css'

function WeatherDisplay(props) {
    const { temp, feelsLike, description, cod, message, humidity, pressure, windSpeed } = props

    if (cod !== 200) {
        return (
            <small>{message}</small>
        )
    }

    return (
        <div className="WeatherDisplay">
            <h1>{temp}</h1>
            <small>Feels Like: {feelsLike}</small>
            <p>{description}</p>
            <p>Humidity: {humidity}%</p>
            <p>Pressure: {pressure} hPa</p>
            <p>Wind Speed: {windSpeed} m/s</p>
        </div>
    )
}

export default WeatherDisplay