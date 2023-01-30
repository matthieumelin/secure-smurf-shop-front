import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import Colors from "../utils/colors.util";

export default function Footer() {
  return (
    <StyledFooter>
      <FooterContent>
        <FooterWrapper>
          <FooterInfos>
            <FooterBrand>Secure Smurf Shop</FooterBrand>
            <FooterDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
              consequatur quam mollitia, ducimus iusto nobis aut illum nostrum
              aperiam minus placeat itaque sit? Repellat, ratione repudiandae
              iste dolor porro libero?
            </FooterDescription>
          </FooterInfos>
          <FooterSections>
            <FooterSection>
              <FooterSectionTitle>Legal</FooterSectionTitle>
              <FooterSectionLinks>
                <FooterSectionLinksItem>
                  <FooterSectionLinksItemLink>
                    Terms of use
                  </FooterSectionLinksItemLink>
                </FooterSectionLinksItem>
                <FooterSectionLinksItem>
                  <FooterSectionLinksItemLink>
                    Privacy policy
                  </FooterSectionLinksItemLink>
                </FooterSectionLinksItem>
                <FooterSectionLinksItem>
                  <FooterSectionLinksItemLink>
                    DMCA Notice
                  </FooterSectionLinksItemLink>
                </FooterSectionLinksItem>
                <FooterSectionLinksItem>
                  <FooterSectionLinksItemLink>
                    Partnership
                  </FooterSectionLinksItemLink>
                </FooterSectionLinksItem>
                <FooterSectionLinksItem>
                  <FooterSectionLinksItemLink>
                    Newsletter
                  </FooterSectionLinksItemLink>
                </FooterSectionLinksItem>
              </FooterSectionLinks>
            </FooterSection>
          </FooterSections>
        </FooterWrapper>
        <FooterCopyright>
          &copy;{" "}
          <FooterCopyrightSpan>
            {new Date().getFullYear()} Secure Smurf Shop
          </FooterCopyrightSpan>{" "}
          - All Rights Reserved
        </FooterCopyright>
      </FooterContent>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  padding: 20px;
  margin: 30px 0 0 0;
  background-color: ${Colors.gray};
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
const FooterWrapper = styled.div`
  @media screen and (min-width: 1024px) {
    display: flex;
  }
`;
const FooterBrand = styled.h2`
  color: white;
  margin: 0;
`;
const FooterDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
`;
const FooterSections = styled.div``;
const FooterSection = styled.section``;
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

  @media screen and (min-width: 1024px) {
    text-align: center;
  }
`;
const FooterCopyrightSpan = styled.span`
  font-weight: 700;
`;
