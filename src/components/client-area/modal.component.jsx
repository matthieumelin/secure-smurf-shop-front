import React from "react";

import styled from "styled-components";
import Colors from "../../utils/colors.util";

export default function Modal({ active, onConfirm, onCancel }) {
  return (
    <StyledModal active={active}>
      <ModalTitle>Are you sure?</ModalTitle>
      <ModalButtons>
        <ModalButton type="button" onClick={onConfirm}>
          Confirm
        </ModalButton>
        <ModalButton
          type="button"
          onClick={onCancel}
          style={{
            color: Colors.red,
            backgroundColor: "rgba(214, 40, 40 ,0.1)",
          }}
        >
          Cancel
        </ModalButton>
      </ModalButtons>
    </StyledModal>
  );
}

const StyledModal = styled.div`
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 0.2s, opacity 0.1s linear;
  position: fixed;
  left: 20px;
  right: 20px;
  top: 50%;
  transform: translate(0%, -50%);
  max-width: 425px;
  margin: 0 auto;
  ${(props) => {
    if (props.active) {
      return `
      visibility: visible;
      opacity: 1;
      transition: opacity .1s linear;
        background-color: ${Colors.lightGray};
        border-radius: 10px;
        padding: 20px;
        z-index: 999;
        `;
    }
  }}
`;
const ModalTitle = styled.h1`
  color: white;
  margin: 0;
  text-align: center;
`;
const ModalButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 20px auto 0 auto;
  max-width: 425px;
`;
const ModalButton = styled.button`
  color: ${Colors.primary};
  background-color: ${Colors.primaryLowOp};
  border-radius: 20px;
  border: none;
  font-family: inherit;
  font-weight: 600;
  padding: 10px 15px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transition: 0.2s;
    -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
  }
`;
