import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";

import Button from "./utils/button.component";

import Colors from "../utils/colors.util";

import AppRoutes from "../router/app.routes";

export default function Navbar() {
  const [mobileNavbarIsOpen, setMobileNavbarIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos =
        window.pageYOffset || document.documentElement.scrollTop;
      setPrevScrollPos(currentScrollPos);
    };

    const handleResize = () => {
      const height = Math.max(
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      setDocumentHeight(height);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <StyledNavbar>
      <MobileNavbar mobileNavbarIsOpen={mobileNavbarIsOpen}>
        <MobileNavbarWrapper>
          <NavLink to={AppRoutes.Home}>
            <MobileNavbarBrand
              src={`${process.env.PUBLIC_URL}/assets/images/logo_white.png`}
              alt="Secure Smurf Shop"
            />
          </NavLink>
          <MobileNavbarRight>
            <MobileNavbarRightToggle
              onClick={() => setMobileNavbarIsOpen(!mobileNavbarIsOpen)}
            />
          </MobileNavbarRight>
        </MobileNavbarWrapper>
        <MobileNavbarContent mobileNavbarIsOpen={mobileNavbarIsOpen}>
          <MobileNavbarMenus>
            <MobileNavbarMenu>
              <MobileNavbarMenuTitle>Services</MobileNavbarMenuTitle>
              <MobileNavbarMenuItem>
                <MobileNavbarMenuItemLink to={AppRoutes.Home}>
                  <MobileNavbarMenuItemLinkIcon
                    src={`${process.env.PUBLIC_URL}/assets/icons/lol.png`}
                    alt="LoL Smurfs"
                  />{" "}
                  LoL Smurfs
                </MobileNavbarMenuItemLink>
              </MobileNavbarMenuItem>
            </MobileNavbarMenu>
            <MobileNavbarMenu>
              <MobileNavbarMenuTitle>Other</MobileNavbarMenuTitle>
              <MobileNavbarMenuItem>
                <MobileNavbarMenuItemLink to={AppRoutes.Home}>
                  Support
                </MobileNavbarMenuItemLink>
              </MobileNavbarMenuItem>
            </MobileNavbarMenu>
          </MobileNavbarMenus>
          <NavLink to={AppRoutes.ClientArea}>
            <Button title={"Client Area"} />
          </NavLink>
        </MobileNavbarContent>
      </MobileNavbar>
      <DesktopNavbar id="navbar" className={prevScrollPos >= (documentHeight / 2) ? 'scroll-mid' : "scroll-end"}>
        <DesktopNavbarWrapper>
          <DesktopNavbarLeft>
            <NavLink to={AppRoutes.Home}>
              <DesktopNavbarBrand
                src={`${process.env.PUBLIC_URL}/assets/images/logo_white.png`}
                alt="Secure Smurf Shop"
              />
            </NavLink>
          </DesktopNavbarLeft>
          <DesktopNavbarCenter>
            <DesktopNavbarMenu>
              <DesktopNavbarMenuItem>
                <DesktopNavbarMenuItemLink to={AppRoutes.Home}>
                  Home
                </DesktopNavbarMenuItemLink>
              </DesktopNavbarMenuItem>
              <DesktopNavbarMenuItem>
                <DesktopNavbarMenuItemLink to={AppRoutes.Contact}>
                  Contact
                </DesktopNavbarMenuItemLink>
              </DesktopNavbarMenuItem>
              <DesktopNavbarMenuItem>
                <DesktopNavbarMenuItemLink to={AppRoutes.Home}>
                  Buy LoL Scripts
                </DesktopNavbarMenuItemLink>
              </DesktopNavbarMenuItem>
            </DesktopNavbarMenu>
          </DesktopNavbarCenter>
          <DesktopNavbarRight>
            <NavLink to={AppRoutes.ClientArea}>
              <Button title="Client Area" />
            </NavLink>
          </DesktopNavbarRight>
        </DesktopNavbarWrapper>
      </DesktopNavbar>
    </StyledNavbar>
  );
}

const StyledNavbar = styled.nav`
`;
const MobileNavbar = styled.div`
  @media screen and (min-width: 1024px) {
    display: none;
  }
  ${(props) => {
    if (props.mobileNavbarIsOpen) {
      return `
    &::before {
      content: "";
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0,0,0,0.5);
    }
    `;
    }
  }}
`;
const MobileNavbarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 0 20px;
`;
const MobileNavbarContent = styled.div`
  z-index: 999;
  background-color: ${Colors.lightGray};
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  -webkit-transition: max-width 0.5s, padding 0.3s, opacity 0.2s ease;
  -moz-transition: max-width 0.5s, padding 0.3s, opacity 0.2s ease;
  -ms-transition: max-width 0.5s, padding 0.3s, opacity 0.2s ease;
  -o-transition: max-width 0.5s, padding 0.3s, opacity 0.2s ease;
  transition: max-width 0.5s, padding 0.3s, opacity 0.2s ease;
  overflow: hidden;
  max-width: 0px;
  padding: 0;
  opacity: 0;

  ${(props) => {
    if (props.mobileNavbarIsOpen) {
      return `
      opacity: 1;
      overflow: hidden;
      white-space: nowrap;
      max-width: 320px;
      transition: max-width 0.5s, padding 0.3s, opacity 0.2s ease;
      padding: 0 40px;
      box-shadow: 0px 0px 30px rgb(0 0 0 / 50%);
      `;
    }
  }}
`;
const MobileNavbarMenus = styled.div``;
const MobileNavbarMenu = styled.ul`
  list-style: none;
  padding: 0;
`;
const MobileNavbarMenuTitle = styled.h1`
  color: white;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.9rem;
`;
const MobileNavbarMenuItem = styled.li``;
const MobileNavbarMenuItemLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  transition: 0.2s;

  &:hover {
    transition: 0.2s;
    color: ${Colors.primary};
  }
`;
const MobileNavbarMenuItemLinkIcon = styled.img`
  display: block;
  width: 24px;
  height: 24px;
  margin: 0 10px 0 0;
`;
const MobileNavbarBrand = styled.img`
  display: block;
  height: 60px;
  width: 60px;
`;
const MobileNavbarRight = styled.div`
  display: flex;
  align-items: center;
  z-index: 999;
`;
const MobileNavbarRightToggle = styled.div`
  background-color: white;
  width: 25px;
  height: 2px;
  position: relative;
  border-radius: 5px;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: -6px;
    background-color: inherit;
    width: 25px;
    height: 2px;
    border-radius: 5px;
  }
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 6px;
    background-color: inherit;
    width: 25px;
    height: 2px;
    border-radius: 5px;
  }
  &:hover {
    cursor: pointer;
  }
`;
const DesktopNavbar = styled.div`
  display: none;

  @media screen and (min-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px 0 20px;
    position: relative;

    &.scroll-mid {
      position: fixed;
      left: 0;
      right: 0;
      top: -100px;
      background-color: ${Colors.gray};
      z-index: 999;
      padding: 10px 20px;
      box-shadow: 10px 10px 60px rgb(0 0 0 / 50%);
      animation: fadeInAnimation 0.5s ease-in forwards;
    }

    &.scroll-end {
      position: relative;
      top: 0;
      animation: fadeOutAnimation 0.5s ease-out forwards;
    }

    @keyframes fadeInAnimation {
      0% {
        top: -100px;
      }
      100% {
        top: 0;
      }
    }

    @keyframes fadeOutAnimation {
      0% {
        top: 10px;
      }
      100% {
        top: 0;
      }
    }
  }
`;
const DesktopNavbarWrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
max-width: 90%;
width: 100%;
margin: 0 auto;
`;
const DesktopNavbarBrand = styled.img`
  @media screen and (min-width: 1024px) {
    display: block;
    height: 60px;
    width: 60px;
  }
`;
const DesktopNavbarMenu = styled.ul`
  @media screen and (min-width: 1024px) {
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
  }
`;
const DesktopNavbarMenuItem = styled.li`
  @media screen and (min-width: 1024px) {
    margin: 0 20px 0 0;
  }
`;
const DesktopNavbarMenuItemLink = styled(NavLink)`
  @media screen and (min-width: 1024px) {
    color: white;
    text-decoration: none;
    font-weight: bold;
    &:hover {
      padding-bottom: 5px;
      border-bottom: 2px solid ${Colors.primary};
    }
  }
`;
const DesktopNavbarLeft = styled.div``;
const DesktopNavbarCenter = styled.div`
`;
const DesktopNavbarRight = styled.div``;
