import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCheckout } from '../redux/reducers/checkout.reducer';

import styled from 'styled-components'

import Colors from '../utils/colors.util';
import { kFormatter } from '../utils/number.util';

export default function Checkout({ processing, onProcessToPayment }) {
    // Redux
    const checkout = useSelector((state) => state.checkout.data);
    const dispatch = useDispatch();

    const onRemoveQuantity = () => {
        const newCheckout = { ...checkout }

        if (newCheckout.quantity > 1) {
            newCheckout.quantity -= 1;
            newCheckout.price = newCheckout.unitPrice * newCheckout.quantity;
        }

        updateCheckout(newCheckout);
    };

    const onAddQuantity = () => {
        const newCheckout = { ...checkout }

        if (newCheckout.quantity < 10) {
            if (newCheckout.quantity >= newCheckout.stock) return;

            newCheckout.quantity += 1;
            newCheckout.price = newCheckout.unitPrice * newCheckout.quantity;
        }

        updateCheckout(newCheckout);
    };

    const updateCheckout = (newCheckout) => {
        dispatch(setCheckout(newCheckout));

        sessionStorage.setItem("checkout", JSON.stringify(newCheckout));
    };

    const onClose = () => {
        document.body.style.overflow = "initial";

        sessionStorage.removeItem("checkout");

        dispatch(setCheckout({}));
    }

    return (
        <StyledCheckout>
            <CheckoutForm onSubmit={(event) => event.preventDefault()}>
                <CheckoutFormWrapper>
                    <CheckoutFormWrapperClose onClick={onClose}>
                        <CheckoutFormWrapperCloseIcon src={`${process.env.PUBLIC_URL}/assets/icons/close.svg`} alt="Close" />
                    </CheckoutFormWrapperClose>
                    <CheckoutFormTitle>Checkout</CheckoutFormTitle>
                </CheckoutFormWrapper>
                <CheckoutFormInfos>
                    <CheckoutFormInfosRow>
                        <CheckoutFormInfosRowTitle>Blue Essence</CheckoutFormInfosRowTitle>
                        <CheckoutFormInfosRowValue>{kFormatter(checkout.blueEssence)}+</CheckoutFormInfosRowValue>
                    </CheckoutFormInfosRow>
                    <CheckoutFormInfosRow>
                        <CheckoutFormInfosRowTitle>Region</CheckoutFormInfosRowTitle>
                        <CheckoutFormInfosRowValue>{checkout.region}</CheckoutFormInfosRowValue>
                    </CheckoutFormInfosRow>
                    <CheckoutFormInfosRow>
                        <CheckoutFormInfosRowTitle>Warranty</CheckoutFormInfosRowTitle>
                        <CheckoutFormInfosRowValue>Life-time</CheckoutFormInfosRowValue>
                    </CheckoutFormInfosRow>
                    <CheckoutFormInfosRow>
                        <CheckoutFormInfosRowTitle>Quantity</CheckoutFormInfosRowTitle>
                        <CheckoutFormInfosRowValue>
                            <CheckoutFormInfosRowValueQuantity>
                                <CheckoutFormInfosRowValueQuantityButton type='button' onClick={() => onRemoveQuantity()}>-</CheckoutFormInfosRowValueQuantityButton>
                                <CheckoutFormInfosRowValueQuantityInput type={"number"} disabled value={checkout.quantity} />
                                <CheckoutFormInfosRowValueQuantityButton type='button' onClick={() => onAddQuantity()}>+</CheckoutFormInfosRowValueQuantityButton>
                            </CheckoutFormInfosRowValueQuantity>
                        </CheckoutFormInfosRowValue>
                    </CheckoutFormInfosRow>
                    <CheckoutFormInfosRow>
                        <CheckoutFormInfosRowTitle>Price</CheckoutFormInfosRowTitle>
                        <CheckoutFormInfosRowValue>€{checkout.price}</CheckoutFormInfosRowValue>
                    </CheckoutFormInfosRow>
                </CheckoutFormInfos>
                <CheckoutFormButton type="button" onClick={() => onProcessToPayment("card")} disabled={processing}>
                    {processing ? (
                        "Processing.."
                    ) : (
                        <>
                            <CheckoutFormButtonIcon src={`${process.env.PUBLIC_URL}/assets/icons/cart_add.svg`} alt="Icon" />
                            Pay with Credit Card for €{checkout.price}
                        </>
                    )}
                </CheckoutFormButton>
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
background-color: ${Colors.gray};
border-radius: 100px;
border: 1px solid rgba(255,255,255,.1);
padding: 5px;
cursor: pointer;
transition: 0.2s;

&:hover {
    transition: 0.2s;
    background-color: ${Colors.lightGray};
}
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
const CheckoutFormInfosRowTitle = styled.div`
margin: 0;
color: white;
`;
const CheckoutFormInfosRowValue = styled.div`
margin: 0;
color: rgba(255,255,255,.7);
`;
const CheckoutFormInfosRowValueQuantity = styled.div`
display: flex;
border: 1px solid white;
border-radius: 2px;
`;
const CheckoutFormInfosRowValueQuantityInput = styled.input`
background-color: transparent;
color: white;
border-top: none;
border-bottom: none;
border-left: 1px solid white;
border-right: 1px solid white;
text-align:center;
width: 40px;
`;
const CheckoutFormInfosRowValueQuantityButton = styled.button`
font-family: inherit;
font-size: inherit;
color: white;
background-color: transparent;
border: none;
width: 22px;
cursor: pointer;
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
transition: 0.2s;
cursor: pointer;

${(props) => {
        if (props.disabled) {
            return `
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.7);
    `;
        } else {
            return `
            &:hover {
                transition: 0.2s;
                -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
                -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
                box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
              }
            `;
        }
    }}
`;
const CheckoutFormButtonIcon = styled.img`
display: block;
width: 24px;
height: 24px;
filter: invert(100%) sepia(0%) saturate(1%) hue-rotate(157deg) brightness(102%) contrast(101%);
margin-right: 10px;
`;