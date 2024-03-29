import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import axios from 'axios';
import { API_ENDPOINTS } from '../../../api/api';
import AppRoutes from '../../../router/app.routes';

import styled from 'styled-components'

import Navbar from '../../../components/admin/navbar.component';
import Sidebar from '../../../components/admin/sidebar.component';
import UserCard from "../../../components/admin/cards/user-card.component";
import Pagination from "../../../components/utils/pagination.component"
import Modal from '../../../components/utils/modal.component';

export default function AdminUsers({ toast }) {
    // Redux
    const token = useSelector((state) => state.user.token);
    const userData = useSelector((state) => state.user.data);

    // States
    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState("");

    const [selectedUser, setSelectedUser] = useState({});

    const [showDisableModal, setShowDisableModal] = useState(false);

    const [processing, setProcessing] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);
    const pages = Math.ceil(users.length / recordsPerPage);

    // Pages access
    const isGranted = token && userData.permission.includes("admin");

    // Search
    const haveSearchResult = users.filter((user) => user.email.toLowerCase().includes(search.toLowerCase()) || user.username.toLowerCase().includes(search.toLowerCase())).length > 0;

    useEffect(() => {
        const fetchUsers = async () => {
            await axios.get(API_ENDPOINTS.USERS, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                if (res.status === 200) {
                    setUsers(res.data);
                    setShowDisableModal(false);
                }
            })
        }

        if (isGranted) fetchUsers();
    }, [token, isGranted])

    const onDisable = (user) => {
        document.body.style.overflow = "hidden";

        setShowDisableModal(true);
        setSelectedUser(user);
    }

    const onConfirmDisable = async () => {
        setShowDisableModal(false);
        setProcessing(true);

        await axios.put(API_ENDPOINTS.USER_DISABLE, {
            id: selectedUser.id
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            if (res.status === 200) {
                const updatedUsers = users.filter((user) => user.id !== selectedUser.id);

                document.body.style.overflow = "initial";

                setProcessing(false);
                setUsers(updatedUsers);

                toast.success(res.data.message);
            }
        }).catch((err) => { if (err) toast.error(err.response.data.message) });
    }

    const onCancelDisable = () => {
        document.body.style.overflow = "initial";

        setShowDisableModal(false);
    }

    const renderList = (user) => {
        return (
            <UserCard key={`user_${user.id}`} data={user} onDisable={() => onDisable(user)} />
        )
    }

    if (!isGranted) {
        return <Navigate to={AppRoutes.Login} />
    }

    return (
        <StyledUsers>
            <Helmet>
                <title>Admin Users</title>
            </Helmet>
            <Wrapper>
                <WrapperLeft>
                    <Sidebar />
                </WrapperLeft>
                <WrapperRight>
                    <Navbar />
                    <Container>
                        <ContainerHeader>
                            <ContainerHeaderTitle>Manage Users</ContainerHeaderTitle>
                        </ContainerHeader>
                        <ContainerBody>
                            <Modal active={showDisableModal}
                                processing={processing}
                                title={"Disable user"}
                                description={"Are your sure to disable this user?"}
                                onCancel={onCancelDisable}
                                onConfirm={onConfirmDisable}
                                buttonCancelTitle={"Cancel"}
                                buttonConfirmTitle={"Disable"} />
                            <List>
                                <ListHeader>
                                    <ListHeaderTitle>Users List ({users.length})</ListHeaderTitle>
                                    <ListHeaderSearch>
                                        <ListHeaderSearchIcon src={`${process.env.PUBLIC_URL}/assets/icons/search.svg`} alt="Search User" />
                                        <ListHeaderSearchInput type='text' placeholder="Search User" onChange={(event) => setSearch(event.target.value)} />
                                    </ListHeaderSearch>
                                </ListHeader>
                                <ListBody haveSearchResult={haveSearchResult}>
                                    {search ? (
                                        haveSearchResult ? (
                                            users.filter((user) => user.email.toLowerCase().includes(search.toLowerCase()) || user.username.toLowerCase().includes(search.toLowerCase())).map((user) => {
                                                return renderList(user);
                                            })
                                        ) : (
                                            <ListBodyNoMatch>No user found..</ListBodyNoMatch>
                                        )
                                    ) : (
                                        currentRecords.length ? (
                                            currentRecords
                                                .sort((a, b) => a.permission > b.permission ? 1 : -1)
                                                .map((currentRecord) => {
                                                    return renderList(currentRecord);
                                                })
                                        ) :
                                            (
                                                <ListBodyNoMatch>No users</ListBodyNoMatch>
                                            )
                                    )}
                                </ListBody>
                            </List>
                            {users.length ? <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} /> : null}
                        </ContainerBody>
                    </Container>
                </WrapperRight>
            </Wrapper>
        </StyledUsers >
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
// const ContainerHeaderButtons = styled.div`
// margin: 20px 0;

// @media screen and (min-width: 1024px) {
//     display: flex;
// }
// `;
// const ContainerHeaderButtonsLink = styled(Link)`
// background-color: ${Colors.primary};
// color: white;
// text-decoration: none;
// padding: 5px 10px;
// display:block;
// text-align: center;
// border-radius: 2px;
// transition: 0.2s;
// margin: 20px 0;

// &:hover {
//     transition: 0.2s;
//     -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
//     -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
//     box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
//   }

//   @media screen and (min-width: 1024px) {
//     margin: 0 0 0 20px;
//   }
// `;
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
        if (props.haveSearchResult) {
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