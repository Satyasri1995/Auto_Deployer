import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Ripple } from "primereact/ripple";

const StyledTitle = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  padding: 1rem;
  font-family: verdana;
`;

const NavBar = (props) => {
  return (
    <header className="flex flex-row align-items-center h-3rem bg-blue-500 text-white">
      <StyledTitle to="/">
        <Ripple/>Auto Deployer
      </StyledTitle>
      <span className="flex-auto"></span>
      <i className="pi pi-cog p-3 text-base cursor-pointer p-ripple">
        <Ripple />
      </i>
    </header>
  );
};

export default NavBar;
