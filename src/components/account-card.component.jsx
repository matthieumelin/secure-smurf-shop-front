import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import Button from "./utils/button.component";

import Colors from "../utils/colors.util";

export default function AccountCard({ data }) {
  return (
    <StyledAccountCard>
      <AccountCardHeader>
        <AccountCardHeaderTitle>Tier 1</AccountCardHeaderTitle>
        <AccountCardHeaderDescription>
          Blue Essence
        </AccountCardHeaderDescription>
        <AccountCardHeaderLink to="/">Choose skin</AccountCardHeaderLink>
      </AccountCardHeader>
      <AccountCardBody>
        <AccountCardBodyFeatures>
          <AccountCardBodyFeaturesItem>
            40,000 Blue Essence
          </AccountCardBodyFeaturesItem>
          <AccountCardBodyFeaturesItem>
            Life-time Warranty
          </AccountCardBodyFeaturesItem>
          <AccountCardBodyFeaturesItem>
            Fresh Unranked
          </AccountCardBodyFeaturesItem>
          <AccountCardBodyFeaturesItem>
            Instant delivery
          </AccountCardBodyFeaturesItem>
          <AccountCardBodyFeaturesItem>
            Full e-mail access
          </AccountCardBodyFeaturesItem>
        </AccountCardBodyFeatures>
        <AccountCardBodyPrice>€8.49</AccountCardBodyPrice>
        <Button title={"Buy now"} bgColor={Colors.primary} />
      </AccountCardBody>
    </StyledAccountCard>
  );
}

const StyledAccountCard = styled.article``;
const AccountCardHeader = styled.div``;
const AccountCardHeaderTitle = styled.h3``;
const AccountCardHeaderDescription = styled.p``;
const AccountCardHeaderLink = styled(Link)``;
const AccountCardBody = styled.div``;
const AccountCardBodyFeatures = styled.ul``;
const AccountCardBodyFeaturesItem = styled.li``;
const AccountCardBodyPrice = styled.h3``;
