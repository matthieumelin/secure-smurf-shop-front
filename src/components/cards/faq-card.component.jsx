import React, { useState } from "react";

import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Colors from "../../utils/colors.util";

export default function FaqCard({ defaultActive, data }) {
  const [isToggled, setToggled] = useState(defaultActive);

  return (
    <StyledFaq onClick={() => setToggled(!isToggled)}>
      <FaqHeader>
        <FaqHeaderQuestion>{data.question}</FaqHeaderQuestion>
        <FaqHeaderToggleButton>
          <FaqHeaderToggleButtonIcon
            icon={isToggled ? faChevronUp : faChevronDown}
          />
        </FaqHeaderToggleButton>
      </FaqHeader>
      <FaqBody isToggled={isToggled}>
        <FaqBodyAnswer>{data.answer}</FaqBodyAnswer>
      </FaqBody>
    </StyledFaq>
  );
}

const StyledFaq = styled.div`
  padding: 20px;
  background-color: ${Colors.gray};
  border-radius: 10px;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    transition: 0.2s;
    background-color: ${Colors.primaryLowOp};
  }
`;
const FaqHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const FaqHeaderQuestion = styled.h4`
  margin: 0;
  color: white;

  @media screen and (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;
const FaqHeaderToggleButton = styled.button`
  background-color: transparent;
  border: none;
`;
const FaqHeaderToggleButtonIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 1.5rem;
`;
const FaqBody = styled.div`
  overflow: hidden;
  max-height: 0;
  -webkit-transition: max-height 0.5s;
  -moz-transition: max-height 0.5s;
  -ms-transition: max-height 0.5s;
  -o-transition: max-height 0.5s;
  transition: max-height 0.5s;

  ${(props) => {
    if (props.isToggled) {
      return `
    max-height: 300px;
    -webkit-transition: max-height 0.5s; 
    -moz-transition: max-height 0.5s; 
    -ms-transition: max-height 0.5s; 
    -o-transition: max-height 0.5s; 
    transition: max-height 0.5s;  
 overflow: hidden;
    `;
    }
  }}
`;
const FaqBodyAnswer = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin: 20px 0 0 0;
`;
