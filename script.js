// DOM Elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const locationName = document.getElementById('location-name');
const currentDate = document.getElementById('current-date');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const weatherIcon = document.getElementById('weather-icon');
const windSpeed = document.getElementById('wind-speed');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const forecastContainer = document.getElementById('forecast-container');
const uvIndex = document.getElementById('uv-index');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const humidityValue = document.getElementById('humidity-value');
const humidityBar = document.getElementById('humidity-bar');
const visibility = document.getElementById('visibility');

// Weather code mapping
const weatherCodes = {
    0: { desc: 'Clear sky', icon: 'fa-sun' },
    1: { desc: 'Mainly clear', icon: 'fa-cloud-sun' },
    2: { desc: 'Partly cloudy', icon: 'fa-cloud-sun' },
    3: { desc: 'Overcast', icon: 'fa-cloud' },
    45: { desc: 'Fog', icon: 'fa-smog' },
    48: { desc: 'Depositing rime fog', icon: 'fa-smog' },
    51: { desc: 'Light drizzle', icon: 'fa-cloud-rain' },
    53: { desc: 'Moderate drizzle', icon: 'fa-cloud-rain' },
    55: { desc: 'Dense drizzle', icon: 'fa-cloud-rain' },
    61: { desc: 'Slight rain', icon: 'fa-cloud-rain' },
    63: { desc: 'Moderate rain', icon: 'fa-cloud-rain' },
    65: { desc: 'Heavy rain', icon: 'fa-cloud-showers-heavy' },
    71: { desc: 'Slight snow', icon: 'fa-snowflake' },
    73: { desc: 'Moderate snow', icon: 'fa-snowflake' },
    75: { desc: 'Heavy snow', icon: 'fa-snowflake' },
    77: { desc: 'Snow grains', icon: 'fa-snowflake' },
    80: { desc: 'Slight rain showers', icon: 'fa-cloud-showers-heavy' },
    81: { desc: 'Moderate rain showers', icon: 'fa-cloud-showers-heavy' },
    82: { desc: 'Violent rain showers', icon: 'fa-cloud-showers-heavy' },
    85: { desc: 'Slight snow showers', icon: 'fa-snowflake' },
    86: { desc: 'Heavy snow showers', icon: 'fa-snowflake' },
    95: { desc: 'Thunderstorm', icon: 'fa-bolt' },
    96: { desc: 'Thunderstorm with slight hail', icon: 'fa-cloud-bolt' },
    99: { desc: 'Thunderstorm with heavy hail', icon: 'fa-cloud-bolt' }
};

// Init
document.addEventListener('DOMContentLoaded', () => {
    // Set current date
    const now = new Date();
    currentDate.textContent = now.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

// Try geolocation, but don't fallback to New York
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        pos => getWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
        () => {
            // Do nothing, wait for user to search
            console.log("Geolocation denied. Please search manually.");
        }
    );
}

    // Search events
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keyup', e => {
        if (e.key === 'Enter') handleSearch();
    });
});

// Handle search
function handleSearch() {
    const loc = searchInput.value.trim();
    if (loc) getWeatherData(loc);
}

// Weather by city
async function getWeatherData(location) {
    try {
        locationName.innerHTML = `Searching for ${location} <span class="loading"></span>`;
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`);
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) throw new Error('Location not found');

        const { latitude, longitude, name, country, admin1 } = geoData.results[0];
        getWeatherByCoords(latitude, longitude, `${name}, ${admin1 || ''} ${country}`);
    } catch (err) {
        locationName.textContent = err.message;
    }
}

// Weather by coords
async function getWeatherByCoords(lat, lon, place = '') {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&hourly=relativehumidity_2m,pressure_msl,visibility&timezone=auto`;
        const res = await fetch(url);
        const data = await res.json();

        // Location
        locationName.textContent = place || `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`;

        // Current weather
        const current = data.current_weather;
        const wc = weatherCodes[current.weathercode] || { desc: 'Unknown', icon: 'fa-question' };
        temperature.textContent = `${current.temperature}°C`;
        weatherDescription.textContent = wc.desc;
        weatherIcon.className = `fas ${wc.icon}`;
        windSpeed.textContent = `${current.windspeed} km/h`;
        humidity.textContent = `${data.hourly.relativehumidity_2m[0]}%`;
        pressure.textContent = `${data.hourly.pressure_msl[0]} hPa`;

        // Forecast
        forecastContainer.innerHTML = '';
        data.daily.time.slice(0, 5).forEach((day, i) => {
            const code = data.daily.weathercode[i];
            const w = weatherCodes[code] || { desc: 'Unknown', icon: 'fa-question' };
            const max = data.daily.temperature_2m_max[i];
            const min = data.daily.temperature_2m_min[i];

            const card = document.createElement('div');
            card.classList.add('forecast-card');
            card.innerHTML = `
                <p>${new Date(day).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                <i class="fas ${w.icon}"></i>
                <p>${max}° / ${min}°</p>
            `;
            forecastContainer.appendChild(card);
        });

        // Highlights
        uvIndex.textContent = data.daily.uv_index_max[0];
        sunrise.innerHTML = `<i class="fas fa-sunrise"></i> ${new Date(data.daily.sunrise[0]).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
        sunset.innerHTML = `<i class="fas fa-sunset"></i> ${new Date(data.daily.sunset[0]).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
        humidityValue.textContent = `${data.hourly.relativehumidity_2m[0]}%`;
        humidityBar.style.width = `${data.hourly.relativehumidity_2m[0]}%`;
        visibility.textContent = `${(data.hourly.visibility[0] / 1000).toFixed(1)} km`;

    } catch (err) {
        locationName.textContent = 'Failed to fetch weather';
    }
}
