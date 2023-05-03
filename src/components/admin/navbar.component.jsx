import React from 'react'
import Gravatar from 'react-gravatar';

import styled from 'styled-components'
import Colors from '../../utils/colors.util';

export default function Navbar() {
  return (
    <StyledNavbar>
      <NavbarRight>
        <NavbarRightProfile>
          <NavbarRightProfileInfos>
            <NavbarRightProfileInfosUsername>GeekLegend</NavbarRightProfileInfosUsername>
          </NavbarRightProfileInfos>
          <NavbarRightProfileAvatar email='geeklegendofficiel@gmail.com' />
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
  justify-content: flex-end;
  padding: 10px 20px;
  background-color: ${Colors.primary};
}
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