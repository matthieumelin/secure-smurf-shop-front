import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
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

export default function AdminProductRegionEdit({ toast }) {
    // Router
    const { id } = useParams();
    const navigate = useNavigate();

    // Redux
    const token = useSelector((state) => state.user.token);
    const userData = useSelector((state) => state.user.data);

    // States
    const [processing, setProcessing] = useState(false);

    // Hook form
    const { reset, register, handleSubmit, setValue, formState: { errors } } = useForm();

    // Page access
    const isGranted = id && token && userData.permission.includes("admin");

    useEffect(() => {
        const fetchProductRegion = async () => {
            await axios.get(`${API_ENDPOINTS.PRODUCT_REGIONS}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                if (res.status === 200) {
                    const data = res.data;

                    setValue("name", capitalizeFirstLetter(data.name));
                    setValue("shortName", data.shortName.toUpperCase());
                }
            }).catch(() => navigate(AppRoutes.AdminProductRegions));
        }

        if (isGranted) fetchProductRegion();
    }, [id, token, isGranted, navigate, setValue])

    const onSubmit = async (data) => {
        setProcessing(true);

        await axios.put(API_ENDPOINTS.PRODUCT_REGIONS_UPDATE, {
            id: id,
            name: capitalizeFirstLetter(data.name),
            shortName: data.shortName.toUpperCase(),
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    reset();

                    setProcessing(false);

                    toast.success(res.data.message);

                    navigate(AppRoutes.AdminProductRegions);
                }
            }).catch((err) => { if (err) toast.error(err.response.data.message) });
    }

    if (!isGranted) {
        return <Navigate to={AppRoutes.Login} />
    }

    return (
        <StyledUsers>
            <Helmet>
                <title>Admin Edit Region</title>
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
                                <ContainerHeaderLeftBack to={AppRoutes.AdminProductRegions}>
                                    <ContainerHeaderLeftBackIcon src={`${process.env.PUBLIC_URL}/assets/icons/chevron-left.png`} alt='Back' />
                                </ContainerHeaderLeftBack>
                                <ContainerHeaderLeftTitle>Edit Region</ContainerHeaderLeftTitle>
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
                                        <FormSubmitButton type='submit' disabled={processing}>{processing ? "Processing.." : "Submit"}</FormSubmitButton>
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
const FormSubmitButton = styled.button`
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
  }`
        }
    }}
`;