import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import AppRoutes from "../router/app.routes";

import Navbar from "./navbar.component";

import Button from "./utils/button.component";

export default function Header() {
  return (
    <StyledHeader>
      <HeaderVideoBackground />
      <HeaderVideo autoPlay loop muted>
        <HeaderVideoSource
          src={`${process.env.PUBLIC_URL}/assets/videos/header.mp4`}
          type="video/mp4"
        />
      </HeaderVideo>
      <Navbar />
      <HeaderContent>
        <HeaderWrapper>
          <HeaderTitle>Secure Smurf Shop</HeaderTitle>
          <HeaderDescription>
            Level 30 Smurf accounts for League with high amounts of Blue
            Essence. Full access, clean ranked history. Accounts are delivered
            instantly 24/7.
          </HeaderDescription>
          <HeaderButtons>
            <Link to={AppRoutes.Store}>
              <Button title={"Buy account"} type={"submit"} />
            </Link>
            <Button title={"Buy LoL Scripts"} type={"submit"} />
          </HeaderButtons>
        </HeaderWrapper>
        <HeaderImage
          src={`${process.env.PUBLIC_URL}/assets/images/header_avatar.png`}
          alt="Secure Smurf Shop"
        />
      </HeaderContent>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  position: relative;
`;
const HeaderVideoBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  z-index: -998;
`;
const HeaderVideo = styled.video`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
  z-index: -999;
`;
const HeaderVideoSource = styled.source``;
const HeaderContent = styled.div`
  padding: 20px 20px 40px 20px;
  @media screen and (min-width: 1024px) {
    padding: 11rem 7rem;
    display: flex;
    align-items: center;
    position: relative;
  }
`;
const HeaderWrapper = styled.div``;
const HeaderTitle = styled.h2`
  margin: 0;
  color: white;

  @media screen and (min-width: 1024px) {
    font-size: 2.5rem;
    max-width: 768px;
  }
`;
const HeaderDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);

  @media screen and (min-width: 1024px) {
    font-size: 1.2rem;
    max-width: 768px;
  }
`;
const HeaderButtons = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, max-content);
`;
const HeaderImage = styled.img`
  display: none;

  @media screen and (min-width: 1024px) {
    display: block;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: -998;
  }
`;
