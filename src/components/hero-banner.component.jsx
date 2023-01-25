import React from "react";

import styled from "styled-components";
import Colors from "../utils/colors.util";
import Button from "./utils/button.component";

export default function HeroBanner() {
  return (
    <StyledHeroBanner>
      <HeroBannerTitle>Stop hesitating!</HeroBannerTitle>
      <HeroBannerDescription>
        Start playing on your deserved rank today.
      </HeroBannerDescription>
      <Button type={"submit"} title="Buy Boosting" align={"center"} />
    </StyledHeroBanner>
  );
}

const StyledHeroBanner = styled.div`
background-color: ${Colors.gray};
padding: 20px;
`;
const HeroBannerTitle = styled.h2`
margin: 0;
text-align: center;
color: white;
`;
const HeroBannerDescription = styled.p`
color: rgba(255,255,255,0.7);
text-align: center;
`;