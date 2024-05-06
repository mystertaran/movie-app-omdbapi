import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useStore from '../../store';

const LogoContainer = styled(Link)`
    width: 200px;
    height: 100px;
    background-image: url('https://www.futuremind.com/s/a277ba804c2e/images/company-name-white.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;  
`


const Logo = () => {
  const setCurrentPage = useStore(state => state.setCurrentPage);

  const handleClick = () => {
    setCurrentPage(1);
  }


  return (
    <LogoContainer to="/" onClick={handleClick}/>
  )
}

export default Logo
