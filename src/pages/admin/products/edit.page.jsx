import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
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

export default function AdminProductEdit({ toast }) {
    // Router
    const { id } = useParams();
    const navigate = useNavigate();

    // Redux
    const token = useSelector((state) => state.user.token);
    const userData = useSelector((state) => state.user.data);

    // States
    const [regions, setRegions] = useState([]);
    const [currentRegion, setCurrentRegion] = useState({});
    const [processing, setProcessing] = useState(false);

    // Hook form
    const { reset, register, handleSubmit, setValue, formState: { errors } } = useForm();

    // Pages access
    const isGranted = id && token && userData.permission.includes("admin");

    useEffect(() => {
        const fetchRegions = async () => {
            await axios.get(API_ENDPOINTS.PRODUCT_REGIONS).then((res) => { if (res.status === 200) setRegions(res.data) });
        }

        const fetchProduct = async () => {
            await axios.get(`${API_ENDPOINTS.PRODUCTS}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                if (res.status === 200) {
                    const data = res.data;

                    setValue("name", capitalizeFirstLetter(data.name));
                    setValue("price", data.price);
                    setValue("blueEssence", data.blueEssence);
                    setValue("level", data.level);

                    setCurrentRegion(data.region.toUpperCase());
                }
            }).catch(() => navigate(AppRoutes.AdminProducts));
        }

        if (isGranted) {
            fetchRegions();
            fetchProduct();
        }
    }, [id, token, isGranted, navigate, setValue])

    const onSubmit = async (data) => {
        setProcessing(true);

        await axios.put(API_ENDPOINTS.PRODUCT_UPDATE, {
            id: id,
            name: capitalizeFirstLetter(data.name),
            price: data.price,
            blueEssence: data.blueEssence,
            level: data.level,
            region: data.region.toUpperCase(),
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
                <title>Admin Edit Product</title>
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
                                <ContainerHeaderLeftTitle>Edit Product</ContainerHeaderLeftTitle>
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
                                            min="0"
                                            max="1000"
                                            step="0.01"
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
                                        <FormGroupLabel htmlFor="region">Region</FormGroupLabel>
                                        {regions.length ?
                                            <FormGroupSelect
                                                id="region"
                                                name="region"
                                                error={errors.region}
                                                defaultValue={regions.find((region) => region.id === currentRegion.id)}
                                                {...register("region", {
                                                    required: {
                                                        value: true,
                                                        message: "You must select a category.",
                                                    },
                                                })}
                                            >
                                                {regions.map((region) => {
                                                    return <FormGroupSelectOption key={`product_region_${region.id}`} value={region.shortName}>{region.shortName}</FormGroupSelectOption>
                                                })}
                                            </FormGroupSelect> : <FormGroupLink to={AppRoutes.AdminProductRegionAdd}>Create a region for this product.</FormGroupLink>}
                                        {errors.region && (
                                            <ErrorMessage
                                                errors={errors}
                                                name="region"
                                                as={<ErrorContainer />}
                                            />
                                        )}
                                    </FormGroup>
                                    <FormGroup>
                                        <FormGroupLabel htmlFor="blueEssence">Blue Essence</FormGroupLabel>
                                        <FormGroupInput
                                            type="number"
                                            id="blueEssence"
                                            name="blueEssence"
                                            error={errors.blueEssence}
                                            {...register("blueEssence", {
                                                required: {
                                                    value: true,
                                                    message: "You must enter a blue essence amount.",
                                                },
                                            })}
                                        />
                                        {errors.blueEssence && (
                                            <ErrorMessage
                                                errors={errors}
                                                name="blueEssence"
                                                as={<ErrorContainer />}
                                            />
                                        )}
                                    </FormGroup>
                                    <FormGroup>
                                        <FormGroupLabel htmlFor="level">Level</FormGroupLabel>
                                        <FormGroupInput
                                            type="number"
                                            id="level"
                                            name="level"
                                            error={errors.level}
                                            {...register("level", {
                                                required: {
                                                    value: true,
                                                    message: "You must enter a level.",
                                                },
                                            })}
                                        />
                                        {errors.level && (
                                            <ErrorMessage
                                                errors={errors}
                                                name="level"
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
const FormGroupLink = styled(Link)`
color: ${Colors.primary};
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

&[type="checkbox"] {
    accent-color: ${Colors.primary};
    height: 16px;
    width: 16px;

    @media screen and (min-width: 1024px) {
      margin: 0 10px 0 10px;
    }
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