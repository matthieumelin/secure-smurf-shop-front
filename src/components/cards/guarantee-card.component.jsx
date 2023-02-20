import React from "react";

import styled from "styled-components";
import Colors from "../../utils/colors.util";

export default function GuaranteeCard({ data }) {
  return (
    <StyledGuaranteedCard>
      <GuaranteeCardTitle>{data.title}</GuaranteeCardTitle>
      <GuaranteeCardDescription>{data.description}</GuaranteeCardDescription>
    </StyledGuaranteedCard>
  );
}

const StyledGuaranteedCard = styled.div`
background-color: ${Colors.gray};
border-radius: 10px;
padding: 20px;
`;
const GuaranteeCardTitle = styled.h3`
color: white;
margin: 0;
transition: 0.2s;

${StyledGuaranteedCard}:hover & {
  color: ${Colors.primary};
  transition: 0.2s;
}
`;
const GuaranteeCardDescription = styled.p`
color: rgba(255,255,255,0.7);
margin: 20px 0 0 0;
`;
