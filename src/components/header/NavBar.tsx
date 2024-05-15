import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import AppName from "./AppName";
import SearchBox from "./SearchBox";

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

interface NavBarProps {
  setSearchQuery: (query: string) => void;
}

const NavBar: React.FC = () => {
  return (
    <NavBarContainer>
      <Logo />
      <AppName />
      <SearchBox />
    </NavBarContainer>
  );
};

export default NavBar;
