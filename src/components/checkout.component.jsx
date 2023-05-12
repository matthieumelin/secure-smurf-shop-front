import React from 'react'

import styled from 'styled-components'
import Colors from '../utils/colors.util';

export default function Checkout({ active, product }) {
    return (
        <StyledCheckout>
            <CheckoutForm>
                <CheckoutFormWrapper>
                    <CheckoutFormWrapperClose>
                        <CheckoutFormWrapperCloseIcon src={`${process.env.PUBLIC_URL}/assets/icons/close.svg`} alt="Close" />
                    </CheckoutFormWrapperClose>
                    <CheckoutFormTitle>Checkout</CheckoutFormTitle>
                </CheckoutFormWrapper>
                <CheckoutFormInfos>
                    <CheckoutFormInfosRow>
                        <CheckoutFormInfosRowTitle>Blue Essence</CheckoutFormInfosRowTitle>
                        <CheckoutFormInfosRowValue>40,000+</CheckoutFormInfosRowValue>
                    </CheckoutFormInfosRow>
                    <CheckoutFormInfosRow>
                        <CheckoutFormInfosRowTitle>Region</CheckoutFormInfosRowTitle>
                        <CheckoutFormInfosRowValue>TR</CheckoutFormInfosRowValue>
                    </CheckoutFormInfosRow>
                    <CheckoutFormInfosRow>
                        <CheckoutFormInfosRowTitle>Warranty</CheckoutFormInfosRowTitle>
                        <CheckoutFormInfosRowValue>Life-time Warranty</CheckoutFormInfosRowValue>
                    </CheckoutFormInfosRow>
                    <CheckoutFormInfosRow>
                        <CheckoutFormInfosRowTitle>Price</CheckoutFormInfosRowTitle>
                        <CheckoutFormInfosRowValue>$10.00</CheckoutFormInfosRowValue>
                    </CheckoutFormInfosRow>
                </CheckoutFormInfos>
                <CheckoutFormButton type="button">
                    <CheckoutFormButtonIcon src={`${process.env.PUBLIC_URL}/assets/icons/cart_add.svg`} alt="Icon" />
                    Pay with Credit Card for $10.00</CheckoutFormButton>
            </CheckoutForm>
        </StyledCheckout>
    )
}

const StyledCheckout = styled.div`
position: fixed;
top: 0;
bottom: 0;
left: 0;
right: 0;
background-color: rgba(0, 0, 0, 0.7);
z-index: 999;
`;
const CheckoutForm = styled.form`
border-radius: 20px;
background: linear-gradient(
    to bottom,
    rgba(157, 78, 221,0.3),
    rgba(0,0,0, 100)
  ),url(${process.env.PUBLIC_URL}/assets/images/background.jpg);
background-position: center;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 100%;
max-width: 425px;
padding: 30px;
`;
const CheckoutFormWrapper = styled.div`
display: flex;
align-items: center;
`;
const CheckoutFormWrapperClose = styled.button`
background-color: ${Colors.lightGray};
border-radius: 100px;
border: 1px solid rgba(255,255,255,.1);
padding: 5px;
`;
const CheckoutFormWrapperCloseIcon = styled.img`
display: block;
width: 24px;
height: 24px;
filter: invert(100%) sepia(0%) saturate(1%) hue-rotate(157deg) brightness(102%) contrast(101%);
`;
const CheckoutFormTitle = styled.h2`
color: white;
font-weight: 700;
margin: 0 0 0 20px;
`;
const CheckoutFormInfos = styled.div`
background-color: ${Colors.gray};
border: 1px solid rgba(255,255,255,.1);
border-radius: 20px;
padding: 10px 20px;
margin: 20px 0;
`;
const CheckoutFormInfosRow = styled.div`
display: flex;
justify-content: space-between;
border-bottom: 1px solid rgba(255,255,255,.1);
padding: 10px;

&:last-child {
    border-bottom: none;
}
`;
const CheckoutFormInfosRowTitle = styled.p`
margin: 0;
color: white;
`;
const CheckoutFormInfosRowValue = styled.p`
margin: 0;
color: rgba(255,255,255,.7);
`;
const CheckoutFormButton = styled.button`
width: 100%;
padding: 10px;
border-radius: 20px;
border: none;
background-color: ${Colors.primary};
color: white;
font-size: inherit;
font-family: inherit;
display: flex;
align-items: center;
justify-content: center;
margin-top: 30px;
`;
const CheckoutFormButtonIcon = styled.img`
display: block;
width: 24px;
height: 24px;
filter: invert(100%) sepia(0%) saturate(1%) hue-rotate(157deg) brightness(102%) contrast(101%);
margin-right: 10px;
`;