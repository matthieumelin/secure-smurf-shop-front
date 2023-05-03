import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styled from "styled-components";

import AppRoutes from "../../router/app.routes";

export default function Navbar({ setSidebarIsOpen }) {
  const user = useSelector((state) => state.user.data);

  return (
    <StyledNavbar>
      <NavbarLeft>
        <NavbarToggle onClick={() => setSidebarIsOpen(true)}>
          <NavbarToggleIcon
            src={`${process.env.PUBLIC_URL}/assets/icons/hamburger.svg`}
            alt="Navbar"
          />
        </NavbarToggle>
        <Link to={AppRoutes.Home}>
          <NavbarLogo
            src={`${process.env.PUBLIC_URL}/assets/images/logo_white.png`}
            alt={process.env.REACT_APP_NAME}
          />
        </Link>
      </NavbarLeft>
      {/* <NavbarCenter>
        <NavbarSearchInputContainer onClick={() => setInResearch(true)}>
          <NavbarSearchInputIcon
            src={`${process.env.PUBLIC_URL}/assets/icons/search.svg`}
            alt="Search"
          />
          <NavbarSearchInput
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            autoComplete="off"
          />
          <NavbarSearchContainer inResearch={inResearch}>
            <NavbarSearchSection>
              <NavbarSearchSectionTitle>
                Recent searches
              </NavbarSearchSectionTitle>
              <NavbarSearchSectionMenu>
                <NavbarSearchSectionMenuItem>
                  <NavbarSearchSectionMenuItemLink to={AppRoutes.Profile}>
                    <NavbarSearchSectionMenuItemLinkIcon
                      src={`${process.env.PUBLIC_URL}/assets/icons/clock.svg`}
                      alt="Recent"
                    />
                    Profile
                  </NavbarSearchSectionMenuItemLink>
                </NavbarSearchSectionMenuItem>
              </NavbarSearchSectionMenu>
            </NavbarSearchSection>
            <NavbarSearchSection>
              <NavbarSearchSectionTitle>Pages</NavbarSearchSectionTitle>
              <NavbarSearchSectionMenu>
                <NavbarSearchSectionMenuItem>
                  <NavbarSearchSectionMenuItemLink
                    to={AppRoutes.Orders}
                    onClick={(event) => onNavigate(event)}
                  >
                    <NavbarSearchSectionMenuItemLinkIcon
                      src={`${process.env.PUBLIC_URL}/assets/icons/clock.svg`}
                      alt="Recent"
                    />
                    Orders
                  </NavbarSearchSectionMenuItemLink>
                </NavbarSearchSectionMenuItem>
                <NavbarSearchSectionMenuItem>
                  <NavbarSearchSectionMenuItemLink
                    to={AppRoutes.Profile}
                    onClick={(event) => onNavigate(event)}
                  >
                    <NavbarSearchSectionMenuItemLinkIcon
                      src={`${process.env.PUBLIC_URL}/assets/icons/clock.svg`}
                      alt="Recent"
                    />
                    Profile
                  </NavbarSearchSectionMenuItemLink>
                </NavbarSearchSectionMenuItem>
              </NavbarSearchSectionMenu>
            </NavbarSearchSection>
          </NavbarSearchContainer>
        </NavbarSearchInputContainer>
      </NavbarCenter> */}
      <NavbarRight>
        {/* <NavbarButton type="button">
          <NavbarButtonIcon
            src={`${process.env.PUBLIC_URL}/assets/icons/bell.svg`}
            alt="Notifications"
          />
        </NavbarButton>
        <NavbarButton type="button">
          <NavbarButtonIcon
            src={`${process.env.PUBLIC_URL}/assets/icons/bubble.svg`}
            alt="Messages"
          />
        </NavbarButton> */}
        {user.permission.includes("admin") && (
          <NavbarButton type="admin" to={AppRoutes.AdminDashboard}>
            <NavbarButtonIcon
              src={`${process.env.PUBLIC_URL}/assets/icons/gear.svg`}
              alt="Admin dashboard"
            />
          </NavbarButton>
        )}
        <NavbarButton to={AppRoutes.Home}>
          <NavbarButtonIcon
            src={`${process.env.PUBLIC_URL}/assets/icons/add.svg`}
            alt="Store"
          />
        </NavbarButton>
      </NavbarRight>
    </StyledNavbar>
  );
}

const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  @media screen and (min-width: 1024px) {
    padding: 60px 60px 0 60px;
  }
`;
const NavbarLeft = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;
// const NavbarCenter = styled.div``;
// const NavbarSearchInputContainer = styled.div`
//   display: none;

//   @media screen and (min-width: 1024px) {
//     display: flex;
//     align-items: center;
//     background-color: ${Colors.primaryLowOp};
//     padding: 0.6rem 1rem;
//     border-radius: 20px;
//   }
// `;
// const NavbarSearchInputIcon = styled.img`
//   display: block;
// `;
// const NavbarSearchInput = styled.input`
//   display: none;

//   @media screen and (min-width: 1024px) {
//     display: block;
//     background-color: transparent;
//     outline: none;
//     color: white;
//     font-family: inherit;
//     font-size: inherit;
//     border: none;
//     margin: 0 0 0 10px;
//   }
// `;
// const NavbarSearchInputClear = styled.button``;
// const NavbarSearchContainer = styled.div`
//   position: absolute;
//   top: 120px;
//   background-color: ${Colors.primary};
//   padding: 30px;
//   border-radius: 20px;
//   opacity: ${(props) => (props.inResearch ? 1 : 0)};
// `;
// const NavbarSearchSection = styled.div``;
// const NavbarSearchSectionTitle = styled.p`
//   color: rgba(255, 255, 255, 0.7);
//   margin: 0;
// `;
// const NavbarSearchSectionMenu = styled.ul`
//   padding: 0;
//   margin: 10px 0 0 0;
//   list-style: none;
// `;
// const NavbarSearchSectionMenuItem = styled.li``;
// const NavbarSearchSectionMenuItemLink = styled(Link)`
//   display: flex;
//   align-items: center;
//   text-decoration: none;
//   color: white;
// `;
// const NavbarSearchSectionMenuItemLinkIcon = styled.img`
//   display: block;
//   margin: 0 10px 0 0;
// `;
const NavbarRight = styled.div`
  display: flex;
  align-items: center;
`;
const NavbarLogo = styled.img`
  display: block;
  width: 48px;
  height: 48px;
`;
const NavbarToggle = styled.button`
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: none;
  cursor: pointer;

  @media screen and (min-width: 1024px) {
    display: none;
  }
`;
const NavbarToggleIcon = styled.img`
  display: block;
`;
// const NavbarButton = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: ${Colors.primaryLowOp};
//   border: none;
//   border-radius: 15px;
//   padding: 10px;
//   margin: 0 10px 0 0;
//   transition: 0.2s;
//   cursor: pointer;

//   &:hover {
//     transition: 0.2s;
//     -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
//     -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
//     box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
//   }
// `;
// const NavbarButtonIcon = styled.img`
//   display: block;
//   height: 18px;
//   width: 18px;
// `;
const NavbarButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem;
  background-image: linear-gradient(
    147.16deg,
    #5a189a 13.82%,
    #7b2cbf 35.53%,
    #9d4edd 76.05%
  );
  border-radius: 100px;
  box-shadow: 0px 4px 34px rgb(157 78 221 / 40%);
  margin: 0 0 0 10px;

  ${(props) => {
    if (props.type === "admin") {
      return `
      background-image: linear-gradient(
        147.16deg,
        #d62828 13.82%,
        #A81D1D 35.53%,
        #8D1A1A 76.05%
      );
      box-shadow: 0px 4px 34px rgb(214 40 40 / 40%);
      `;
    }
  }}
`;
const NavbarButtonIcon = styled.img`
  display: block;
  width: 14px;
  height: 14px;
`;
