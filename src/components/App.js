import React from 'react';
import styled from 'styled-components';
import Geocode from 'react-geocode';
import Result2 from './Result';
import NotFound from './NotFound';
import BigLabel from './BigLabel';

const WeatherWrapper = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  height: calc(100vh - 64px);
  width: 100%;
  position: relative;
`;

async function reverseGeocoding(GMapsAPIkey, value){
  Geocode.setApiKey(GMapsAPIkey);
  //Geocode.setLanguage("en");
  return new Promise((resolve, reject) => {
    Geocode.fromAddress(value).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        resolve({lat, lng})
      },
      error => {
        console.error(error);
      });
  });
}

class App extends React.Component {
  state = {
    value: '',
    value2: '',
    weatherInfo: null,
    error: false,
    values: []
  };

  handleInputChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSearchCity = e => {
    e.preventDefault();
    const { value } = this.state;
    const APIkey = process.env.REACT_APP_API_KEY;
    const GMapsAPIkey = process.env.REACT_APP_GMPAS_API_KEY;

    const weather = `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=${APIkey}&units=metric`;
    const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&APPID=${APIkey}&units=metric&cnt=8`;

    reverseGeocoding(GMapsAPIkey, value)
    .then(coordinates => {
      const dailyForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${APIkey}&units=metric`;
      Promise.all([fetch(weather), fetch(forecast), fetch(dailyForecast)])
      .then(([res1, res2, res3]) => {
        if (res1.ok && res2.ok && res3.ok) {
          return Promise.all([res1.json(), res2.json(), res3.json()]);
        }
        throw Error(res1.statusText, res2.statusText, res3.statusText);
      })
      .then(([data1, data2, data3]) => {
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'Nocvember',
          'December',
        ];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDate = new Date();
        const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
          months[currentDate.getMonth()]
        }`;
        const sunset = new Date(data1.sys.sunset * 1000).toLocaleTimeString().slice(0, 5);
        const sunrise = new Date(data1.sys.sunrise * 1000).toLocaleTimeString().slice(0, 5);

        const weatherInfo = {
          city: data1.name,
          country: data1.sys.country,
          date,
          description: data1.weather[0].description,
          main: data1.weather[0].main,
          temp: data1.main.temp,
          highestTemp: data1.main.temp_max,
          lowestTemp: data1.main.temp_min,
          sunrise,
          sunset,
          clouds: data1.clouds.all,
          humidity: data1.main.humidity,
          wind: data1.wind.speed,
          forecast: data2.list,
          dailyForecast: data3.daily.slice(1, 5),
        };
        this.setState({
          weatherInfo,
          error: false,
        });
      })
      .catch(error => {
        console.log(error);

        this.setState({
          error: true,
          weatherInfo: null,
        });
      });
    }
  )}
  
  componentDidMount(){
    var datesList = [];
    const n = 4;
    for (let i = 0; i <= n; i++) {
      var newDate = new Date(Date.now() + i * 24 * 60 * 60 * 1000)
      datesList.push(newDate);
    }
    this.setState({ values: [...datesList] });
  }
  
  createDates = () =>{
    var currentDate = new Date();
    
    this.setState({ ...this.state, values : currentDate });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  render() {
    const { value, weatherInfo, error } = this.state;
    return (
      <>
        <BigLabel>Travel Weather App</BigLabel>
        <WeatherWrapper>
        <Result2
            weather={weatherInfo}
            value={value}
            showResult={(weatherInfo || error) && true}
            submit={this.handleSearchCity}
            change={this.handleInputChange}
            reverseGeocoding={reverseGeocoding}
          />
          {error && <NotFound error={error} />}
        </WeatherWrapper>
      </>
    );
  }
}

export default App;