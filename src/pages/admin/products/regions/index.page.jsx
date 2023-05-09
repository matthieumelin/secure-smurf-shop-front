import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import axios from 'axios';
import { API_ENDPOINTS } from '../../../../api/api';
import AppRoutes from '../../../../router/app.routes';

import styled from 'styled-components'

import Navbar from '../../../../components/admin/navbar.component';
import Sidebar from '../../../../components/admin/sidebar.component';
import ProductRegionCard from "../../../../components/admin/cards/product-region-card.component"
import Pagination from '../../../../components/utils/pagination.component';
import Modal from "../../../../components/utils/modal.component"

import Colors from '../../../../utils/colors.util';

export default function AdminProductRegions({ toast }) {
    // Redux
    const token = useSelector((state) => state.user.token);
    const userData = useSelector((state) => state.user.data);

    // States
    const [productRegions, setProductRegions] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedProductRegion, setSelectedProductRegion] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = productRegions.slice(indexOfFirstRecord, indexOfLastRecord);
    const pages = Math.ceil(productRegions.length / recordsPerPage);

    // Page access
    const isGranted = token && userData.permission.includes("admin");

    // Search
    const haveSearchResult = productRegions.filter((productRegion) => productRegion.name.toLowerCase().includes(search.toLowerCase()) ||
        productRegion.shortName.toLowerCase().includes(search.toLowerCase())).length > 0;

    useEffect(() => {
        const fetchProductRegions = async () => {
            await axios.get(API_ENDPOINTS.PRODUCT_REGIONS).then((res) => { if (res.status === 200) setProductRegions(res.data) })
        }

        if (isGranted) fetchProductRegions();
    }, [token, isGranted])

    const onOpenDeleteModal = (productRegion) => {
        document.body.style.overflow = "hidden";

        setShowDeleteModal(true);
        setSelectedProductRegion(productRegion);
    }

    const onConfirmDelete = async () => {
        await axios.delete(`${API_ENDPOINTS.PRODUCT_REGIONS_DELETE}/${selectedProductRegion.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            if (res.status === 200) {
                const updatedProductRegions = productRegions.filter((productRegion) => productRegion.id !== selectedProductRegion.id);

                setProductRegions(updatedProductRegions);
                setShowDeleteModal(false);

                toast.success(res.data.message);
            }
        }).catch((err) => { if (err) toast.error(err.response.data.message) });
    }

    const onCancelDelete = () => {
        document.body.style.overflow = "initial";

        setShowDeleteModal(false);
    }

    const renderList = (productRegion) => {
        return (
            <ProductRegionCard key={`product_region_${productRegion.id}`} data={productRegion} onDeleteProductRegion={() => onOpenDeleteModal(productRegion)} />
        )
    }

    if (!isGranted) {
        return <Navigate to={AppRoutes.Login} />
    }

    return (
        <StyledUsers>
            <Helmet>
                <title>Admin Regions</title>
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
                                <ContainerHeaderLeftTitle>Manage Regions</ContainerHeaderLeftTitle>
                            </ContainerHeaderLeft>
                            <ContainerHeaderLeftButtons>
                                <ContainerHeaderLeftButtonsLink to={AppRoutes.AdminProductRegionAdd}>Add Region</ContainerHeaderLeftButtonsLink>
                            </ContainerHeaderLeftButtons>
                        </ContainerHeader>
                        <ContainerBody>
                            <Modal active={showDeleteModal}
                                title={"Delete region"}
                                description={"Are your sure to delete this region?"}
                                onCancel={onCancelDelete}
                                onConfirm={onConfirmDelete}
                                buttonCancelTitle={"Cancel"}
                                buttonConfirmTitle={"Delete"} />
                            <List>
                                <ListHeader>
                                    <ListHeaderTitle>Regions List ({productRegions.length})</ListHeaderTitle>
                                    <ListHeaderSearch>
                                        <ListHeaderSearchIcon src={`${process.env.PUBLIC_URL}/assets/icons/search.svg`} alt="Search Product Region" />
                                        <ListHeaderSearchInput type='text' placeholder="Search Product Region" onChange={(event) => setSearch(event.target.value)} />
                                    </ListHeaderSearch>
                                </ListHeader>
                                <ListBody haveSearchResult={haveSearchResult}>
                                    {search ? (
                                        haveSearchResult ? (
                                            productRegions.filter((productRegion) => productRegion.name.toLowerCase().includes(search.toLowerCase())
                                                || productRegion.shortName.toLowerCase().includes(search.toLowerCase)).map((productRegion) => {
                                                    return renderList(productRegion);
                                                })
                                        ) : (
                                            <ListBodyNoMatch>No product region found..</ListBodyNoMatch>
                                        )
                                    ) : (
                                        currentRecords.length ? (
                                            currentRecords.map((currentRecord) => {
                                                return renderList(currentRecord);
                                            })
                                        ) :
                                            (
                                                <ListBodyNoMatch>No products regions</ListBodyNoMatch>
                                            )
                                    )}
                                </ListBody>
                            </List>
                            <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
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
const ContainerHeaderLeftButtons = styled.div`
margin: 20px 0;

@media screen and (min-width: 1024px) {
    display: flex;
}
`;
const ContainerHeaderLeftButtonsLink = styled(Link)`
background-color: ${Colors.primary};
color: white;
text-decoration: none;
padding: 5px 10px;
display:block;
text-align: center;
border-radius: 2px;
transition: 0.2s;
margin: 20px 0;

&:hover {
    transition: 0.2s;
    -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
  }

  @media screen and (min-width: 1024px) {
    margin: 0 0 0 20px;
  }
`;
const ContainerBody = styled.div``;
const List = styled.div`
margin: 30px 0;
`;
const ListHeader = styled.div`
@media screen and (min-width: 1024px) {
    display: flex;
    align-items: center;
}
`;
const ListHeaderTitle = styled.h2`
margin: 0;
color: white;

@media screen and (min-width: 1024px) {
    margin: 0 20px 0 0;
}
`;
const ListHeaderSearch = styled.div`
display: flex;
align-items: center;
background-color: white;
border-radius: 20px;
padding: 10px 20px;
margin-top: 10px;
max-width: 320px;

@media screen and (min-width: 1024px) {
    margin-top: 0;
}
`;
const ListHeaderSearchIcon = styled.img`
width: 18px;
height: 18px;
display: block;
filter: invert(0%) sepia(5%) saturate(27%) hue-rotate(331deg) brightness(0%) contrast(100%);
margin-right: 10px;
`;
const ListHeaderSearchInput = styled.input`
background-color: transparent;
border: none;
font-family: inherit;
outline: none;
width: 100%;
`;
const ListBody = styled.div`
margin: 30px 0;
max-width: 425px;

@media screen and (min-width: 1024px) {
    max-width: 100%;
} 

${props => {
        if (props.haveSearchResult) {
            return `
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 20px;
        `;
        }
    }}
`;
const ListBodyNoMatch = styled.h3`
color: white;
text-align: center;
`;