import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setData } from "../redux/reducers/user.reducer";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Helmet } from "react-helmet-async";

import jwtDecode from "jwt-decode";

import styled from "styled-components";

import Header from "../components/header.component";
import Footer from "../components/footer.component";
import Button from "../components/utils/button.component";
import Toast, { ToastTypes } from "../components/utils/toast.component";

import ErrorContainer from "../utils/error-container.util";
import { PasswordRegEx, EmailRegEx } from "../utils/regex.util";
import Colors from "../utils/colors.util";

import axios from "axios";

export default function Login({ toast, setToast }) {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    reset,
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    email: "",
    password: "",
  });

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
          setToast({ type: ToastTypes.SUCCESS, message: res.data.message });
        }
      })
      .catch((err) => {
        setToast({
          type: ToastTypes.ERROR,
          message: err.response.data.message,
        });
      });
  };

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <StyledLogin>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Header />
      <Main>
        <Toast type={toast.type} message={toast.message} setToast={setToast} />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormTitle>Sign In</FormTitle>
          <FormText>
            New user? <FormLink to="/register">Create an account</FormLink>
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
              <FormLink to="/">Forgot password?</FormLink>
              <FormGroup>
                <Button type={"submit"} title="Sign in" />
              </FormGroup>
            </FormGroups>
          </FormGroups>
        </Form>
      </Main>
      <Footer />
    </StyledLogin>
  );
}

const StyledLogin = styled.div``;
const Main = styled.main``;
const Form = styled.form`
  background-color: ${Colors.gray};
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;

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
