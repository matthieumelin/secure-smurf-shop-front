import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import styled from "styled-components";
import Footer from "../components/footer.component";
import Navbar from "../components/navbar.component";
// import ContactCard from "../components/cards/contact-card.component";

import AppRoutes from "../router/app.routes";

import Colors from "../utils/colors.util";
import { EmailRegEx } from "../utils/regex.util";
import ErrorContainer from "../utils/error-container.util";

import axios from "axios";
import { API_ENDPOINTS } from "../api/api";

export default function Contact({ toast }) {
  // const [cards, setCards] = useState([]);

  const [captchaResponse, setCaptchaResponse] = useState(null);

  const recaptchaRef = useRef();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onChange = (value) => {
    setCaptchaResponse(value);
  };

  // useEffect(() => {
  //   axios
  //     .get("./data.json")
  //     .then((res) => setCards(res.data.contact.cards))
  //     .catch((err) => console.error(err));
  // }, []);

  const onSubmit = async (data) => {
    await axios
      .post(API_ENDPOINTS.CONTACT, {
        email: data.email,
        category: data.category,
        message: data.message,
      })
      .then((res) => {
        if (res.status === 200) {
          reset();

          recaptchaRef.current.reset();

          setCaptchaResponse(null);

          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <StyledContact>
      <Helmet>
        <title>Contact us</title>
      </Helmet>
      <Header>
        <Navbar />
        <HeaderContent>
          <HeaderTitle>Help Center</HeaderTitle>
          <HeaderDescription>
            Do you have questions, comments or do you want become a booster?
            Contact us and we will arange it.
          </HeaderDescription>
        </HeaderContent>
      </Header>
      <Main>
        {/* <Cards>
          {cards &&
            cards.map((card, index) => {
              return <ContactCard key={`contact_card_${index}`} data={card} />;
            })}
        </Cards> */}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormHeader>
            <FormHeaderTitle>How can we help you?</FormHeaderTitle>
            <FormHeaderDescription>
              Do you have any questions? Great, because we have answers!
            </FormHeaderDescription>
            <FormHeaderSocials>
              <FormHeaderSocialsTitle>Get in touch</FormHeaderSocialsTitle>
              <FormHeaderSocialsMenu>
                <FormHeaderSocialsMenuItem>
                  <FormHeaderSocialsMenuItemLink to={AppRoutes.Home}>
                    <FormHeaderSocialsMenuItemLinkIcon
                      src={`${process.env.PUBLIC_URL}/assets/icons/facebook.svg`}
                      alt="Facebook"
                    />
                  </FormHeaderSocialsMenuItemLink>
                </FormHeaderSocialsMenuItem>
                <FormHeaderSocialsMenuItem>
                  <FormHeaderSocialsMenuItemLink to={AppRoutes.Home}>
                    <FormHeaderSocialsMenuItemLinkIcon
                      src={`${process.env.PUBLIC_URL}/assets/icons/instagram.svg`}
                      alt="Instagram"
                    />
                  </FormHeaderSocialsMenuItemLink>
                </FormHeaderSocialsMenuItem>
                <FormHeaderSocialsMenuItem>
                  <FormHeaderSocialsMenuItemLink to={AppRoutes.Home}>
                    <FormHeaderSocialsMenuItemLinkIcon
                      src={`${process.env.PUBLIC_URL}/assets/icons/twitter.svg`}
                      alt="Twitter"
                    />
                  </FormHeaderSocialsMenuItemLink>
                </FormHeaderSocialsMenuItem>
              </FormHeaderSocialsMenu>
            </FormHeaderSocials>
          </FormHeader>
          <FormGroups>
            <FormGroupWrapper>
              <FormGroup>
                <FormGroupLabel htmlFor="email">E-mail</FormGroupLabel>
                <FormGroupInput
                  type="email"
                  id="email"
                  name="email"
                  error={errors.email}
                  {...register("email", {
                    required: {
                      value: true,
                      message: "You must enter your email.",
                    },
                    pattern: {
                      value: EmailRegEx,
                      message: "Invalid email format.",
                    },
                  })}
                />
                {errors.email && (
                  <ErrorMessage
                    errors={errors}
                    name="email"
                    as={<ErrorContainer />}
                  />
                )}
              </FormGroup>
              <FormGroup>
                <FormGroupLabel htmlFor="email">Category</FormGroupLabel>
                <FormGroupSelect
                  id="category"
                  name="category"
                  {...register("category")}
                >
                  <FormGroupSelectOption value="General question">
                    General question
                  </FormGroupSelectOption>
                  <FormGroupSelectOption value="Order issue">
                    Order issue
                  </FormGroupSelectOption>
                  <FormGroupSelectOption value="Application">
                    Application
                  </FormGroupSelectOption>
                  <FormGroupSelectOption value="Bug report">
                    Bug report
                  </FormGroupSelectOption>
                  <FormGroupSelectOption value="Other">
                    Other
                  </FormGroupSelectOption>
                </FormGroupSelect>
              </FormGroup>
            </FormGroupWrapper>
            <FormGroup>
              <FormGroupLabel htmlFor="message">Message</FormGroupLabel>
              <FormGroupTextArea
                rows={3}
                id="message"
                name="message"
                error={errors.message}
                {...register("message", {
                  required: {
                    value: true,
                    message: "You must enter a message.",
                  },
                })}
              />
              {errors.message && (
                <ErrorMessage
                  errors={errors}
                  name="message"
                  as={<ErrorContainer />}
                />
              )}
            </FormGroup>
            <FormGroupRecaptcha>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.REACT_APP_CAPTCHA_KEY}
                onChange={onChange}
              />
              {errors.captcha && (
                <ErrorMessage
                  errors={errors}
                  name="captcha"
                  as={<ErrorContainer />}
                />
              )}
            </FormGroupRecaptcha>
            <FormGroup>
              <FormSubmitButton type="submit" disabled={!captchaResponse}>
                Send message
              </FormSubmitButton>
            </FormGroup>
          </FormGroups>
        </Form>
      </Main>
      <Footer />
    </StyledContact>
  );
}

const StyledContact = styled.div``;
const Header = styled.header``;
const HeaderContent = styled.div`
  padding: 20px;
  max-width: 90%;
  margin: 0 auto;
`;
const HeaderTitle = styled.h1`
  color: white;
  margin: 0 0 10px 0;

  @media screen and (min-width: 1024px) {
    text-align: center;
  }
`;
const HeaderDescription = styled.p`
  color: rgb(157 78 221 / 1);
  margin: 0;
  @media screen and (min-width: 1024px) {
    text-align: center;
  }
`;
const Main = styled.main`
  max-width: 90%;
  margin: 0 auto;
  padding: 20px;
`;
// const Cards = styled.section`
//   @media screen and (min-width: 1024px) {
//     display: grid;
//     grid-template-columns: repeat(2, 0.3fr);
//   }
// `;
const Form = styled.form`
  padding: 30px;
  border-radius: 20px;
  margin: 30px 0 0 0;
  background-color: ${Colors.primaryLowOp};

  @media screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: 325px 1fr;
    gap: 30px;
  }
`;
const FormHeader = styled.div``;
const FormHeaderTitle = styled.h2`
  margin: 0;
  color: white;

  @media screen and (min-width: 1024px) {
    font-size: 2.75rem;
  }
`;
const FormHeaderDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
`;
const FormHeaderSocials = styled.div``;
const FormHeaderSocialsTitle = styled.h3`
  color: white;
  font-size: 1.3rem;
`;
const FormHeaderSocialsMenu = styled.ul`
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, max-content);
  gap: 10px;
  list-style: none;
`;
const FormHeaderSocialsMenuItem = styled.li``;
const FormHeaderSocialsMenuItemLink = styled(Link)`
  height: 32px;
  width: 32px;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: ${Colors.primaryLowOp};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;

  &:hover {
    transition: 0.2s;
    -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
  }

  @media screen and (min-width: 1024px) {
    width: 42px;
    height: 42px;
  }
`;
const FormHeaderSocialsMenuItemLinkIcon = styled.img`
  width: 18px;
  height: 18px;

  @media screen and (min-width: 1024px) {
    width: 20px;
    height: 20px;
  }
`;
const FormGroups = styled.div``;
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 20px 0;
`;
const FormGroupWrapper = styled.div`
  @media screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
`;
const FormGroupLabel = styled.label`
  color: white;
`;
const FormGroupInput = styled.input`
  margin: 10px 0 0 0;
  background-color: ${Colors.primaryLowOp};
  border-radius: 10px;
  border: 1px solid ${(props) => (props.error ? Colors.red : "transparent")};
  padding: 11px 18px;
  color: #ffffff;
  outline: none;
  font-family: inherit;
`;
const FormGroupTextArea = styled.textarea`
  margin: 10px 0 0 0;
  background-color: ${Colors.primaryLowOp};
  border-radius: 10px;
  min-height: 100px;
  border: 1px solid ${(props) => (props.error ? Colors.red : "transparent")};
  padding: 11px 18px;
  color: #ffffff;
  outline: none;
  font-family: inherit;
  resize: vertical;
`;
const FormGroupSelect = styled.select`
  margin: 10px 0 0 0;
  background-color: ${Colors.primaryLowOp};
  border-radius: 10px;
  border: 1px solid ${(props) => (props.error ? Colors.red : "transparent")};
  padding: 11px 18px;
  color: #ffffff;
  outline: none;
  font-family: inherit;
`;
const FormGroupSelectOption = styled.option``;
const FormGroupRecaptcha = styled.div`
  transform: scale(0.7);
  transform-origin: 0 0;

  @media screen and (min-width: 425px) {
    transform: scale(1);
    margin: 0 0 20px 0;
  }
`;
const FormSubmitButton = styled.button`
  color: ${Colors.primary};
  background-color: ${Colors.primaryLowOp};
  border-radius: 20px;
  border: none;
  font-family: inherit;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 11px 28px;
  width: max-content;
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
