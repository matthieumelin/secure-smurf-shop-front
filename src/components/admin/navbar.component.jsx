import React from 'react'
import { useSelector } from 'react-redux';
import Gravatar from 'react-gravatar';

import styled from 'styled-components'

import Colors from '../../utils/colors.util';
import AppRoutes from '../../router/app.routes';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  // Redux
  const userData = useSelector((state) => state.user.data);

  return (
    <StyledNavbar>
      <NavbarBack to={AppRoutes.Home}>
        <NavbarBackIcon src={`${process.env.PUBLIC_URL}/assets/icons/back.svg`} alt="Back" /> Back to website
      </NavbarBack>
      <NavbarRight>
        <NavbarRightProfile>
          <NavbarRightProfileInfos>
            <NavbarRightProfileInfosUsername>{userData.username}</NavbarRightProfileInfosUsername>
          </NavbarRightProfileInfos>
          <NavbarRightProfileAvatar email={userData.email} />
        </NavbarRightProfile>
      </NavbarRight>
    </StyledNavbar>
  )
}

const StyledNavbar = styled.nav`
padding: 0 20px;

@media screen and (min-width: 1024px) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: ${Colors.primary};
}
`;
const NavbarBack = styled(NavLink)`
display: flex;
align-items: center;
color: white;
text-decoration: none;
margin-bottom: 20px;
`;
const NavbarBackIcon = styled.img`
display: block;dd
width: 28px;
height: 28px;
border: 1px solid white;
border-radius: 20px;
padding: 3px;
margin-right: 10px;
`;
const NavbarRight = styled.div`
`;
const NavbarRightProfile = styled.div`
display: flex;
align-items: center;

@media screen and (min-width: 1024px) {
  margin-top: 0;
}
`;
const NavbarRightProfileAvatar = styled(Gravatar)`
width: 36px;
height: 36px;
display: block;
border-radius: 100px;
`;
const NavbarRightProfileInfos = styled.div`
margin-right: 10px;
`;
const NavbarRightProfileInfosUsername = styled.p`
margin:0;
color: white;
`;