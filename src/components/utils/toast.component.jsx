import React from "react";

import styled from "styled-components";

import Colors from "../../utils/colors.util";

export const ToastTypes = {
  SUCCESS: Colors.green,
  ERROR: Colors.red,
};

export default function Toast({ type, message, setToast }) {
  return (
    <StyledToast message={message} type={type}>
      <ToastClose type="button" onClick={() => setToast({})}>
        <ToastCloseIcon
          src={`${process.env.PUBLIC_URL}/assets/icons/close.svg`}
          alt="Close"
        />
      </ToastClose>
      <ToastMessage>{message}</ToastMessage>
    </StyledToast>
  );
}

const StyledToast = styled.div`
  border-radius: 10px;
  padding: 20px 30px;
  background-color: ${(props) => props.type};
  position: fixed;
  right: -20px;
  top: 20px;
  z-index: 9999;
  box-shadow: 10px 10px 60px rgb(0 0 0 / 7%);
  animation: 0.5s ease-in 0s 1 both running slideIn;
  opacity: ${(props) => (props.message ? "1" : "0")};

  @keyframes slideIn {
    from {
      opacity: 0;
      right: -20px;
    }
    to {
      opacity: 1s;
      right: 20px;
    }
  }
`;
const ToastClose = styled.button`
  background-color: transparent;
  position: absolute;
  right: 5px;
  top: 5px;
  border: none;
`;
const ToastCloseIcon = styled.img`
  color: white;
  font-size: 1.2rem;
  display: block;
  width: 18px;
  height: 18px;
`;
const ToastMessage = styled.p`
  color: white;
  margin: 0;
`;
