import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";

import Colors from "../../utils/colors.util";

import Button from "../utils/button.component";

import ErrorContainer from "../../utils/error-container.util";
import { PasswordRegEx, EmailRegEx } from "../../utils/regex.util";

import axios from "axios";

const States = {
  CONNECTION: "CONNECTION",
  REGISTRATION: "REGISTRATION",
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
};

export default function ConnectionModal({ setModalIsOpen }) {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const [currentState, setCurrentState] = useState(States.CONNECTION);
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const {
    reset,
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    connectionEmail: "",
    connectionPassword: "",
    registrationUsername: "",
    registrationEmail: "",
    registrationPassword: "",
  });

  // useEffect(() => {
  //   clearErrors();
  //   setSuccess("");
  // }, [currentState]);

  const onSend = async (data) => {
    switch (currentState) {
      case States.CONNECTION:
        break;
      case States.REGISTRATION:
        await axios
          .post(`${process.env.REACT_APP_API_URL}/users/register`, {
            username: data.registrationUsername,
            email: data.registrationEmail,
            password: data.registrationPassword,
          })
          .then((res) => {
            if (res.status === 201) {
              reset();
              setSuccess(res.data.message);
              navigate("/login");
            }
          })
          .catch((err) => {
            console.error(err);
          });
        break;
      default:
        break;
    }
  };

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <StyledConnectionModal>
      {currentState === States.CONNECTION ? (
        <ConnectionModalForm onSubmit={handleSubmit(onSend)}>
          <ConnectionModalFormWrapper>
            <ConnectionModalFormTitle>Sign In</ConnectionModalFormTitle>
            <ConnectionModalFormClose onClick={() => setModalIsOpen(false)}>
              <ConnectionModalFormCloseIcon icon={faTimes} />
            </ConnectionModalFormClose>
          </ConnectionModalFormWrapper>
          <ConnectionModalFormText>
            New user?{" "}
            <ConnectionModalFormLink
              to="/"
              onClick={() => setCurrentState(States.REGISTRATION)}
            >
              Create an account
            </ConnectionModalFormLink>
          </ConnectionModalFormText>
          <ConnectionModalFormGroups>
            <ConnectionModalFormGroups>
              <ConnectionModalFormGroup>
                <ConnectionModalFormGroupLabel htmlFor="connectionEmail">
                  Email
                </ConnectionModalFormGroupLabel>
                <ConnectionModalFormGroupInput
                  type="email"
                  id="connectionEmail"
                  name="connectionEmail"
                  error={errors.connectionEmail}
                  {...register("connectionEmail", {
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
                {errors.connectionEmail && (
                  <ErrorMessage
                    errors={errors}
                    name="connectionEmail"
                    as={<ErrorContainer />}
                  />
                )}
              </ConnectionModalFormGroup>
              <ConnectionModalFormGroup>
                <ConnectionModalFormGroupLabel htmlFor="connectionPassword">
                  Password
                </ConnectionModalFormGroupLabel>
                <ConnectionModalFormGroupInput
                  type="password"
                  id="connectionPassword"
                  name="connectionPassword"
                  error={errors.connectionPassword}
                  {...register("connectionPassword", {
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
                {errors.connectionPassword && (
                  <ErrorMessage
                    errors={errors}
                    name="connectionPassword"
                    as={<ErrorContainer />}
                  />
                )}
              </ConnectionModalFormGroup>
              <ConnectionModalFormLink to="/">
                Forgot password?
              </ConnectionModalFormLink>
              <ConnectionModalFormGroup>
                <Button type={"submit"} title="Sign in" />
              </ConnectionModalFormGroup>
            </ConnectionModalFormGroups>
          </ConnectionModalFormGroups>
        </ConnectionModalForm>
      ) : currentState === States.REGISTRATION ? (
        <ConnectionModalForm onSubmit={handleSubmit(onSend)}>
          <ConnectionModalFormWrapper>
            <ConnectionModalFormTitle>
              Create an account
            </ConnectionModalFormTitle>
            <ConnectionModalFormClose onClick={() => setModalIsOpen(false)}>
              <ConnectionModalFormCloseIcon icon={faTimes} />
            </ConnectionModalFormClose>
          </ConnectionModalFormWrapper>
          <ConnectionModalFormText>
            Already have an account?{" "}
            <ConnectionModalFormLink
              to="/"
              onClick={() => setCurrentState(States.CONNECTION)}
            >
              Sign in
            </ConnectionModalFormLink>
          </ConnectionModalFormText>
          <ConnectionModalFormGroups>
            <ConnectionModalFormGroups>
              <ConnectionModalFormGroup>
                <ConnectionModalFormGroupLabel htmlFor="registrationUsername">
                  Username
                </ConnectionModalFormGroupLabel>
                <ConnectionModalFormGroupInput
                  type="text"
                  id="registrationUsername"
                  name="registrationUsername"
                  error={errors.registrationUsername}
                  {...register("registrationUsername", {
                    required: {
                      value: true,
                      message: "You must enter your username.",
                    },
                  })}
                />
                {errors.registrationUsername && (
                  <ErrorMessage
                    errors={errors}
                    name="registrationUsername"
                    as={<ErrorContainer />}
                  />
                )}
              </ConnectionModalFormGroup>
              <ConnectionModalFormGroup>
                <ConnectionModalFormGroupLabel htmlFor="registrationEmail">
                  Email
                </ConnectionModalFormGroupLabel>
                <ConnectionModalFormGroupInput
                  type="email"
                  id="registrationEmail"
                  name="registrationEmail"
                  error={errors.registrationEmail}
                  {...register("registrationEmail", {
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
                {errors.registrationEmail && (
                  <ErrorMessage
                    errors={errors}
                    name="registrationEmail"
                    as={<ErrorContainer />}
                  />
                )}
              </ConnectionModalFormGroup>
              <ConnectionModalFormGroup>
                <ConnectionModalFormGroupLabel htmlFor="registrationPassword">
                  Password
                </ConnectionModalFormGroupLabel>
                <ConnectionModalFormGroupInput
                  type="password"
                  id="registrationPassword"
                  name="registrationPassword"
                  error={errors.registrationPassword}
                  {...register("registrationPassword", {
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
                {errors.registrationPassword && (
                  <ErrorMessage
                    errors={errors}
                    name="registrationPassword"
                    as={<ErrorContainer />}
                  />
                )}
              </ConnectionModalFormGroup>
              <ConnectionModalFormGroup>
                <Button type={"submit"} title="Submit" />
              </ConnectionModalFormGroup>
            </ConnectionModalFormGroups>
          </ConnectionModalFormGroups>
        </ConnectionModalForm>
      ) : (
        <ConnectionModalForm></ConnectionModalForm>
      )}
    </StyledConnectionModal>
  );
}

const StyledConnectionModal = styled.div`
  background-color: ${Colors.primaryLowOp};
  z-index: 999;

  @media screen and (min-width: 1024px) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`;
const ConnectionModalForm = styled.form`
  background-color: ${Colors.gray};
  padding: 30px;
  position: fixed;
  z-index: 9999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (min-width: 1024px) {
    max-width: 425px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    border: 2px solid ${Colors.primary};
  }
`;
const ConnectionModalFormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ConnectionModalFormClose = styled.button`
  background-color: transparent;
  border: 2px solid ${Colors.primaryLowOp};
  border-radius: 100px;
  padding: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const ConnectionModalFormCloseIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 1.2rem;
  width: 20px;
  height: 20px;
`;
const ConnectionModalFormTitle = styled.h1`
  margin: 0;
  color: white;
`;
const ConnectionModalFormText = styled.p`
  color: rgba(255, 255, 255, 0.7);
`;
const ConnectionModalFormLink = styled(Link)`
  color: ${Colors.primary};
  text-decoration: none;
  font-weight: 600;
`;
const ConnectionModalFormGroups = styled.div``;
const ConnectionModalFormGroup = styled.div`
  margin: 0 0 20px 0;

  &:last-child {
    margin: 20px 0 0 0;
  }
`;
const ConnectionModalFormGroupLabel = styled.label`
  color: white;
`;
const ConnectionModalFormGroupInput = styled.input`
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
