import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import Button from "./utils/button.component";

import Colors from "../utils/colors.util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faEnvelope,
  faShield,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";

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
            <AccountCardBodyFeaturesItemIcon icon={faTrophy} />
            40,000 Blue Essence
          </AccountCardBodyFeaturesItem>
          <AccountCardBodyFeaturesItem>
            <AccountCardBodyFeaturesItemIcon icon={faShield} />
            Life-time Warranty
          </AccountCardBodyFeaturesItem>
          <AccountCardBodyFeaturesItem>
            <AccountCardBodyFeaturesItemIcon icon={faTrophy} />
            Fresh Unranked
          </AccountCardBodyFeaturesItem>
          <AccountCardBodyFeaturesItem>
            <AccountCardBodyFeaturesItemIcon icon={faBolt} />
            Instant delivery
          </AccountCardBodyFeaturesItem>
          <AccountCardBodyFeaturesItem>
            <AccountCardBodyFeaturesItemIcon icon={faEnvelope} />
            Full e-mail access
          </AccountCardBodyFeaturesItem>
        </AccountCardBodyFeatures>
        <AccountCardBodyPrice>€8.49</AccountCardBodyPrice>
        <Button
          title={"Buy now"}
          bgColor={Colors.primary}
          width={"100%"}
          font={"bold"}
        />
      </AccountCardBody>
    </StyledAccountCard>
  );
}

const StyledAccountCard = styled.article`
  background-color: ${Colors.gray};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 60px rgb(0 0 0 / 7%);
`;
const AccountCardHeader = styled.div``;
const AccountCardHeaderTitle = styled.h3`
  margin: 0;
  color: white;
`;
const AccountCardHeaderDescription = styled.p`
  margin: 0;
  color: white;
`;
const AccountCardHeaderLink = styled(Link)`
  color: ${Colors.primary};
`;
const AccountCardBody = styled.div``;
const AccountCardBodyFeatures = styled.ul`
  list-style: none;
  padding: 0;
`;
const AccountCardBodyFeaturesItem = styled.li`
  color: white;
`;
const AccountCardBodyFeaturesItemIcon = styled(FontAwesomeIcon)`
  color: ${Colors.primary};
  margin-right: 10px;
  width: 14px;
  height: 14px;
`;
const AccountCardBodyPrice = styled.h3`
  color: white;
`;
