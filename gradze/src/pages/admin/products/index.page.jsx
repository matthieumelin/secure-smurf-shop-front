import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import axios from 'axios';
import { API_ENDPOINTS } from '../../../api/api';
import AppRoutes from '../../../router/app.routes';

import styled from 'styled-components'

import Navbar from '../../../components/admin/navbar.component';
import Sidebar from '../../../components/admin/sidebar.component';
import Pagination from "../../../components/utils/pagination.component"
import ProductCard from '../../../components/admin/cards/product-card.component';
import Modal from '../../../components/utils/modal.component';

import Colors from '../../../utils/colors.util';

export default function AdminProducts({ toast }) {
    // Redux
    const token = useSelector((state) => state.user.token);
    const userData = useSelector((state) => state.user.data);

    // States
    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");

    const [selectedProduct, setSelectedProduct] = useState({});

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [processing, setProcessing] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = products.slice(indexOfFirstRecord, indexOfLastRecord);
    const pages = Math.ceil(products.length / recordsPerPage);

    // Page access
    const isGranted = token && userData.permission.includes("admin");

    // Search
    const haveSearchResult = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())
        || product.region.toLowerCase().includes(search.toLowerCase())).length > 0;

    useEffect(() => {
        const fetchProducts = async () => {
            await axios.get(API_ENDPOINTS.PRODUCTS).then((res) => {
                if (res.status === 200) {
                    setProducts(res.data);
                }
            })
        }

        if (isGranted) fetchProducts();
    }, [isGranted])

    const onOpenDeleteModal = (product) => {
        document.body.style.overflow = "hidden";

        setShowDeleteModal(true);
        setSelectedProduct(product);
    }

    const onConfirmDelete = async () => {
        setShowDeleteModal(false);
        setProcessing(true);

        await axios.delete(`${API_ENDPOINTS.PRODUCT_DELETE}/${selectedProduct.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            if (res.status === 200) {
                const updatedProducts = products.filter((product) => product.id !== selectedProduct.id);

                document.body.style.overflow = "initial";

                setProcessing(false);
                setProducts(updatedProducts);

                toast.success(res.data.message);
            }
        }).catch((err) => { if (err) toast.error(err.response.data.message) });
    }

    const onCancelDelete = () => {
        document.body.style.overflow = "initial";

        setShowDeleteModal(false);
    }

    const renderList = (product) => {
        return (
            <ProductCard key={`product_${product.id}`} data={product} onDeleteProduct={() => onOpenDeleteModal(product)} />
        )
    }

    if (!isGranted) {
        return <Navigate to={AppRoutes.Login} />
    }

    return (
        <StyledUsers>
            <Helmet>
                <title>Admin Products</title>
            </Helmet>
            <Wrapper>
                <WrapperLeft>
                    <Sidebar />
                </WrapperLeft>
                <WrapperRight>
                    <Navbar />
                    <Container>
                        <ContainerHeader>
                            <ContainerHeaderTitle>Manage Products</ContainerHeaderTitle>
                            <ContainerHeaderButtons>
                                <ContainerHeaderButtonsLink to={AppRoutes.AdminProductAdd}>Add Product</ContainerHeaderButtonsLink>
                            </ContainerHeaderButtons>
                        </ContainerHeader>
                        <ContainerBody>
                            <Modal active={showDeleteModal}
                                processing={processing}
                                title={"Delete product"}
                                description={"Are your sure to delete this product?"}
                                onCancel={onCancelDelete}
                                onConfirm={onConfirmDelete}
                                buttonCancelTitle={"Cancel"}
                                buttonConfirmTitle={"Delete"} />
                            <List>
                                <ListHeader>
                                    <ListHeaderTitle>Products List ({products.filter((product) => !product.disabled).length})</ListHeaderTitle>
                                    <ListHeaderSearch>
                                        <ListHeaderSearchIcon src={`${process.env.PUBLIC_URL}/assets/icons/search.svg`} alt="Search Product" />
                                        <ListHeaderSearchInput type='text' placeholder="Search Product" onChange={(event) => setSearch(event.target.value)} />
                                    </ListHeaderSearch>
                                </ListHeader>
                                <ListBody haveResult={haveSearchResult}>
                                    {search ? (
                                        haveSearchResult ? (
                                            products.filter((product) => !product.disabled && (product.name.toLowerCase().includes(search.toLowerCase())
                                                || product.region.toLowerCase().includes(search.toLowerCase()))).map((product) => {
                                                    return renderList(product);
                                                })
                                        ) : (
                                            <ListBodyNoMatch>No product found..</ListBodyNoMatch>
                                        )
                                    ) : (
                                        currentRecords.length ? (
                                            currentRecords
                                                .sort((a, b) => a.region > b.region ? 1 : -1)
                                                .filter((currentRecord) => !currentRecord.disabled).map((currentRecord) => {
                                                    return renderList(currentRecord);
                                                })
                                        ) :
                                            (
                                                <ListBodyNoMatch>No products</ListBodyNoMatch>
                                            )
                                    )}
                                </ListBody>
                            </List>
                            {products.length ? <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} /> : null}
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
const ContainerHeaderButtons = styled.div`
margin: 20px 0;

@media screen and (min-width: 1024px) {
    display: flex;
}
`;
const ContainerHeaderButtonsLink = styled(Link)`
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
    width: 100%;
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
display: grid;
grid-gap: 20px;

${props => {
        if (props.haveResult) {
            return `
            @media screen and (min-width: 1024px) {
                grid-template-columns: repeat(3, 1fr);
            }
        `;
        }
    }}
`;
const ListBodyNoMatch = styled.h3`
color: white;
text-align: center;
`;