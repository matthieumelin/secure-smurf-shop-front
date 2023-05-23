import React from "react";

import styled from "styled-components";

import Colors from "../utils/colors.util";

export default function HeroBanner() {
  return (
    <StyledHeroBanner>
      <HeroBannerContent>
        <HeroBannerWrapper>
          <HeroBannerIcon
            src={`${process.env.PUBLIC_URL}/images/shield_icon.svg`}
            alt="Guarantee"
          />
          <HeroBannerTitle>Life-time guarantee</HeroBannerTitle>
        </HeroBannerWrapper>
        <HeroBannerDescription>
          Our lifetime guarantee on hand-leveled accounts provides you <HeroBannerBreak /> with a
          new LoL account, if your account is banned through any defect of our
          own.
        </HeroBannerDescription>
      </HeroBannerContent>
    </StyledHeroBanner>
  );
}

const StyledHeroBanner = styled.div`
  background-color: ${Colors.lightGray};
  padding: 20px;
  margin: 30px 0 0 0;

  @media screen and (min-width: 1024px) {
    padding: 40px 0;
  }
`;
const HeroBannerContent = styled.div`
  @media screen and (min-width: 1024px) {
    max-width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const HeroBannerBreak = styled.br``;
const HeroBannerWrapper = styled.div`
@media screen and (min-width: 1024px) {
  display: flex;
  align-items: center;
}
`;
const HeroBannerIcon = styled.img`
  display: block;
  margin: 20px auto 0 auto;

  @media screen and (min-width: 1024px) {
    margin: 0 20px 0 0;
  }
`;
const HeroBannerTitle = styled.h2`
  margin: 20px 0 0 0;
  text-align: center;
  color: white;

  @media screen and (min-width: 1024px) {
    margin: 0;
    font-size: 2.25rem;
    max-width: 36rem;
  }
`;
const HeroBannerDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  font-weight: 700;

  @media screen and (min-width: 1024px) {
    text-align: left;
    font-size: 1.25rem;
    max-width: 50%;
  }
`;
