import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ForecastWrapper = styled.div`
  flex: 0 0 100px;
  margin: 10px;
`;

const WeatherIcon = styled.img`
  display: block;
  height: 50px;
  width: 50px;
  margin: 0 auto;
`;

const ForecastHour = props => {
  const { temp, month, day, hour, icon } = props;
  const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;

  return (
    <ForecastWrapper>
      <div align="center">{month}.{day}</div>
      <div align="center">{hour}:00</div>
      <WeatherIcon src={iconUrl} />
      <div align="center">{temp}&#176;</div>
    </ForecastWrapper>
  );
};

ForecastHour.propTypes = {
  temp: PropTypes.number.isRequired,
  month: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  hour: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
};

export default ForecastHour;
