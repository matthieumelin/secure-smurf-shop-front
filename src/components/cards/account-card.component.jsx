import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import Button from "../utils/button.component";

import Colors from "../../utils/colors.util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faCartShopping,
  faEnvelope,
  faShield,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";

export default function AccountCard({ data }) {
  return (
    <StyledAccountCard>
      <AccountCardHeader>
        <AccountCardHeaderPrice>€8.49</AccountCardHeaderPrice>
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
        <Button
          icon={faCartShopping}
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
  border-radius: 10px;
  box-shadow: 0px 0px 60px rgb(0 0 0 / 7%);
`;
const AccountCardHeader = styled.div`
  position: relative;
  padding: 20px 0 0 0;
`;
const AccountCardHeaderPrice = styled.h4`
  color: white;
  background-color: ${Colors.primary};
  margin: 0;
  position: absolute;
  right: 0;
  top: 0;
  padding: 5px;
  border-radius: 0 10px 0 20px;
`;

const AccountCardHeaderTitle = styled.h2`
  margin: 0;
  color: white;
  text-align: center;
`;
const AccountCardHeaderDescription = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
`;
const AccountCardHeaderLink = styled(Link)`
  color: ${Colors.primary};
  text-align: center;
  display: block;
`;
const AccountCardBody = styled.div`
  padding: 0 20px 20px 20px;
`;
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
