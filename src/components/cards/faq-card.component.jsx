import React, { useState } from "react";

import styled from "styled-components";

import Colors from "../../utils/colors.util";

export default function FaqCard({ defaultActive, data }) {
  const [isToggled, setToggled] = useState(defaultActive);

  return (
    <StyledFaq isToggled={isToggled} onClick={() => setToggled(!isToggled)}>
      <FaqHeader>
        <FaqHeaderQuestion>{data.question}</FaqHeaderQuestion>
        <FaqHeaderToggleButton>
          <FaqHeaderToggleButtonIcon
            src={`${process.env.PUBLIC_URL}/assets/icons/${
              isToggled ? "chevron-up.svg" : "chevron-down.svg"
            }`}
            alt="Toggle"
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
  background-color: ${(props) =>
    props.isToggled ? Colors.primaryLowOp : Colors.gray};
  border-radius: 10px;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
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
  width: 200px;

  @media screen and (min-width: 1024px) {
    font-size: 1.5rem;
    width: initial;
  }
`;
const FaqHeaderToggleButton = styled.button`
  background-color: transparent;
  border: none;
`;
const FaqHeaderToggleButtonIcon = styled.img`
  color: white;
  font-size: 1.5rem;
  width: 24px;
  height: 24px;
  display: block;
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
