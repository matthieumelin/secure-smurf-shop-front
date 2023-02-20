import React from "react";
import { Navigate, Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import styled from "styled-components";

import Header from "../components/header.component";
import Footer from "../components/footer.component";
import Button from "../components/utils/button.component";

import ErrorContainer from "../utils/error-container.util";
import Colors from "../utils/colors.util";

import { ToastTypes } from "../components/utils/toast.component";

import axios from "axios";

export default function Verification({ setToast }) {
  const accessToken = useSelector((state) => state.user.token);

  const { token } = useParams();

  const navigate = useNavigate();

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

  const onSubmit = async (data) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/users/verify`, {
        token: data.token,
      })
      .then((res) => {
        if (res.status === 200) {
          reset();
          navigate("/login");
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

  if (accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <StyledVerification>
      <Helmet>
        <title>Verification</title>
      </Helmet>
      <Header />
      <Main>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormTitle>Verification</FormTitle>
          <FormText>
            Didn't receive anything?{" "}
            <FormLink to="/resend">Send request.</FormLink>
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
            <FormGroup>
              <Button type="submit" title={"Submit"} />
            </FormGroup>
          </FormGroups>
        </Form>
      </Main>
      <Footer />
    </StyledVerification>
  );
}

const StyledVerification = styled.div``;
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
