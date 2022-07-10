import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Ripple } from "primereact/ripple";
import { Menu } from "primereact/menu";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { ProjectStateActions } from "../store/slices/projects";

const StyledTitle = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  padding: 1rem;
  font-family: verdana;
`;



const NavBar = (props) => {

  const dispatch = useDispatch();

  const menuRef = useRef(null);

  const items = [
    { label: "New Project", icon: "pi pi-fw pi-plus",command:(e)=>{
      dispatch(ProjectStateActions.redirectTo("/edit"));
    } },
    { label: "Build All", icon: "pi pi-fw pi-play" },
    { label: "Deploy All", icon: "pi pi-fw pi-inbox" }
  ];

  return (
    <header className="flex flex-row align-items-center h-3rem bg-blue-500 text-white">
      <StyledTitle to="/">
        <Ripple />
        Auto Deployer
      </StyledTitle>
      <span className="flex-auto"></span>
      <Menu model={items} popup ref={menuRef} id="popup_menu" />
      <i
        className="pi pi-cog p-3 text-base cursor-pointer p-ripple"
        onClick={(e) => menuRef.current.toggle(e)}
      >
        <Ripple />
      </i>
    </header>
  );
};

export default NavBar;
