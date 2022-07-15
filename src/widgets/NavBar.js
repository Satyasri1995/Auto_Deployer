import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Ripple } from "primereact/ripple";
import { Menu } from "primereact/menu";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProjectStateActions } from "../store/slices/projects";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

const StyledTitle = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  padding: 1rem;
  font-family: verdana;
`;

const NavBar = (props) => {
  const dispatch = useDispatch();
  const [displayCategory, setDisplayCategory] = useState(false);
  const projects = useSelector((state) => state.data.projects);
  const category = useSelector((state) => state.data.category);
  const categories = useSelector((state) => {
    const options = state.data.categories.map((item) => {
      return { label: item, value: item };
    });
    return [{ label: "Every", value: "*" }, ...options];
  });
  const currentPage = useSelector((state) => state.data.currentPage);

  const menuRef = useRef(null);

  const items = [
    {
      label: "New Project",
      icon: "pi pi-fw pi-plus",
      command: (e) => {
        dispatch(ProjectStateActions.redirectTo("/edit"));
      },
    },
    {
      label: "Change Category",
      icon: "pi pi-filter",
      command: () => {
        setDisplayCategory(true);
      },
    }
  ];

  const renderFooter = () => {
    return (
      <div>
        <Button
          label="Discard"
          icon="pi pi-times"
          onClick={() => {
            setDisplayCategory(false);
          }}
          className="p-button-text"
        />
        <Button
          label="Apply"
          icon="pi pi-check"
          onClick={() => {
            setDisplayCategory(false);
            dispatch(ProjectStateActions.filterByCategories(category));
          }}
          className="p-button-text"
          autoFocus
        />
      </div>
    );
  };

  return (
    <header className="flex flex-row align-items-center h-3rem bg-blue-500 text-white">
      <Dialog
        header="Change Category"
        visible={displayCategory}
        footer={renderFooter()}
        onHide={() => setDisplayCategory(false)}
      >
        <div className="field">
          <label htmlFor="category" className="block text-sm">
            Select Category
          </label>
          <Dropdown
            className="w-full"
            value={category}
            options={categories}
            onChange={(e) => {
              dispatch(ProjectStateActions.setCategory(e.value));
            }}
            placeholder="Select a City"
          />
        </div>
      </Dialog>
      <StyledTitle to="/">
        <Ripple />
        Auto Deployer
      </StyledTitle>
      <span className="flex-auto"></span>
      <Menu model={items} popup ref={menuRef} id="popup_menu" />
      {currentPage === "/" ? (
        <i
          className="pi pi-cog p-3 text-base cursor-pointer p-ripple"
          onClick={(e) => menuRef.current.toggle(e)}
        >
          <Ripple />
        </i>
      ) : (
        <i
          className="pi pi-times p-3 text-base cursor-pointer p-ripple"
          onClick={(e) => dispatch(ProjectStateActions.redirectTo("/"))}
        >
          <Ripple />
        </i>
      )}
    </header>
  );
};

export default NavBar;
