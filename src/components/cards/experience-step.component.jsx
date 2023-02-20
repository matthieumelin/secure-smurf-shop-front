import React from "react";

import styled from "styled-components";
import Colors from "../../utils/colors.util";

export default function ExperienceStepCard({
  data,
  dataExp,
  active,
  setCurrentExperience,
}) {
  return (
    <StyledExperienceStepCard
      active={active}
      onClick={() => setCurrentExperience(dataExp)}
    >
      <ExperienceStepCardIcon
        src={`${process.env.PUBLIC_URL}/assets/icons/${data.icon}`}
        alt={data.title}
      />
      <ExperienceStepCardInfos>
        <ExperienceStepCardInfosTitle>
          {data.title}
        </ExperienceStepCardInfosTitle>
        <ExperienceStepCardInfosDescription>
          {data.description}
        </ExperienceStepCardInfosDescription>
      </ExperienceStepCardInfos>
    </StyledExperienceStepCard>
  );
}

const StyledExperienceStepCard = styled.div`
  padding: 30px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s;
    background-color: ${Colors.primaryLowOp};
  }

  @media screen and (min-width: 1024px) {
    display: flex;
  }

  ${(props) => {
    if (props.active) {
      return `
      border-radius: 10px;
      background-color: ${Colors.primaryLowOp};
      `;
    }
  }}
`;
const ExperienceStepCardIcon = styled.img`
  display: block;
  max-width: 100%;
  width: 40px;
  height: 40px;
`;
const ExperienceStepCardInfos = styled.div`
  margin: 20px 0 0 0;

  @media screen and (min-width: 1024px) {
    margin: 0 0 0 30px;
  }
`;
const ExperienceStepCardInfosTitle = styled.h3`
  margin: 0;
  color: white;
`;
const ExperienceStepCardInfosDescription = styled.p`
  margin: 10px 0 0 0;
  color: rgba(255, 255, 255, 0.7);
  max-width: 250px;
`;
