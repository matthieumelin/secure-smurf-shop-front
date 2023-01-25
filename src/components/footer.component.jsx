import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import Colors from "../utils/colors.util";

export default function Footer() {
  return (
    <StyledFooter>
      <FooterPayments></FooterPayments>
      <FooterBrand>Secure Smurf Shop</FooterBrand>
      <FooterDescription>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et consequatur
        quam mollitia, ducimus iusto nobis aut illum nostrum aperiam minus
        placeat itaque sit? Repellat, ratione repudiandae iste dolor porro
        libero?
      </FooterDescription>
      <FooterSocials></FooterSocials>
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
      <FooterCopyright>
        &copy;{" "}
        <FooterCopyrightSpan>
          {new Date().getFullYear()} Secure Smurf Shop
        </FooterCopyrightSpan>{" "}
        - All Rights Reserved
      </FooterCopyright>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
padding: 20px;
margin: 30px 0 0 0;
background-color: ${Colors.gray};
`;
const FooterPayments = styled.div``;
const FooterBrand = styled.h2`
color: white;
margin: 0;
`;
const FooterDescription = styled.p`
color: rgba(255,255,255,0.7);
`;
const FooterSocials = styled.ul``;
const FooterSections = styled.div``;
const FooterSection = styled.section``;
const FooterSectionTitle = styled.h3`
color: ${Colors.primary};
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
`;
const FooterCopyright = styled.p`
color: white;
margin: 20px 0 0 0;
`;
const FooterCopyrightSpan = styled.span`
font-weight: 700;
`;