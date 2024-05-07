import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import AppName from "./AppName";
import SearchBox from "./SearchBox.tsx";

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const NavBar = ({setSearchQuery}) => {
  return (
    <NavBarContainer>
      <Logo />
      <AppName />
      <SearchBox setSearchQuery={setSearchQuery}/>
    </NavBarContainer>
  );
};

export default NavBar;
