import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import Colors from "../../utils/colors.util";

export default function ContactCard({ data }) {
  return (
    <StyledContactCard>
      <ContactCardIcon
        src={`${process.env.PUBLIC_URL}/assets/icons/${data.icon}`}
        alt={data.title}
      />
      <ContactCardInfos>
        <ContactCardInfosTitle>{data.title}</ContactCardInfosTitle>
        <ContactCardInfosDescription>
          {data.description}
        </ContactCardInfosDescription>
      </ContactCardInfos>
      <ContactCardButton to={data.link.path}>
        {data.link.name}
      </ContactCardButton>
    </StyledContactCard>
  );
}

const StyledContactCard = styled.div`
  padding: 30px;
  border-radius: 20px;
  background-color: ${Colors.primaryLowOp};
`;
const ContactCardIcon = styled.img`
  display: block;
  width: 60px;
  height: 60px;
`;
const ContactCardInfos = styled.div``;
const ContactCardInfosTitle = styled.h2`
  color: white;
`;
const ContactCardInfosDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
`;
const ContactCardButton = styled(Link)`
  background-image: linear-gradient(
    147.16deg,
    #5a189a 13.82%,
    #7b2cbf 35.53%,
    #9d4edd 76.05%
  );
  color: white;
  text-decoration: none;
  text-align: center;
  padding: 10px 20px;
  border-radius: 20px;
  width: 100%;
  display: block;
  font-weight: 700;
`;
