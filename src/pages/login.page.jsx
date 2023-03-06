import React, { useEffect, useState, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setData } from "../redux/reducers/user.reducer";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Helmet } from "react-helmet-async";
import ReCAPTCHA from "react-google-recaptcha";

import jwtDecode from "jwt-decode";

import styled from "styled-components";

import Button from "../components/utils/button.component";

import ErrorContainer from "../utils/error-container.util";
import { PasswordRegEx, EmailRegEx } from "../utils/regex.util";
import Colors from "../utils/colors.util";

import axios from "axios";

import AppRoutes from "../router/app.routes";

import IndexDOM from "../dom/index.dom";

const FormTypes = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  FORGOT: "FORGOT",
};

export default function Login({ toast }) {
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();

  const [captchaResponse, setCaptchaResponse] = useState(null);
  const [formType, setFormType] = useState(FormTypes.LOGIN);

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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "initial";
    };
  });

  useEffect(() => {
    reset();
    setCaptchaResponse(null);
    recaptchaRef.current.reset();
  }, [formType]);

  const onChange = (value) => {
    setCaptchaResponse(value);
  };

  const onChangeFormType = (event, type) => {
    event.preventDefault();
    setFormType(type);
  };

  const onSubmit = async (data) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/users/login`, {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        if (res.status === 200) {
          const accessToken = res.data.accessToken;
          const decoded = jwtDecode(accessToken);

          localStorage.setItem("data", JSON.stringify(decoded));
          localStorage.setItem("token", accessToken);

          dispatch(setData(decoded));
          dispatch(setToken(accessToken));

          reset();

          recaptchaRef.current.reset();

          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  if (token) {
    return <Navigate to={AppRoutes.Home} />;
  }

  return (
    <StyledLogin>
      <Helmet>
        {formType === FormTypes.LOGIN ? (
          <title>Login</title>
        ) : formType === FormTypes.REGISTER ? (
          <title>Register</title>
        ) : (
          <title>Forgot password</title>
        )}
      </Helmet>
      <FormContainer>
        {formType === FormTypes.LOGIN ? (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormWrapper>
              <FormWrapperTitle>Sign In</FormWrapperTitle>
              <FormWrapperClose to={AppRoutes.Home}>
                <FormWrapperCloseIcon
                  src={`${process.env.PUBLIC_URL}/assets/icons/close.svg`}
                  alt="Close"
                />
              </FormWrapperClose>
            </FormWrapper>
            <FormText>
              New user?{" "}
              <FormLink
                onClick={(event) => onChangeFormType(event, FormTypes.REGISTER)}
              >
                Create an account
              </FormLink>
            </FormText>
            <FormGroups>
              <FormGroups>
                <FormGroup>
                  <FormGroupLabel htmlFor="email">Email</FormGroupLabel>
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
                  <FormGroupLabel htmlFor="password">Password</FormGroupLabel>
                  <FormGroupInput
                    type="password"
                    id="password"
                    name="password"
                    error={errors.password}
                    {...register("password", {
                      required: {
                        value: true,
                        message: "You must enter your password.",
                      },
                      minLength: {
                        value: 8,
                        message: "Your password must be at least 8 characters.",
                      },
                      pattern: {
                        value: PasswordRegEx,
                        message: "Invalid password format.",
                      },
                    })}
                  />
                  {errors.password && (
                    <ErrorMessage
                      errors={errors}
                      name="password"
                      as={<ErrorContainer />}
                    />
                  )}
                </FormGroup>
                <FormGroup>
                  <FormLink
                    onClick={(event) =>
                      onChangeFormType(event, FormTypes.FORGOT)
                    }
                  >
                    Forgot password?
                  </FormLink>
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
                  <Button
                    type={"submit"}
                    title="Sign in"
                    disabled={!captchaResponse}
                  />
                </FormGroup>
              </FormGroups>
            </FormGroups>
          </Form>
        ) : formType === FormTypes.REGISTER ? (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormWrapper>
              <FormWrapperTitle>Create an account</FormWrapperTitle>
              <FormWrapperClose to={AppRoutes.Home}>
                <FormWrapperCloseIcon
                  src={`${process.env.PUBLIC_URL}/assets/icons/close.svg`}
                  alt="Close"
                />
              </FormWrapperClose>
            </FormWrapper>
            <FormText>
              Already have an account?{" "}
              <FormLink
                onClick={(event) => onChangeFormType(event, FormTypes.LOGIN)}
              >
                Sign in
              </FormLink>
            </FormText>
            <FormGroups>
              <FormGroups>
                <FormGroup>
                  <FormGroupLabel htmlFor="username">Username</FormGroupLabel>
                  <FormGroupInput
                    type="text"
                    id="username"
                    name="username"
                    error={errors.username}
                    {...register("username", {
                      required: {
                        value: true,
                        message: "You must enter your username.",
                      },
                    })}
                  />
                  {errors.username && (
                    <ErrorMessage
                      errors={errors}
                      name="username"
                      as={<ErrorContainer />}
                    />
                  )}
                </FormGroup>
                <FormGroup>
                  <FormGroupLabel htmlFor="email">Email</FormGroupLabel>
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
                  <FormGroupLabel htmlFor="password">Password</FormGroupLabel>
                  <FormGroupInput
                    type="password"
                    id="password"
                    name="password"
                    error={errors.password}
                    {...register("password", {
                      required: {
                        value: true,
                        message: "You must enter your password.",
                      },
                      minLength: {
                        value: 8,
                        message: "Your password must be at least 8 characters.",
                      },
                      pattern: {
                        value: PasswordRegEx,
                        message: "Invalid password format.",
                      },
                    })}
                  />
                  {errors.password && (
                    <ErrorMessage
                      errors={errors}
                      name="password"
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
                  <Button type="submit" title="Submit" />
                </FormGroup>
              </FormGroups>
            </FormGroups>
          </Form>
        ) : (
          <Form></Form>
        )}
      </FormContainer>
      <IndexDOM />
    </StyledLogin>
  );
}

const StyledLogin = styled.div``;
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
const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const FormWrapperTitle = styled.h1`
  margin: 0;
  color: white;
`;
const FormWrapperClose = styled(Link)`
  text-decoration: none;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  padding: 10px;
`;
const FormWrapperCloseIcon = styled.img`
  display: block;
  width: 18px;
  height: 18px;
`;
const FormText = styled.p`
  color: rgba(255, 255, 255, 0.7);
`;
const FormLink = styled.button`
  color: ${Colors.primary};
  font-size: inherit;
  font-weight: inherit;
  background-color: transparent;
  border: none;
`;
const FormGroups = styled.div``;
const FormGroup = styled.div`
  margin: 0 0 20px 0;

  &:last-child {
    margin: 20px 0 0 0;
  }
`;
const FormGroupLabel = styled.label`
  color: white;
`;
const FormGroupInput = styled.input`
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
const FormGroupRecaptcha = styled.div`
  transform: scale(0.85);
  transform-origin: 0 0;

  @media screen and (min-width: 425px) {
    transform: scale(1);
  }
`;
