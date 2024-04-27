import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const AppNameContainer = styled(Link)`
    font-size: 24px;
    font-weight: 700;
    color: #fff;
    text-decoration: none;
`



const AppName = () => {
  return (
    <AppNameContainer to="/">
      FutureMind Movie APP
    </AppNameContainer>
  )
}

export default AppName;
