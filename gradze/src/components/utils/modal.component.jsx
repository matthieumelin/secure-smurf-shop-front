import React from "react";

import styled from "styled-components";

import Colors from "../../utils/colors.util";

export default function Modal({ active, processing, title, description, onConfirm, onCancel, buttonConfirmTitle, buttonCancelTitle }) {
  return (
    <StyledModal active={active}>
      {processing ?
        (
          <ModalLoading src={`${process.env.PUBLIC_URL}/assets/images/pulse.svg`} alt="Loading" />
        ) : (
          <ModalContainer>
            <ModalTitle>{title}</ModalTitle>
            <ModalDescription>{description}</ModalDescription>
            <ModalButtons>
              <ModalButton type="button" onClick={onCancel}>
                {buttonCancelTitle}
              </ModalButton>
              <ModalButton
                type="button"
                onClick={onConfirm}
                style={{
                  border: "none",
                  backgroundColor: Colors.red,
                }}
              >
                {buttonConfirmTitle}
              </ModalButton>
            </ModalButtons>
          </ModalContainer >
        )
      }
    </StyledModal >
  );
}

const StyledModal = styled.div`
position: fixed;
top: 0;
bottom: 0;
left: 0;
right: 0;
background-color: rgba(0, 0, 0, 0.7);
z-index: 999;
visibility: hidden;
  opacity: 0;
  transition: visibility 0s 0.2s, opacity 0.1s linear;
${(props) => {
    if (props.active) {
      return `
    visibility: visible;
    opacity: 1;
    transition: opacity .1s linear;
      `;
    }
  }}
`;
const ModalContainer = styled.div`
  position: absolute;
  left: 20px;
  right: 20px;
  top: 50%;
  transform: translate(0%, -50%);
  max-width: 425px;
  margin: 0 auto;
  background-color: ${Colors.lightGray};
  border-radius: 10px;
  padding: 30px;
`;
const ModalLoading = styled.img`
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
display: block;
max-width: 100%;
`;
const ModalTitle = styled.h3`
  margin: 0;
  color: white;
`;
const ModalDescription = styled.p`
font-weight: 300;
color: white;
`;
const ModalButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 30px auto 0 auto;
`;
const ModalButton = styled.button`
font-family: inherit;
font-weight: 700;
border: 1px solid white;
border-radius: 5px;
padding: 15px 10px;
background-color: transparent;
cursor: pointer;
transition: 0.2s;
color: white;

&:hover {
  transition: 0.2s;
  transform: scale(1.01);
}
`;
