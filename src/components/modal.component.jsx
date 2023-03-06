import React from "react";

import styled from "styled-components";

export default function Modal({ title, description, onConfirm, onCancel }) {
  return (
    <StyledModal>
      <ModalContent>
        <ModalContentIcon
          src={`${process.env.PUBLIC_URL}/assets/icons/close_circle.svg`}
          alt="Modal icon"
        />
        <ModalContentTitle>{title}</ModalContentTitle>
        <ModalContentDescription>{description}</ModalContentDescription>
        <ModalContentActions>
          <ModalContentActionsButton onClick={() => onConfirm}>
            Confirm
          </ModalContentActionsButton>
          <ModalContentActionsButton onClick={() => onCancel}>
            Cancel
          </ModalContentActionsButton>
        </ModalContentActions>
      </ModalContent>
    </StyledModal>
  );
}

const StyledModal = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
const ModalContent = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
`;
const ModalContentIcon = styled.img`
  display: block;
  width: 100px;
  height: 100px;
`;
const ModalContentTitle = styled.h2``;
const ModalContentDescription = styled.p``;
const ModalContentActions = styled.div``;
const ModalContentActionsButton = styled.button``;
