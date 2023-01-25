import React from "react";

import styled from "styled-components";
import Colors from "../utils/colors.util";

export default function FeatureCard({ data }) {
  return (
    <StyledFeatureCard>
      <FeatureCardImage src={data.image} alt={data.name} />
      <FeatureCardTitle>{data.name}</FeatureCardTitle>
      <FeatureCardDescription>{data.description}</FeatureCardDescription>
    </StyledFeatureCard>
  );
}

const StyledFeatureCard = styled.div`
  background-color: ${Colors.gray};
  border-radius: 10px;
  box-shadow: 0px 0px 30px rgb(0 0 0 / 7%);
  padding: 20px;
`;
const FeatureCardImage = styled.img``;
const FeatureCardTitle = styled.h3`
  color: white;
  margin: 10px 0 0 0;
`;
const FeatureCardDescription = styled.p`
  margin: 10px 0 0 0;
  color: rgba(255, 255, 255, 0.7);
`;
