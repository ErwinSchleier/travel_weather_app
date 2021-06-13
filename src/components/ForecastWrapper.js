import React, {useState} from 'react';
import styled from 'styled-components';
import device from '../responsive/Device';
import SearchCity from './SearchCity';

const ForecastWrapper = styled.div`
  flex: 1 1 100%;  
  margin: 10px;
  padding: 20px 20px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  @media ${device.tablet} {
    flex: 0 0 45%;
  }
  @media ${device.laptopL} {
    flex: 0 0 20%;
  }
`;

const Content = styled.div`
  text-align: center;
  margin: 10px;
`;

const WeatherIcon = styled.img`
  display: block;
  height: 50px;
  width: 50px;
  margin: 0 auto;
`;

const ForecastDay = (props) => {

  const [value, setValue] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [datePosition, setDatePosition] = useState(props.datePosition);
  const [weatherIcon, setWeatherIcon] = useState(null)

  const handleInputChange = e => {
    setValue(
      e.target.value,
    );
  };

  const handleForecastSearch = e => {
    e.preventDefault();
    const APIkey = process.env.REACT_APP_API_KEY;
    const GMapsAPIkey = process.env.REACT_APP_GMPAS_API_KEY;

    props.reverseGeocoding(GMapsAPIkey, value)
    .then(coordinates => {
      const dailyForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${APIkey}&units=metric`;
      fetch(dailyForecast)
      .then(res => {
        return res.json();
      })
      .then((data) => {
        setWeatherData(data.daily[datePosition]);
        setWeatherIcon(`https://openweathermap.org/img/w/${data.daily[datePosition].weather[0].icon}.png`);
      })
      .catch(error => {
        console.log(error);
      });
    }
  )}    

  return (
      <ForecastWrapper>
        <Content>
          {props.createDate(datePosition)}
        </Content>
        <Content>
          <SearchCity 
            submit={handleForecastSearch}
            value={value}
            change={handleInputChange}
          />
        </Content>
      { weatherData && <div>
        <Content>{value}</Content>
        <WeatherIcon src={weatherIcon} />
        <Content>{weatherData.temp.day}°</Content>
      </div>}
      </ForecastWrapper>
  );
};

export default ForecastDay;