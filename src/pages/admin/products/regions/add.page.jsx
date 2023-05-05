import React from 'react'
import { Helmet } from 'react-helmet-async';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import axios from 'axios';
import AppRoutes from '../../../../router/app.routes';
import { API_ENDPOINTS } from "../../../../api/api"

import styled from 'styled-components'

import Navbar from '../../../../components/admin/navbar.component';
import Sidebar from '../../../../components/admin/sidebar.component';

import ErrorContainer from "../../../../utils/error-container.util";
import Colors from '../../../../utils/colors.util';
import { capitalizeFirstLetter } from '../../../../utils/string.util';

export default function AdminProductsRegionsAdd({ toast }) {
    const token = useSelector((state) => state.user.token);
    const userData = useSelector((state) => state.user.data);

    const { reset, register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const isGranted = token && userData.permission.includes("admin");

    const onSubmit = async (data) => {
        await axios.post(API_ENDPOINTS.PRODUCT_REGIONS_CREATE, {
            name: capitalizeFirstLetter(data.name),
            shortName: data.shortName.toUpperCase(),
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                if (res.status === 201) {
                    reset();

                    toast.success(res.data.message);

                    navigate(AppRoutes.AdminProductsRegions);
                }
            }).catch((err) => toast.error(err.response.data.message));
    }

    if (!isGranted) {
        return <Navigate to={AppRoutes.Login} />
    }

    return (
        <StyledUsers>
            <Helmet>
                <title>Admin Add Region</title>
            </Helmet>
            <Wrapper>
                <WrapperLeft>
                    <Sidebar />
                </WrapperLeft>
                <WrapperRight>
                    <Navbar />
                    <Container>
                        <ContainerHeader>
                            <ContainerHeaderTitle>Add Region</ContainerHeaderTitle>
                        </ContainerHeader>
                        <ContainerBody>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <FormGroups>
                                    <FormGroup>
                                        <FormGroupLabel htmlFor="name">Name</FormGroupLabel>
                                        <FormGroupInput
                                            type="text"
                                            id="name"
                                            name="name"
                                            error={errors.name}
                                            {...register("name", {
                                                required: {
                                                    value: true,
                                                    message: "You must enter a name.",
                                                },
                                            })}
                                        />
                                        {errors.name && (
                                            <ErrorMessage
                                                errors={errors}
                                                name="name"
                                                as={<ErrorContainer />}
                                            />
                                        )}
                                    </FormGroup>
                                    <FormGroup>
                                        <FormGroupLabel htmlFor="shortName">Short Name</FormGroupLabel>
                                        <FormGroupInput
                                            type="text"
                                            id="shortName"
                                            name="shortName"
                                            error={errors.shortName}
                                            {...register("shortName", {
                                                required: {
                                                    value: true,
                                                    message: "You must enter a short name.",
                                                },
                                                pattern: {
                                                    value: /^[a-zA-Z]{2,4}$/,
                                                    message: "Invalid short name format.",
                                                },
                                                max: {
                                                    value: 4,
                                                    message: "You can't put more than four characters."
                                                }
                                            })}
                                        />
                                        {errors.shortName && (
                                            <ErrorMessage
                                                errors={errors}
                                                name="shortName"
                                                as={<ErrorContainer />}
                                            />
                                        )}
                                    </FormGroup>
                                    <FormGroup>
                                        <FormSubmitButton type='submit'>Submit</FormSubmitButton>
                                    </FormGroup>
                                </FormGroups>
                            </Form>
                        </ContainerBody>
                    </Container>
                </WrapperRight>
            </Wrapper>
        </StyledUsers>
    )
}

const StyledUsers = styled.div``;
const Wrapper = styled.div`
@media screen and (min-width: 1024px) {
    display: flex;
  }
`;
const WrapperLeft = styled.div``;
const WrapperRight = styled.div`
width: 100%;
`;
const Container = styled.div`
padding:20px;`;
const ContainerHeader = styled.div`
@media screen and (min-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
`;
const ContainerHeaderTitle = styled.h1`
color: white;
margin: 0;
`;
const ContainerBody = styled.div``;
const Form = styled.form`
margin: 30px 0;
max-width: 425px;
`;
const FormGroups = styled.div``;
const FormGroup = styled.div`
display: flex;
flex-direction: column;
margin-top: 20px;
`;
const FormGroupLabel = styled.label`
color: rgba(255,255,255,.7);
`;
const FormGroupInput = styled.input`
margin-top: 5px;
border: 1px solid ${(props) => (props.error ? Colors.red : "lightgray")};
font-family: inherit;
border-radius: 2px;
background-color: transparent;
outline: none;
color: white;
padding: 7px 10px;
transition: 0.2s;

&:focus {
    transition: 0.2s;
    border: 1px solid ${(props) => (props.error ? Colors.red : Colors.primary)};
}
`;
const FormSubmitButton = styled.button`
margin-top: 30px;
background-color: ${Colors.primary};
color: white;
text-decoration: none;
padding: 5px 10px;
display:block;
text-align: center;
border: none;
border-radius: 2px;
transition: 0.2s;
font-family: inherit;
font-weight: 600;

&:hover {
    transition: 0.2s;
    -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
  }
`;