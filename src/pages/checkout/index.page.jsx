import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import styled from "styled-components";

import CheckoutPaymentCard from "../../components/cards/checkout-payment-card.component";
import Footer from "../../components/footer.component";

import axios from "axios";
import AppRoutes from "../../router/app.routes";

import Colors from "../../utils/colors.util";
import ErrorContainer from "../../utils/error-container.util";
import { ErrorMessage } from "@hookform/error-message";
import StripeContainer from "../../stripe/StripeContainer";

export default function Checkout() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [countries, setCountries] = useState([]);

  const [payment, setPayment] = useState(null);

  const token = useSelector((state) => state.user.token);
  const checkout = useSelector((state) => state.checkout.data);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get("./payments.json")
      .then((res) => setPaymentMethods(res.data))
      .catch((err) => console.error(err));
    axios
      .get("./countries.json")
      .then((res) => setCountries(res.data))
      .catch((err) => console.error(err));
  }, []);

  const onSubmit = async (data) => {};

  if (!token) {
    return <Navigate to={AppRoutes.Login} />;
  }

  return (
    <StyledCheckout>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <StripeContainer />
      <Header>
        <HeaderBrand>
          <Link to={AppRoutes.Home}>
            <HeaderBrandLogo
              src={`${process.env.PUBLIC_URL}/assets/images/logo_white.png`}
              alt={process.env.REACT_APP_NAME}
            />
          </Link>
          <HeaderBrandTitle>Checkout</HeaderBrandTitle>
        </HeaderBrand>
      </Header>
      {checkout ? (
        <Main grid={true}>
          <Wrapper>
            <Section>
              <SectionTitle>Select payment gateway</SectionTitle>
              <Payments>
                {paymentMethods &&
                  paymentMethods.map((paymentMethod, index) => {
                    return (
                      <CheckoutPaymentCard
                        key={`checkout_payment_${index}`}
                        data={paymentMethod}
                        active={payment === paymentMethod}
                        setPayment={setPayment}
                      />
                    );
                  })}
              </Payments>
            </Section>
            <Section>
              <SectionTitle>Billing details</SectionTitle>
              <BillingForm onSubmit={handleSubmit(onSubmit)}>
                <BillingFormGroups>
                  <BillingFormGroup>
                    <BillingFormGroupLabel htmlFor="fullName">
                      Full name
                    </BillingFormGroupLabel>
                    <BillingFormGroupInput
                      type="text"
                      id="fullName"
                      name="fullName"
                      error={errors.fullName}
                      {...register("fullName", {
                        required: {
                          value: true,
                          message: "You must enter your full name.",
                        },
                      })}
                    />
                    {errors.fullName && (
                      <ErrorMessage
                        errors={errors}
                        name="fullName"
                        as={<ErrorContainer />}
                      />
                    )}
                  </BillingFormGroup>
                  <BillingFormGroup>
                    <BillingFormGroupLabel htmlFor="country">
                      Country
                    </BillingFormGroupLabel>
                    <BillingFormGroupSelect {...register("country")}>
                      {countries &&
                        countries.map((country, index) => {
                          return (
                            <BillingFormGroupSelectOption
                              key={`checkout_country_${index}`}
                              value={country.name}
                            >
                              {country.name}
                            </BillingFormGroupSelectOption>
                          );
                        })}
                    </BillingFormGroupSelect>
                    {errors.country && (
                      <ErrorMessage
                        errors={errors}
                        name="country"
                        as={<ErrorContainer />}
                      />
                    )}
                  </BillingFormGroup>
                  <BillingFormGroup>
                    <BillingFormGroupLabel htmlFor="billingAddress">
                      Billing address
                    </BillingFormGroupLabel>
                    <BillingFormGroupInput
                      type="text"
                      id="billingAddress"
                      name="billingAddress"
                      error={errors.billingAddress}
                      {...register("billingAddress", {
                        required: {
                          value: true,
                          message: "You must enter your billing address.",
                        },
                      })}
                    />
                    {errors.billingAddress && (
                      <ErrorMessage
                        errors={errors}
                        name="billingAddress"
                        as={<ErrorContainer />}
                      />
                    )}
                  </BillingFormGroup>
                  <BillingFormGroup>
                    <BillingFormGroupLabel htmlFor="city">
                      City
                    </BillingFormGroupLabel>
                    <BillingFormGroupInput
                      type="text"
                      id="city"
                      name="city"
                      error={errors.city}
                      {...register("city", {
                        required: {
                          value: true,
                          message: "You must enter your city.",
                        },
                      })}
                    />
                    {errors.city && (
                      <ErrorMessage
                        errors={errors}
                        name="city"
                        as={<ErrorContainer />}
                      />
                    )}
                  </BillingFormGroup>
                  <BillingFormGroup>
                    <BillingFormGroupLabel htmlFor="zipCode">
                      ZIP Code
                    </BillingFormGroupLabel>
                    <BillingFormGroupInput
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      error={errors.zipCode}
                      {...register("zipCode", {
                        required: {
                          value: true,
                          message: "You must enter your zip code.",
                        },
                      })}
                    />
                    {errors.zipCode && (
                      <ErrorMessage
                        errors={errors}
                        name="zipCode"
                        as={<ErrorContainer />}
                      />
                    )}
                  </BillingFormGroup>
                  <BillingFormGroup>
                    <BillingFormGroupLabel htmlFor="address">
                      Address
                    </BillingFormGroupLabel>
                    <BillingFormGroupInput
                      type="text"
                      id="address"
                      name="address"
                      error={errors.address}
                      {...register("address", {
                        required: {
                          value: true,
                          message: "You must enter your address.",
                        },
                      })}
                    />
                    {errors.address && (
                      <ErrorMessage
                        errors={errors}
                        name="address"
                        as={<ErrorContainer />}
                      />
                    )}
                  </BillingFormGroup>
                  <BillingFormGroup>
                    <BillingFormGroupWrapper>
                      <BillingFormGroupInput
                        type="checkbox"
                        id="tos"
                        name="tos"
                        error={errors.address}
                        {...register("tos", {
                          required: {
                            value: true,
                            message: "You must accept the ToS.",
                          },
                        })}
                      />
                      <BillingFormGroupLabel htmlFor="tos">
                        I confirm that all the entered information is accurate
                        and I agree to your{" "}
                        <BillingFormGroupLink to="/tos">
                          Terms of Use.
                        </BillingFormGroupLink>
                      </BillingFormGroupLabel>
                    </BillingFormGroupWrapper>
                    {errors.tos && (
                      <ErrorMessage
                        errors={errors}
                        name="tos"
                        as={<ErrorContainer />}
                      />
                    )}
                  </BillingFormGroup>
                  <BillingFormGroup>
                    <BillingFormGroupButton type="submit">
                      Pay now
                    </BillingFormGroupButton>
                  </BillingFormGroup>
                </BillingFormGroups>
              </BillingForm>
            </Section>
          </Wrapper>
          <Resume>
            <ResumeOrder>
              <ResumeOrderTitle>My order</ResumeOrderTitle>
              <ResumeOrderContainer>
                <ResumeOrderContainerProducts>
                  <ResumeOrderContainerProductsItem>
                    <ResumeOrderContainerProductsItemImage
                      src={`${process.env.PUBLIC_URL}/assets/icons/lol.png`}
                      alt={checkout.name}
                    />
                    <ResumeOrderContainerProductsItemInfos>
                      <ResumeOrderContainerProductsItemInfosName>
                        {checkout.name}
                      </ResumeOrderContainerProductsItemInfosName>
                      <ResumeOrderContainerProductsItemInfosServer>
                        {checkout.server}
                      </ResumeOrderContainerProductsItemInfosServer>
                    </ResumeOrderContainerProductsItemInfos>
                  </ResumeOrderContainerProductsItem>
                </ResumeOrderContainerProducts>
              </ResumeOrderContainer>
            </ResumeOrder>
            <ResumeDiscount>
              <ResumeDiscountTitle>Discount code</ResumeDiscountTitle>
              <ResumeDiscountContainer>
                <ResumeDiscountContainerInput
                  type="text"
                  id="discount"
                  name="discount"
                  placeholder="Your discount"
                />
                <ResumeDiscountContainerButton type="submit">
                  <ResumeDiscountContainerButtonIcon
                    src={`${process.env.PUBLIC_URL}/assets/icons/chevron-right.png`}
                    alt="Submit discount code"
                  />
                </ResumeDiscountContainerButton>
              </ResumeDiscountContainer>
            </ResumeDiscount>
            <ResumeWarranty>
              <ResumeWarrantyTitle>Account warranty</ResumeWarrantyTitle>
              <ResumeWarrantySelect defaultValue="Life-time Warranty">
                <ResumeWarrantySelectOption disabled>
                  Select warranty
                </ResumeWarrantySelectOption>
                <ResumeWarrantySelectOption value="Life-time Warranty">
                  Life-time Warranty
                </ResumeWarrantySelectOption>
              </ResumeWarrantySelect>
            </ResumeWarranty>
            <ResumeInfos>
              <ResumeInfosTitle>Total amount</ResumeInfosTitle>
              <ResumeInfosTotal>
                <ResumeInfosTotalSpan>€</ResumeInfosTotalSpan>
                {checkout.price}
              </ResumeInfosTotal>
            </ResumeInfos>
          </Resume>
        </Main>
      ) : (
        <Main>
          <NoCheckout>
            <NoCheckoutImage
              src={`${process.env.PUBLIC_URL}/assets/icons/no_cart.svg`}
              alt="No checkout"
            />
            <NoCheckoutTitle>Your cart is empty</NoCheckoutTitle>
            <NoCheckoutDescription>
              Looks like you have not added anything to your cart.
            </NoCheckoutDescription>
            <NoCheckoutLink to={AppRoutes.Home}>Back</NoCheckoutLink>
          </NoCheckout>
        </Main>
      )}
      <Footer />
    </StyledCheckout>
  );
}

const StyledCheckout = styled.div``;
const Header = styled.header`
  padding: 10px 20px;
  background-color: ${Colors.primaryLowOp};
`;
const HeaderBrand = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderBrandLogo = styled.img`
  display: block;
  width: 60px;
  height: 60px;
  margin: 0 20px 0 0;
`;
const HeaderBrandTitle = styled.h2`
  color: white;
  margin: 0;
  padding: 0 0 0 20px;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
`;
const Main = styled.main`
  padding: 20px;
  width: 90%;
  margin: 0px auto;
  display: grid;
  gap: 30px;
  ${(props) => {
    if (props.grid) {
      return `
      @media screen and (min-width: 1024px) {
        grid-template-columns: repeat(2, max-content);
      }
      `;
    }
  }}
`;
const Wrapper = styled.div`
  background-color: ${Colors.primaryLowOp};
  border-radius: 20px;
  padding: 20px;
`;
const Section = styled.section``;
const SectionTitle = styled.h3`
  margin: 0 0 20px 0;
  color: white;
`;
const Payments = styled.div`
  margin: 0 0 20px 0;
`;
const BillingForm = styled.form``;
const BillingFormGroups = styled.div`
  display: grid;
  gap: 20px;
`;
const BillingFormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;
const BillingFormGroupWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const BillingFormGroupInput = styled.input`
  border-radius: 10px;
  border: 1px solid ${(props) => (props.error ? Colors.red : "transparent")};
  padding: 11px 18px;
  width: 100%;
  box-sizing: border-box;
  background-color: ${Colors.primaryLowOp};
  outline: none;
  color: white;
  font-size: inherit;
  font-family: inherit;

  &[type="checkbox"] {
    width: initial;
    margin: 0 10px 0 0;
    accent-color: ${Colors.primary};
    height: 16px;
    width: 16px;

    @media screen and (min-width: 1024px) {
      margin: 0 10px 0 0;
    }
  }
`;
const BillingFormGroupLabel = styled.label`
  color: white;
  margin: 0 0 10px 0;

  &:last-child {
    margin: 0;
  }
`;
const BillingFormGroupSelect = styled.select`
  border-radius: 10px;
  border: 1px solid transparent;
  padding: 11px 18px;
  width: 100%;
  box-sizing: border-box;
  background-color: ${Colors.primaryLowOp};
  outline: none;
  color: white;
  font-size: inherit;
  font-family: inherit;
`;
const BillingFormGroupSelectOption = styled.option``;
const BillingFormGroupLink = styled(Link)`
  text-decoration: none;
  color: ${Colors.primary};
  font-weight: bold;
`;
const BillingFormGroupButton = styled.button`
  color: ${Colors.primary};
  background-color: ${Colors.primaryLowOp};
  border-radius: 5px;
  border: none;
  font-family: inherit;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 11px 28px;
  display: block;
  transition: 0.2s;

  ${(props) => {
    if (props.disabled) {
      return `
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.3);
    `;
    } else {
      return `
    &:hover {
      cursor: pointer;
      transition: 0.2s;
      color: white;
      background-color: ${Colors.primary};
    }
    `;
    }
  }}
`;
const Resume = styled.div`
  background-color: ${Colors.primaryLowOp};
  border: 2px solid ${Colors.primary};
  border-radius: 20px;

  @media screen and (min-width: 1024px) {
    height: max-content;
  }
`;
const ResumeInfos = styled.div`
  padding: 20px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
`;
const ResumeInfosTitle = styled.h4`
  color: white;
  margin: 0;
  text-align: center;
`;
const ResumeInfosTotal = styled.p`
  color: white;
  margin: 0;
  font-weight: bold;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ResumeInfosTotalSpan = styled.span`
  font-size: 0.8rem;
  width: max-content;
`;
const ResumeDiscount = styled.div`
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  padding: 0 20px;
`;
const ResumeDiscountTitle = styled.p`
  color: white;
  font-weight: 600;
`;
const ResumeDiscountContainer = styled.div`
  display: flex;
  margin: 0 0 20px 0;
`;
const ResumeDiscountContainerInput = styled.input`
  border-radius: 10px;
  border: 1px solid transparent;
  padding: 11px 18px;
  width: 100%;
  box-sizing: border-box;
  background-color: ${Colors.primaryLowOp};
  outline: none;
  color: white;
  font-size: inherit;
  font-family: inherit;
`;
const ResumeDiscountContainerButton = styled.button`
  background-image: linear-gradient(
    147.16deg,
    #5a189a 13.82%,
    #7b2cbf 35.53%,
    #9d4edd 76.05%
  );
  border: none;
  border-radius: 10px;
  padding: 0 10px;
  margin: 0 0 0 10px;
  cursor: pointer;
`;
const ResumeDiscountContainerButtonIcon = styled.img`
  display: block;
  width: 14px;
  height: 14px;
  filter: invert(100%) sepia(0%) saturate(7465%) hue-rotate(297deg)
    brightness(121%) contrast(100%);
`;
const ResumeOrder = styled.div`
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  padding: 0 20px;
`;
const ResumeOrderTitle = styled.h2`
  color: white;
`;
const ResumeOrderContainer = styled.div``;
const ResumeOrderContainerProducts = styled.ul`
  list-style: none;
  padding: 0;
`;
const ResumeOrderContainerProductsItem = styled.li`
  display: flex;
  align-items: center;
`;
const ResumeOrderContainerProductsItemImage = styled.img`
  display: block;
  width: 45px;
  height: 45px;
`;
const ResumeOrderContainerProductsItemInfos = styled.div`
  margin: 0 0 0 10px;
`;
const ResumeOrderContainerProductsItemInfosName = styled.p`
  color: white;
  font-weight: bold;
  margin: 0;
`;
const ResumeOrderContainerProductsItemInfosServer = styled.p`
  color: ${Colors.primary};
  font-weight: bold;
  margin: 0;
  text-transform: uppercase;
`;
const ResumeWarranty = styled.div`
  padding: 20px;

  @media screen and (min-width: 1024px) {
    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  }
`;
const ResumeWarrantyTitle = styled.p`
  color: white;
  font-weight: 600;
  margin: 0 0 10px 0;
`;
const ResumeWarrantySelect = styled.select`
  width: 100%;
  background-color: ${Colors.primaryLowOp};
  border: none;
  border-radius: 10px;
  font-family: inherit;
  font-size: inherit;
  padding: 11px 18px;
  outline: none;
  color: white;
`;
const ResumeWarrantySelectOption = styled.option``;
const NoCheckout = styled.div`
  width: 90%;
  margin: 0 auto;
`;
const NoCheckoutImage = styled.img`
  display: block;
  margin: 0 auto;
  width: 180px;
  height: 180px;
`;
const NoCheckoutTitle = styled.h2`
  text-align: center;
  color: white;
`;
const NoCheckoutDescription = styled.p`
  margin: 0;
  color: white;
  text-align: center;
`;
const NoCheckoutLink = styled(Link)`
  background-image: linear-gradient(
    147.16deg,
    #5a189a 13.82%,
    #7b2cbf 35.53%,
    #9d4edd 76.05%
  );
  color: white;
  text-decoration: none;
  text-align: center;
  padding: 10px 20px;
  border-radius: 20px;
  display: block;
  max-width: 320px;
  font-weight: 700;
  margin: 30px auto 0 auto;
`;
