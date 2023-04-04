import React, { useEffect, useState, useRef } from "react";
import { Navigate, Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import ReCAPTCHA from "react-google-recaptcha";

import styled from "styled-components";

import ErrorContainer from "../utils/error-container.util";
import Colors from "../utils/colors.util";

import AppRoutes from "../router/app.routes";

import IndexDOM from "../dom/index.dom";

import axios from "axios";
import { API_ENDPOINTS } from "../api/api";

export default function Verification({ toast }) {
  const { token } = useParams();

  const [captchaResponse, setCaptchaResponse] = useState(null);

  const navigate = useNavigate();

  const recaptchaRef = useRef();

  const accessToken = useSelector((state) => state.user.token);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      token: token,
    },
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "initial";
    };
  });

  const onChange = (value) => {
    setCaptchaResponse(value);
  };

  const onSubmit = async (data) => {
    await axios
      .post(API_ENDPOINTS.USER_VERIFY, {
        token: data.token,
      })
      .then((res) => {
        if (res.status === 200) {
          reset();
          navigate(AppRoutes.Login);
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  if (accessToken) {
    return <Navigate to={AppRoutes.Home} />;
  }

  return (
    <StyledVerification>
      <Helmet>
        <title>Verification</title>
      </Helmet>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormTitle>Verification</FormTitle>
          <FormText>
            Didn't receive anything?{" "}
            <FormLink to={AppRoutes.Resend}>Send request.</FormLink>
          </FormText>
          <FormGroups>
            <FormGroup>
              <FormLabel htmlFor="token">Enter your token</FormLabel>
              <FormInput
                type="text"
                id="token"
                name="token"
                error={errors.token}
                {...register("token", {
                  required: {
                    value: true,
                    message: "You must enter a token.",
                  },
                })}
              />
              {errors.token && (
                <ErrorMessage
                  errors={errors}
                  name="token"
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
            </FormGroupRecaptcha>
            <FormGroup>
              <FormGroupButton type="submit" disabled={!captchaResponse}>
                Submit
              </FormGroupButton>
            </FormGroup>
          </FormGroups>
        </Form>
      </FormContainer>
      <IndexDOM />
    </StyledVerification>
  );
}

const StyledVerification = styled.div``;
const FormContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;
const Form = styled.form`
  background-color: ${Colors.gray};
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media screen and (min-width: 1024px) {
    max-width: 425px;
    margin: 60px auto;
    border-radius: 10px;
    border: 2px solid ${Colors.primary};
  }
`;
const FormTitle = styled.h1`
  margin: 0;
  color: white;
`;
const FormText = styled.p`
  color: rgba(255, 255, 255, 0.7);
`;
const FormLink = styled(Link)`
  color: ${Colors.primary};
  text-decoration: none;
  font-weight: 600;
`;
const FormGroups = styled.div``;
const FormGroup = styled.div`
  margin: 0 0 20px 0;

  &:last-child {
    margin: 20px 0 0 0;
  }
`;
const FormGroupRecaptcha = styled.div`
  transform: scale(0.85);
  transform-origin: 0 0;

  @media screen and (min-width: 425px) {
    transform: scale(1);
  }
`;
const FormLabel = styled.label`
  color: white;
`;
const FormInput = styled.input`
  margin: 10px 0 0 0;
  background-color: ${Colors.primaryLowOp};
  border-radius: 10px;
  width: 100%;
  border: 1px solid ${(props) => (props.error ? Colors.red : "transparent")};
  padding: 11px 18px;
  color: #ffffff;
  outline: none;
  font-family: inherit;
`;
const FormGroupButton = styled.button`
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