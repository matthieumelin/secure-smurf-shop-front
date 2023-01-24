import React from "react";

import styled from "styled-components";

export default function FeatureCard({ data }) {
  return (
    <StyledFeatureCard>
      <FeatureCardImage
        src={data.image}
        alt={data.name}
      />
      <FeatureCardTitle>{data.name}</FeatureCardTitle>
      <FeatureCardDescription>
        {data.description}
      </FeatureCardDescription>
    </StyledFeatureCard>
  );
}

const StyledFeatureCard = styled.article``;
const FeatureCardImage = styled.img``;
const FeatureCardTitle = styled.h3``;
const FeatureCardDescription = styled.p``;
