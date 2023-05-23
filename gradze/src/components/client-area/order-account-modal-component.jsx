import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import styled from 'styled-components'
import AppRoutes from '../../router/app.routes';

import Colors from '../../utils/colors.util';

export default function OrderAccountModal({ selectedAccount, onCloseView }) {
    // States
    const [copySuccess, setCopySuccess] = useState({});

    const onCopyToClipboard = async (credential, text) => {
        const newCopySuccess = credential === "username" ? { ...copySuccess, username: true } : { ...copySuccess, password: true };

        await navigator.clipboard.writeText(text);

        setCopySuccess(newCopySuccess);
    }
    return (
        <StyledComponent>
            <ModalContainer>
                <ModalHeader>
                    <ModalHeaderTitle>My Account</ModalHeaderTitle>
                    <ModalHeaderCloseButton onClick={() => onCloseView()}>
                        <ModalHeaderCloseButtonIcon src={`${process.env.PUBLIC_URL}/assets/icons/close.svg`} alt={`Close`} />
                    </ModalHeaderCloseButton>
                </ModalHeader>
                <ModalBody>
                    <ModalBodyGroups>
                        <ModalBodyGroup>
                            <ModalBodyGroupTitle>Username</ModalBodyGroupTitle>
                            <ModalBodyGroupWrapper>
                                <ModalBodyGroupWrapperInput type="text">{selectedAccount.username}</ModalBodyGroupWrapperInput>
                                <ModalBodyGroupWrapperButton type="button" onClick={() => onCopyToClipboard("username", selectedAccount.username)}>{copySuccess.username ? "Copied!" : "Copy"}</ModalBodyGroupWrapperButton>
                            </ModalBodyGroupWrapper>
                        </ModalBodyGroup>
                        <ModalBodyGroup>
                            <ModalBodyGroupTitle>Password</ModalBodyGroupTitle>
                            <ModalBodyGroupWrapper>
                                <ModalBodyGroupWrapperInput type="password">{selectedAccount.password}</ModalBodyGroupWrapperInput>
                                <ModalBodyGroupWrapperButton type="button" onClick={() => onCopyToClipboard("password", selectedAccount.password)}>{copySuccess.password ? "Copied!" : "Copy"}</ModalBodyGroupWrapperButton>
                            </ModalBodyGroupWrapper>
                        </ModalBodyGroup>
                    </ModalBodyGroups>
                </ModalBody>
                <ModalFooter>
                    <ModalFooterText>You have a lifetime guarantee on your account, if you have a problem, <ModalFooterLink to={AppRoutes.Contact}>contact us</ModalFooterLink>.</ModalFooterText>
                </ModalFooter>
            </ModalContainer>
        </StyledComponent>
    )
}

const StyledComponent = styled.div`
position: fixed;
top: 0;
bottom: 0;
left: 0;
right: 0;
background-color: rgba(0, 0, 0, 0.7);
z-index: 999;
`;
const ModalContainer = styled.div`
position: absolute;
left: 20px;
right: 20px;
top: 50%;
transform: translate(0%, -50%);
max-width: 425px;
margin: 0 auto;
background-color: ${Colors.gray};
border-radius: 10px;
padding: 30px;
box-shadow: 10px 10px 60px rgba(0 0 0 / 7%);
`;
const ModalHeader = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`;
const ModalHeaderTitle = styled.h2`
margin: 0;
color: white;
`;
const ModalHeaderCloseButton = styled.button`
border-radius: 100px;
padding: 0.3rem;
background-color: transparent;
border: 1px solid white;
transition: 0.2s;
cursor: pointer;

&:hover {
    transition: 0.2s;
    background-color: ${Colors.lightGray};
}
`;
const ModalHeaderCloseButtonIcon = styled.img`
display: block;
height: 24px;
width: 24px;
filter: invert(100%) sepia(100%) saturate(38%) hue-rotate(321deg) brightness(110%) contrast(110%);
`;
const ModalBody = styled.div``;
const ModalBodyGroups = styled.div`
`;
const ModalBodyGroup = styled.div``;
const ModalBodyGroupTitle = styled.p`
color: white;
background-color: ${Colors.primary};
border-radius: 2px;
width: max-content;
font-weight: 600;
padding: 0.3rem 0.5rem;
`;
const ModalBodyGroupWrapper = styled.div`
border: 1px solid white;
border-radius: 5px;
display: flex;
justify-content: space-between;
padding: 0.5rem 1rem;
`;
const ModalBodyGroupWrapperInput = styled.div`
color: white;
`;
const ModalBodyGroupWrapperButton = styled.button`
background-color: ${Colors.primary};
color: white;
font-family: inherit;
border: none;
border-radius: 2px;
cursor: pointer;
transition: 0.2s;

&:hover {
    transition: 0.2s;
    -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
  }
`;
const ModalFooter = styled.div``;
const ModalFooterText = styled.p`
color: rgba(255,255,255,0.7);
margin-bottom: 0;
`;
const ModalFooterLink = styled(Link)`
color: ${Colors.primary};
`;