import React from "react";

import styled from "styled-components";

export default function FeatureCard({ data }) {
  return (
    <StyledFeatureCard>
      <FeatureCardImage
        src={`${process.env.PUBLIC_URL}/images/${data.image}`}
        alt={data.name}
      />
      <FeatuerCardInfos>
        <FeatureCardInfosTitle>{data.name}</FeatureCardInfosTitle>
        <FeatureCardInfosDescription>
          {data.description}
        </FeatureCardInfosDescription>
      </FeatuerCardInfos>
    </StyledFeatureCard>
  );
}

const StyledFeatureCard = styled.div`
  display: flex;
`;
const FeatureCardImage = styled.img`
  width: 50px;
  height: 50px;
  margin: 0 20px 0 0;
`;
const FeatuerCardInfos = styled.div``;
const FeatureCardInfosTitle = styled.h3`
  color: white;
  margin: 0;
`;
const FeatureCardInfosDescription = styled.p`
  margin: 10px 0 0 0;
  color: rgba(255, 255, 255, 0.7);
`;
