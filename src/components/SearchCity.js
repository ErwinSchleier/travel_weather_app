import React from 'react';
import styled from 'styled-components';
import device from '../responsive/Device';

const SearchInput = styled.input`
  border: none;
  background-color: #ffffff;
  font-size: 13px;
  padding: 10px 15px 10px 40px;
  transition: 0.2s;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  &:focus {
    color: #191919;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    outline: none;
  }
  @media ${device.tablet} {
    font-size: 13px;
  }
  @media ${device.laptop} {
    padding: 15px 20px 15px 45px;
    border-radius: 30px;
  }
`;

const SearchCity = props => {
  return (
    <>
        <form onSubmit={props.submit}>
            <SearchInput value={props.value} placeholder="Enter place" onChange={props.change}/>
        </form>
    </>
  );
};

export default SearchCity;
