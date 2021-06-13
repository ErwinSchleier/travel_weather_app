import React from 'react';
import './Result.sass';
import styled from 'styled-components';
import device from '../responsive/Device';
import DailyForecasts from './DailyForecasts';
import ForecastDay from './ForecastWrapper';
import SearchCity from './SearchCity';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 40px 20px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  position: relative;
  top: 20px;
  margin: 20px;
  @media ${device.mobileL} {
    justify-content: space-between;
  }
`;
const HeaderElement = styled.div`
  flex: 0 1 auto;
  margin: 10px;
  
`;

const Content = styled.div`
  display: flex;
  flex-basis: 100%;
  justify-content: space-between;
  margin: 20px;
`;

const ForecastContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  padding: 40px 0;
  border-radius: 10px;
  position: relative;
  margin: 20px;
  @media ${device.tablet} {
    flex-wrap: wrap;
  }
`;

const Result2 = (props) => {

  const createDate = datePosition => {
    const today = new Date();
    today.setDate(today.getDate() + datePosition);
    return today.toDateString();
  }

  return (
    <div>
      <Container>
        <HeaderElement>{createDate(0)}</HeaderElement>
        <SearchCity 
            submit={props.submit}
            value={props.value}
            change={props.change}
          />
        <div></div>        
        {props.weather &&
          <Content>
            <div>
              {props.weather.city}
            </div>
            <div>
              {props.weather.temp}°
            </div>
          </Content>}
        {props.weather &&
          <DailyForecasts
          forecast={props.weather.forecast}
        />}
      </Container>
      <ForecastContainer>
        <ForecastDay
          reverseGeocoding={props.reverseGeocoding}
          datePosition={1}
          createDate={createDate}
        />
        <ForecastDay
          reverseGeocoding={props.reverseGeocoding}
          datePosition={2}
          createDate={createDate}
        />
        <ForecastDay
          reverseGeocoding={props.reverseGeocoding}
          datePosition={3}
          createDate={createDate}
        />
        <ForecastDay
          reverseGeocoding={props.reverseGeocoding}
          datePosition={4}
          createDate={createDate}
        />
      </ForecastContainer>
    </div>
  );
};

export default Result2;

/*

*/