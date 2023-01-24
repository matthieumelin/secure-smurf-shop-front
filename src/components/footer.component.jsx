import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

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

const StyledFooter = styled.footer``;
const FooterPayments = styled.div``;
const FooterBrand = styled.h1``;
const FooterDescription = styled.p``;
const FooterSocials = styled.ul``;
const FooterSections = styled.div``;
const FooterSection = styled.section``;
const FooterSectionTitle = styled.h2``;
const FooterSectionLinks = styled.ul``;
const FooterSectionLinksItem = styled.li``;
const FooterSectionLinksItemLink = styled(Link)``;
const FooterCopyright = styled.p``;
const FooterCopyrightSpan = styled.span``;