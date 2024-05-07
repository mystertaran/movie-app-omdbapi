import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useStore from '../../store';

const AppNameContainer = styled(Link)`
    font-size: 24px;
    font-weight: 700;
    color: #fff;
    text-decoration: none;
`



const AppName: React.FC = () => {
  const setCurrentPage = useStore(state => state.setCurrentPage);

  const handleClick = () => {
    setCurrentPage(1);
  }

  return (
    <AppNameContainer to="/" onClick={handleClick}>
      FutureMind Movie APP
    </AppNameContainer>
  )
}

export default AppName;
