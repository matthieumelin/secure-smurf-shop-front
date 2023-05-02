import React from 'react'
import Gravatar from 'react-gravatar';

import styled from 'styled-components'

export default function Navbar({ title }) {
  return (
    <StyledNavbar>
      <NavbarLeft>
        <NavbarLeftTitle>{title}</NavbarLeftTitle>
      </NavbarLeft>
      <NavbarRight>
        <NavbarRightProfile>
          <NavbarRightProfileAvatar email='geeklegendofficiel@gmail.com' />
          <NavbarRightProfileInfos>
            <NavbarRightProfileInfosUsername>GeekLegend</NavbarRightProfileInfosUsername>
            <NavbarRightProfileInfosRank>Admin</NavbarRightProfileInfosRank>
          </NavbarRightProfileInfos>
        </NavbarRightProfile>
      </NavbarRight>
    </StyledNavbar>
  )
}

const StyledNavbar = styled.nav`
padding: 20px;
`;
const NavbarLeft = styled.div`
`;
const NavbarLeftTitle = styled.h2`
color: white;
margin: 0;
`;
const NavbarRight = styled.div`
`;
const NavbarRightProfile = styled.div`
display: flex;
align-items: center;
margin-top: 20px;
`;
const NavbarRightProfileAvatar = styled(Gravatar)`
width: 36px;
height: 36px;
display: block;
border-radius: 100px;
`;
const NavbarRightProfileInfos = styled.div`
margin-left: 10px;
`;
const NavbarRightProfileInfosUsername = styled.p`
color: white;
margin:0;
font-weight: 600;
`;
const NavbarRightProfileInfosRank = styled.p`
color: rgba(255,255,255,.7);
margin: 0;
font-size: 0.85rem;
`;