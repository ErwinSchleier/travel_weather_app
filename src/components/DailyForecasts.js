import React from 'react';
import './Result.sass';
import styled from 'styled-components';
import ForecastHour from './ForecastHour';

const DetailsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: space-between;
  overflow-x: auto;
`;

const DailyForecasts = (props) => {

  const items = props.forecast.map(item => (
    <ForecastHour
      key={item.dt}
      temp={Math.floor(item.main.temp * 1) / 1}
      icon={item.weather[0].icon}
      month={item.dt_txt.slice(5, 7)}
      day={item.dt_txt.slice(8, 10)}
      hour={item.dt_txt.slice(11, 13) * 1}
    />
  ))

  return (
    <DetailsContainer>
      {items}
    </DetailsContainer>
  )
};

export default DailyForecasts; 