import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import axios from 'axios';
import AppRoutes from '../../../router/app.routes';
import { API_ENDPOINTS } from "../../../api/api"

import styled from 'styled-components'

import Navbar from '../../../components/admin/navbar.component';
import Sidebar from '../../../components/admin/sidebar.component';

import ErrorContainer from "../../../utils/error-container.util";
import Colors from '../../../utils/colors.util';
import { capitalizeFirstLetter } from '../../../utils/string.util';
import { useEffect } from 'react';

export default function AdminProductAdd({ toast }) {
    // Redux
    const token = useSelector((state) => state.user.token);
    const userData = useSelector((state) => state.user.data);

    // States
    const [productTypes, setProductTypes] = useState([]);

    // Hook form
    const { reset, register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    // Page access
    const isGranted = token && userData.permission.includes("admin");

    useEffect(() => {
        const fetchProductTypes = async () => {
            await axios.get(API_ENDPOINTS.PRODUCT_TYPES, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then((res) => { if (res.status === 200) setProductTypes(res.data) })
        }

        if (isGranted) fetchProductTypes();
    }, [isGranted])

    const onSubmit = async (data) => {
        await axios.post(API_ENDPOINTS.PRODUCT_CREATE, {
            name: capitalizeFirstLetter(data.name),
            price: data.price,
            features: data.features,
            region: data.region.toUpperCase(),
            type: data.type,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                if (res.status === 201) {
                    reset();

                    toast.success(res.data.message);

                    navigate(AppRoutes.AdminProducts);
                }
            }).catch((err) => { if (err) toast.error(err.response.data.message) });
    }

    if (!isGranted) {
        return <Navigate to={AppRoutes.Login} />
    }

    return (
        <StyledUsers>
            <Helmet>
                <title>Admin Add Product</title>
            </Helmet>
            <Wrapper>
                <WrapperLeft>
                    <Sidebar />
                </WrapperLeft>
                <WrapperRight>
                    <Navbar />
                    <Container>
                        <ContainerHeader>
                            <ContainerHeaderLeft>
                                <ContainerHeaderLeftBack to={AppRoutes.AdminProducts}>
                                    <ContainerHeaderLeftBackIcon src={`${process.env.PUBLIC_URL}/assets/icons/chevron-left.png`} alt='Back' />
                                </ContainerHeaderLeftBack>
                                <ContainerHeaderLeftTitle>Add Product</ContainerHeaderLeftTitle>
                            </ContainerHeaderLeft>
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
                                        <FormGroupLabel htmlFor="price">Price</FormGroupLabel>
                                        <FormGroupInput
                                            type="number"
                                            id="price"
                                            name="price"
                                            error={errors.price}
                                            {...register("price", {
                                                required: {
                                                    value: true,
                                                    message: "You must enter a price.",
                                                },
                                            })}
                                        />
                                        {errors.price && (
                                            <ErrorMessage
                                                errors={errors}
                                                name="price"
                                                as={<ErrorContainer />}
                                            />
                                        )}
                                    </FormGroup>
                                    <FormGroup>
                                        <FormGroupLabel htmlFor="type">Type</FormGroupLabel>
                                        <FormGroupSelect
                                            id="type"
                                            name="type"
                                            error={errors.type}
                                            {...register("type", {
                                                required: {
                                                    value: true,
                                                    message: "You must select a type.",
                                                },
                                            })}>
                                            {productTypes.length ?
                                                (
                                                    productTypes.map((productType) => {
                                                        return <FormGroupSelectOption value={productType.name}>{productType.name}</FormGroupSelectOption>
                                                    })
                                                ) : <FormGroupSelectOption>No type</FormGroupSelectOption>}
                                        </FormGroupSelect>
                                        {errors.type && (
                                            <ErrorMessage
                                                errors={errors}
                                                name="type"
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
const ContainerHeaderLeft = styled.div`
@media screen and (min-width: 768px) {
    display: flex;
align-items: center;
}
`;
const ContainerHeaderLeftBack = styled(Link)`
background-color: ${Colors.primary};
display: block;
padding: 10px;
border-radius: 100px;
width: max-content;
margin-bottom: 10px;

@media screen and (min-width: 768px) {
    margin-bottom: 0px;
    margin-right: 20px;
}
`;
const ContainerHeaderLeftBackIcon = styled.img`
display: block;
width: 18px;
height: 18px;
filter: invert(100%) sepia(0%) saturate(7500%) hue-rotate(152deg) brightness(116%) contrast(101%);
`;
const ContainerHeaderLeftTitle = styled.h1`
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
const FormGroupSelect = styled.select`
margin-top: 5px;
border: 1px solid ${(props) => (props.error ? Colors.red : "lightgray")};
font-family: inherit;
border-radius: 2px;
background-color: transparent;
outline: none;
color: white;
padding: 7px 10px;
transition: 0.2s;
`;
const FormGroupSelectOption = styled.option`
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
cursor: pointer;

&:hover {
    transition: 0.2s;
    -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
  }
`;