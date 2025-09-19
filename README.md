

```markdown
🌦️ Classy Weather App
Live Demo: https://cloudy2sunny.netlify.app/
A sleek and responsive weather web application built with HTML, CSS, and JavaScript.  
It fetches live weather data using the [Open-Meteo API](https://open-meteo.com/) and displays current weather conditions and forecasts for any location.

🚀 Features

- 🔎 Search any city to get real-time weather updates
- 📍 Geolocation support (detects your location, if allowed)
- 🌡️ Current weather display with dynamic icons
- 📅 5-day forecast with temperature trends
- ☀️ Today's highlights (UV index, humidity, visibility, sunrise & sunset)
- 🎨 Modern UI with gradient backgrounds and glassmorphism effects
- 🌓 Theme adaptation based on weather conditions
- 📱 Fully responsive design for desktop, tablet, and mobile

🛠️ Tech Stack

- Frontend: HTML5, CSS3, JavaScript
- API: [Open-Meteo](https://open-meteo.com/) (Free, no API key required)
- Icons: Custom SVG weather icons
- Deployment: GitHub Pages


 📂 Project Structure

📁 classy-weather/
│
├── 📄 index.html # Main HTML file
├── 📄 style.css # Stylesheet with responsive design
├── 📄 script.js # JavaScript (API integration + UI logic)
├── 📄 README.md # Project documentation




 ⚙️ Installation & Usage

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/classy-weather.git
   cd classy-weather
   ```

2. Open in browser
   - Simply open `index.html` in your web browser, or
   - Use a local server for better functionality:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     ```

3. Start exploring
   - Allow location access for automatic weather detection, or
   - Search for any city using the search bar

🌍 API Information

This project uses the Open-Meteo API which provides free weather forecast data without requiring an API key.

Example API Request:
```javascript
// Fetch weather data by latitude and longitude
const apiUrl = `https://api.open-meteo.com/v1/forecast?
  latitude=12.97&
  longitude=77.59&
  current_weather=true&
  daily=weathercode,temperature_2m_max,temperature_2m_min&
  timezone=auto`;
```

API Response Handling:
The application processes the API response to extract:
- Current temperature and weather conditions
- Daily forecast data
- Sunrise and sunset times
- UV index and other meteorological data

 🎨 Customization

You can easily customize this app by:

1. Changing the color scheme - Modify CSS variables in `style.css`
2. Adding new features- Extend the JavaScript functionality
3. Modifying the layout - Adjust the HTML structure and CSS

 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/bhuvi6/classy-weather/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

 🙏 Acknowledgments

- [Open-Meteo](https://open-meteo.com/) for providing free weather API
- Inspiration from various weather applications


---

⭐️ If you found this project helpful, please give it a star!
```

## Additional Files for Your Repository

For a complete GitHub submission, you should also include:

1. **LICENSE** file (MIT License recommended)
2. **.gitignore** file (to exclude unnecessary files)
3. **assets folder** with icons and screenshots

### requirements.txt
```txt
# No external dependencies required
# This app uses pure HTML, CSS, JavaScript and the Open-Meteo API
# No build process or package installation needed
```

