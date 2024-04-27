import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LogoContainer = styled(Link)`
    width: 200px;
    height: 100px;
    background-image: url('https://www.futuremind.com/s/a277ba804c2e/images/company-name-white.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;  
`


const Logo = () => {
  return (
    <LogoContainer to="/" />
  )
}

export default Logo
