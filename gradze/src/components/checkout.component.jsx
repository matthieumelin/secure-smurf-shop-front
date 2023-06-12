import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCheckout } from '../redux/reducers/checkout.reducer';

import styled from 'styled-components'

import Colors from '../utils/colors.util';
import { kFormatter } from '../utils/number.util';
import { lowerAndCapitalize } from "../utils/string.util"

export default function Checkout({ processing, onClose, onProcessToPayment }) {
    // Redux
    const checkout = useSelector((state) => state.checkout.data);
    const dispatch = useDispatch();

    const getTotalPrice = (currentCheckout) => {
        const products = currentCheckout.products;

        if (!products || !Array.isArray(products) || products.length === 0) {
            return 0;
        }

        const prices = products.map((product) => product.unitPrice * product.quantity)
        const total = prices.reduce((acc, curr) => acc + curr);

        return total.toFixed(2);
    }

    const onRemoveQuantity = (product) => {
        const clonedCheckout = { ...checkout };
        const clonedProduct = { ...product };

        if (clonedProduct.quantity > 0) {
            clonedProduct.quantity = Math.max(clonedProduct.quantity - 1, 1);
            clonedCheckout.totalPrice = getTotalPrice(clonedCheckout);
        }

        const updatedProducts = clonedCheckout.products.map(item => (item.id === clonedProduct.id ? clonedProduct : item));
        clonedCheckout.products = updatedProducts;

        updateCheckout(clonedCheckout);
    };

    const onAddQuantity = (product) => {
        const clonedCheckout = { ...checkout };
        const clonedProduct = { ...product };

        if (clonedProduct.stock === 10 && clonedProduct.quantity === 10) return;
        if (clonedProduct.quantity < clonedProduct.stock) {
            clonedProduct.quantity = Math.min(clonedProduct.quantity + 1, clonedProduct.stock);
            clonedCheckout.totalPrice = getTotalPrice(clonedCheckout);
        }

        const updatedProducts = clonedCheckout.products.map(item => (item.id === clonedProduct.id ? clonedProduct : item));
        clonedCheckout.products = updatedProducts;

        updateCheckout(clonedCheckout);
    };

    const onDeleteProduct = (product) => {
        const filteredProducts = checkout.products.filter((item) => item.id !== product.id);

        const clonedCheckout = { ...checkout, products: filteredProducts };

        dispatch(setCheckout(clonedCheckout));

        sessionStorage.setItem("checkout", JSON.stringify(clonedCheckout));

        if (!filteredProducts.length) {
            onClose();
        }
    };


    const updateCheckout = (newCheckout) => {
        dispatch(setCheckout(newCheckout));
        sessionStorage.setItem("checkout", JSON.stringify(newCheckout));
    };

    return (
        <StyledCheckout>
            <CheckoutForm onSubmit={(event) => event.preventDefault()}>
                <CheckoutFormWrapper>
                    <CheckoutFormWrapperClose onClick={onClose}>
                        <CheckoutFormWrapperCloseIcon src={`${process.env.PUBLIC_URL}/assets/icons/close.svg`} alt="Close" />
                    </CheckoutFormWrapperClose>
                    <CheckoutFormTitle>Checkout</CheckoutFormTitle>
                </CheckoutFormWrapper>
                {checkout.products && checkout.products.length ?
                    checkout.products.map((product) => {
                        return <CheckoutFormProducts key={`checkout_product_${product.id}`}>
                            <CheckoutFormProductsTitle>{lowerAndCapitalize(product.name)}</CheckoutFormProductsTitle>
                            <CheckoutFormProductsRows>
                                <CheckoutFormProductsRow>
                                    <CheckoutFormProductsRowTitle>Blue Essence</CheckoutFormProductsRowTitle>
                                    <CheckoutFormProductsRowValue>{kFormatter(product.blueEssence)}+</CheckoutFormProductsRowValue>
                                </CheckoutFormProductsRow>
                                <CheckoutFormProductsRow>
                                    <CheckoutFormProductsRowTitle>Region</CheckoutFormProductsRowTitle>
                                    <CheckoutFormProductsRowValue>{product.region}</CheckoutFormProductsRowValue>
                                </CheckoutFormProductsRow>
                                <CheckoutFormProductsRow>
                                    <CheckoutFormProductsRowTitle>Warranty</CheckoutFormProductsRowTitle>
                                    <CheckoutFormProductsRowValue>Life-time</CheckoutFormProductsRowValue>
                                </CheckoutFormProductsRow>
                                <CheckoutFormProductsRow>
                                    <CheckoutFormProductsRowTitle>Quantity</CheckoutFormProductsRowTitle>
                                    <CheckoutFormProductsRowValue>
                                        <CheckoutFormProductsRowValueQuantity>
                                            <CheckoutFormProductsRowValueQuantityButton type='button' onClick={() => onRemoveQuantity(product)}>-</CheckoutFormProductsRowValueQuantityButton>
                                            <CheckoutFormProductsRowValueQuantityInput type={"number"} disabled value={product.quantity} />
                                            <CheckoutFormProductsRowValueQuantityButton type='button' onClick={() => onAddQuantity(product)}>+</CheckoutFormProductsRowValueQuantityButton>
                                        </CheckoutFormProductsRowValueQuantity>
                                    </CheckoutFormProductsRowValue>
                                </CheckoutFormProductsRow>
                            </CheckoutFormProductsRows>
                            <CheckoutFormProductsActions>
                                <CheckoutFormProductsActionButton type="button" onClick={() => onDeleteProduct(product)}>
                                    <CheckoutFormProductsActionButtonIcon src={`${process.env.PUBLIC_URL}/assets/icons/trash.svg`} alt="Delete" />
                                </CheckoutFormProductsActionButton>
                            </CheckoutFormProductsActions>
                        </CheckoutFormProducts>
                    }) : null
                }
                <CheckoutFormButton type="button" onClick={() => onProcessToPayment("card")}>
                    {processing ? (
                        "Processing.."
                    ) : (
                        <>
                            <CheckoutFormButtonIcon src={`${process.env.PUBLIC_URL}/assets/icons/cart_add.svg`} alt="Icon" />
                            Pay with Credit Card for €{getTotalPrice(checkout)}
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
max-width: 1024px;
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
const CheckoutFormProducts = styled.div`
background-color: ${Colors.gray};
border: 1px solid rgba(255,255,255,.1);
border-radius: 20px;
padding: 10px 20px;
margin: 20px 0;

@media screen and (min-width: 1024px) {
    display: flex;
align-items: center;
justify-content: space-between;
}
`;
const CheckoutFormProductsTitle = styled.h3`
color: white;
margin: 0;
width: 75px;
`;
const CheckoutFormProductsRows = styled.div`
@media screen and (min-width: 1024px) {
    display: flex;
}
`;
const CheckoutFormProductsRow = styled.div`
display: flex;
justify-content: space-between;
padding: 10px 0;
border-bottom: 1px solid rgba(255,255,255,.1);

@media screen and (min-width: 1024px) {
    border-right: 1px solid rgba(255,255,255,.1);
    border-bottom: none;
    padding: 10px;

    &:last-child {
        border-right: none;
    }
}

&:last-child {
    border-bottom: none;
}
`;
const CheckoutFormProductsRowTitle = styled.div`
margin: 0 10px 0 0;
color: white;
`;
const CheckoutFormProductsRowValue = styled.div`
margin: 0;
color: ${Colors.primary};
font-weight: 500;
`;
const CheckoutFormProductsRowValueQuantity = styled.div`
display: flex;
border: 1px solid white;
border-radius: 2px;
`;
const CheckoutFormProductsRowValueQuantityInput = styled.input`
background-color: transparent;
color: white;
border-top: none;
border-bottom: none;
border-left: 1px solid white;
border-right: 1px solid white;
text-align:center;
width: 40px;
`;
const CheckoutFormProductsRowValueQuantityButton = styled.button`
font-family: inherit;
font-size: inherit;
color: white;
background-color: transparent;
border: none;
width: 22px;
cursor: pointer;
`;
const CheckoutFormProductsActions = styled.div``;
const CheckoutFormProductsActionButton = styled.button`
border-radius: 10px;
display: flex;
justify-content: center;
align-items: center;
background-color: ${Colors.red};
border: none;
width: 28px;
height: 28px;
cursor: pointer;
`;
const CheckoutFormProductsActionButtonIcon = styled.img`
width: 18px;
height: 18px;
display: block;
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