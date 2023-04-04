import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import Colors from "../utils/colors.util";

import AppRoutes from "../router/app.routes";

export default function Footer() {
  return (
    <StyledFooter>
      <FooterContent>
        <FooterWrapper>
          <FooterInfos>
            <Link to={AppRoutes.Home}>
              <FooterBrand
                src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
                alt={process.env.REACT_APP_NAME}
              />
            </Link>
            <FooterName>Buy LoL Smurf Accounts</FooterName>
            <FooterSocials>
              <FooterSocialsItem>
                <FooterSocialsItemLink to={AppRoutes.Home}>
                  <FooterSocialsItemLinkIcon
                    src={`${process.env.PUBLIC_URL}/assets/icons/twitter.svg`}
                    alt="Twitter"
                  />
                </FooterSocialsItemLink>
              </FooterSocialsItem>
              <FooterSocialsItem>
                <FooterSocialsItemLink to={AppRoutes.Home}>
                  <FooterSocialsItemLinkIcon
                    src={`${process.env.PUBLIC_URL}/assets/icons/instagram.svg`}
                    alt="Instagram"
                  />
                </FooterSocialsItemLink>
              </FooterSocialsItem>
              <FooterSocialsItem>
                <FooterSocialsItemLink to={AppRoutes.Home}>
                  <FooterSocialsItemLinkIcon
                    src={`${process.env.PUBLIC_URL}/assets/icons/facebook.svg`}
                    alt="Facebook"
                  />
                </FooterSocialsItemLink>
              </FooterSocialsItem>
            </FooterSocials>
          </FooterInfos>
          <FooterSections>
            <FooterSection>
              <FooterSectionTitle>Marketplace</FooterSectionTitle>
              <FooterSectionLinks>
                <FooterSectionLinksItem>
                  <FooterSectionLinksItemLink to={AppRoutes.Home}>
                    EUW LoL Smurf
                  </FooterSectionLinksItemLink>
                </FooterSectionLinksItem>
                <FooterSectionLinksItem>
                  <FooterSectionLinksItemLink to={AppRoutes.Home}>
                    EUNE LoL Smurf
                  </FooterSectionLinksItemLink>
                </FooterSectionLinksItem>
                <FooterSectionLinksItem>
                  <FooterSectionLinksItemLink to={AppRoutes.Home}>
                    NA LoL Smurf
                  </FooterSectionLinksItemLink>
                </FooterSectionLinksItem>
              </FooterSectionLinks>
            </FooterSection>
            <FooterSection>
              <FooterSectionTitle>Support</FooterSectionTitle>
              <FooterSectionLinks>
                <FooterSectionLinksItem>
                  <FooterSectionLinksItemLink to={AppRoutes.Contact}>
                    Contact Us
                  </FooterSectionLinksItemLink>
                </FooterSectionLinksItem>
                <FooterSectionLinksItem>
                  <FooterSectionLinksItemLink to={AppRoutes.Home}>
                    Discord
                  </FooterSectionLinksItemLink>
                </FooterSectionLinksItem>
              </FooterSectionLinks>
            </FooterSection>
            <FooterSection>
              <FooterSectionTitle>Legal</FooterSectionTitle>
              <FooterSectionLinks>
                <FooterSectionLinksItem>
                  <FooterSectionLinksItemLink to={AppRoutes.ToS}>
                    Terms of Service
                  </FooterSectionLinksItemLink>
                </FooterSectionLinksItem>
              </FooterSectionLinks>
            </FooterSection>
          </FooterSections>
        </FooterWrapper>
        <FooterCopyright>
          LoLsmurf.fr isn't endorsed by Riot Games and doesn't reflect the views
          or opinions of Riot Games or anyone officialy involved in producing or
          managing League of Legends. League of Legends and Riot Games are
          trademarks or registered trademarks of Riot Games , Inc. League of
          Legends &copy; Riot Games, Inc.
        </FooterCopyright>
      </FooterContent>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  padding: 20px;
  background-color: ${Colors.gray};
    padding: 20px 0;
  }
`;
const FooterContent = styled.div`
  width: 90%;
  margin: 0 auto;
`;
const FooterInfos = styled.div`
  @media screen and (min-width: 1024px) {
    max-width: 400px;
  }
`;
const FooterSocials = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 45px);
  list-style: none;
  padding: 0;
`;
const FooterSocialsItem = styled.li`
  background-color: ${Colors.primaryLowOp};
  border-radius: 100px;
  padding: 8px;
  height: 40px;
  width: 40px;
  &:hover {
    cursor: pointer;
  }
`;
const FooterSocialsItemLink = styled(Link)``;
const FooterSocialsItemLinkIcon = styled.img`
  display: block;
  width: 24px;
  height: 24px;

  ${FooterSocialsItem}:hover & {
    filter: invert(54%) sepia(66%) saturate(6362%) hue-rotate(250deg)
      brightness(91%) contrast(90%);
  }
`;
const FooterWrapper = styled.div`
  @media screen and (min-width: 1024px) {
    display: flex;
  }
`;
const FooterBrand = styled.img`
  display: block;
  height: 60px;
  width: 60px;
`;
const FooterName = styled.h2`
  color: white;
  max-width: 180px;
`;
const FooterSections = styled.div`
  @media screen and (min-width: 1024px) {
    margin: auto;
    display: flex;
  }
`;
const FooterSection = styled.section`
  @media screen and (min-width: 1024px) {
    width: 200px;
  }
`;
const FooterSectionTitle = styled.h3`
  color: ${Colors.primary};

  @media screen and (min-width: 1024px) {
    margin: 0;
  }
`;
const FooterSectionLinks = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;
const FooterSectionLinksItem = styled.li``;
const FooterSectionLinksItemLink = styled(Link)`
  color: white;
  text-decoration: none;
  transition: 0.2s;

  &:hover {
    transition: 0.2s;
    color: ${Colors.primary};
  }
`;
const FooterCopyright = styled.p`
  color: white;
  margin: 20px 0 0 0;
  padding: 20px;
  border-radius: 10px;
  background-color: ${Colors.primaryLowOp};

  @media screen and (min-width: 1024px) {
    text-align: center;
  }
`;
