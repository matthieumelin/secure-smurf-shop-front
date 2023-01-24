import React from "react";

import styled from "styled-components";
import Button from "./utils/button.component";

export default function HeroBanner() {
  return (
    <StyledHeroBanner>
      <HeroBannerTitle>Stop hesitating!</HeroBannerTitle>
      <HeroBannerDescription>
        Start playing on your deserved rank today.
      </HeroBannerDescription>
      <Button type={"submit"} title="Buy Boosting" />
    </StyledHeroBanner>
  );
}

const StyledHeroBanner = styled.div``;
const HeroBannerTitle = styled.h2``;
const HeroBannerDescription = styled.p``;