import React, { useState } from "react";

import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Colors from "../utils/colors.util";

export default function FaqCard({ defaultActive, data }) {
  const [isToggled, setToggled] = useState(defaultActive);

  return (
    <StyledFaq onClick={() => setToggled(!isToggled)}>
      <FaqHeader>
        <FaqHeaderQuestion>{data.question}</FaqHeaderQuestion>
        <FaqHeaderToggleButton>
          <FaqHeaderToggleButtonIcon icon={isToggled ? faChevronUp : faChevronDown} />
        </FaqHeaderToggleButton>
      </FaqHeader>
      {isToggled ? (
        <FaqBody>
          <FaqBodyAnswer>{data.answer}</FaqBodyAnswer>
        </FaqBody>
      ) : null}
    </StyledFaq>
  );
}

const StyledFaq = styled.div`
padding: 20px;
background-color: ${Colors.gray};
border-radius: 10px;
box-shadow: 0px 0px 30px rgb(0 0 0 / 7%);
`;
const FaqHeader = styled.div`
  display: flex;
  align-items: center;
`;
const FaqHeaderQuestion = styled.h4`
margin: 0;
color: white;
`;
const FaqHeaderToggleButton = styled.button`
background-color: transparent;
border: none;
`;
const FaqHeaderToggleButtonIcon = styled(FontAwesomeIcon)`
color: white;
font-size: 1.5rem;
`;
const FaqBody = styled.div``;
const FaqBodyAnswer = styled.p`
color: rgba(255,255,255,0.7);
margin: 20px 0 0 0;
`;
