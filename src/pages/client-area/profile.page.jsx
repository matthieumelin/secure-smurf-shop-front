import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "../../redux/reducers/user.reducer";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AppRoutes from "../../router/app.routes";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Gravatar from "react-gravatar";

import moment from "moment/moment";

import styled from "styled-components";

import Header from "../../components/client-area/header.component";
import Navbar from "../../components/client-area/navbar.component";
import Modal from "../../components/utils/modal.component";

import Colors from "../../utils/colors.util";
import ErrorContainer from "../../utils/error-container.util";
import { capitalizeFirstLetter } from "../../utils/string.util";

import { PasswordRegEx, DiscordRegEx } from "../../utils/regex.util";

import axios from "axios";
import { API_ENDPOINTS } from "../../api/api";

export default function Profile({ toast, sidebarIsOpen, showLogoutModal, setSidebarIsOpen, setShowLogoutModal }) {
  const token = useSelector((state) => state.user.token);
  const userData = useSelector((state) => state.user.data);

  const [countries, setCountries] = useState([]);
  const [editPersonalDetails, setEditPersonalDetails] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(
    userData
      ? {
        defaultValues: {
          username: userData.username,
          firstName: userData.firstName,
          lastName: userData.lastName,
          discord: userData.discord,
          country: userData.country,
        },
      }
      : null
  );

  useEffect(() => {
    axios
      .get("./countries.json")
      .then((res) => setCountries(res.data))
      .catch((err) => console.error(err));
  }, []);

  const onSaveProfile = async (data) => {
    await axios
      .put(API_ENDPOINTS.USER_UPDATE, {
        id: userData.id,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        discord: data.discord,
        country: data.country,
        notifications: data.notifications,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      })
      .then((res) => {
        if (res.status === 200) {
          const newData = {
            ...userData,
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            discord: data.discord,
            country: data.country,
            notifications: data.notifications,
          };

          localStorage.setItem("data", JSON.stringify(newData));

          dispatch(setData(newData));

          setEditPersonalDetails(false);

          toast.success(res.data.message);
        }
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  const onConfirmDisable = async () => {
    await axios
      .post(API_ENDPOINTS.USER_DISABLE, {
        id: userData.id,
      })
      .then((res) => {
        if (res.status === 200) {
          setShowDisableModal(false);

          navigate(AppRoutes.Logout);
        }
      })
      .catch((err) => console.log(err.response.data.message));
  };

  const onDeleteAccount = () => {
    setShowDisableModal(true);

    document.body.style.overflow = "hidden";
  }

  const onCancelDisable = () => {
    setShowDisableModal(false);

    document.body.style.overflow = "initial";
  };

  const onConfirmLogout = () => {
    document.body.style.overflow = "initial";
    navigate(AppRoutes.Logout);
    setShowLogoutModal(false);
  }

  const onCancelLogout = () => {
    document.body.style.overflow = "initial";
    setShowLogoutModal(false);
  }

  if (!token) {
    return <Navigate to={AppRoutes.Login} />;
  }

  return (
    <StyledClientAreaIndex>
      <Helmet>
        <title>My profile</title>
      </Helmet>
      <Wrapper>
        <Header
          sidebarIsOpen={sidebarIsOpen}
          setSidebarIsOpen={setSidebarIsOpen}
          showLogoutModal={showLogoutModal}
          setShowLogoutModal={setShowLogoutModal}
        />
        <Main>
          <Navbar setSidebarIsOpen={setSidebarIsOpen} />
          <Modal
            title={"Delete Account"}
            description={"Are you sure you wait to delete your account? If you delete your account, you will permanently lose your data."}
            active={showDisableModal}
            onConfirm={onConfirmDisable}
            onCancel={onCancelDisable}
            buttonCancelTitle={"Cancel"}
            buttonConfirmTitle={"Delete"}
          />
          <MainContent>
            <Modal
              title={"Logout"}
              description={"Are you sure you want to logout?"}
              active={showLogoutModal}
              onConfirm={onConfirmLogout}
              onCancel={onCancelLogout}
              buttonCancelTitle={"Cancel"}
              buttonConfirmTitle={"Logout"}
            />
            <MainTitle>Profile</MainTitle>
            <Menu>
              <MenuItem>
                <MenuItemLink to={AppRoutes.Profile} data-active={true}>
                  Profile
                </MenuItemLink>
              </MenuItem>
              {/* <MenuItem>
                <MenuItemLink to={AppRoutes.ProfileBilling}>
                  Billing
                </MenuItemLink>
              </MenuItem> */}
            </Menu>
            <Container>
              <Infos>
                <InfosAvatar email={userData.email} size={80} />
                {!userData.permission.includes("user") && (
                  <InfosBadge>
                    {capitalizeFirstLetter(userData.permission)}
                  </InfosBadge>
                )}
                <InfosUsername>{userData.username}</InfosUsername>
                <InfosEmail>{userData.email}</InfosEmail>
                <InfosItem>
                  <InfosItemIcon
                    src={`${process.env.PUBLIC_URL}/assets/icons/id.svg`}
                    alt={userData.id}
                  />
                  Account ID - {userData.id}
                </InfosItem>
                <InfosCreatedAt>
                  member since
                  <InfosCreatedAtSpan>
                    {moment(userData.createdAt).format("ll")}
                  </InfosCreatedAtSpan>
                </InfosCreatedAt>
              </Infos>
              {editPersonalDetails ? (
                <PersonalDetails>
                  <PersonalDetailsWrapper
                    editPersonalDetails={editPersonalDetails}
                  >
                    <PersonalDetailsTitle>
                      Personal details
                    </PersonalDetailsTitle>
                    <PersonalDetailsActions
                      editPersonalDetails={editPersonalDetails}
                    >
                      <CustomButton
                        type="button"
                        onClick={handleSubmit(onSaveProfile)}
                      >
                        Save
                      </CustomButton>
                      <CustomButton
                        type="button"
                        style={{
                          color: "#6c757d",
                          backgroundColor: "rgba(206, 212, 218,0.1)",
                        }}
                        onClick={() =>
                          setEditPersonalDetails(!editPersonalDetails)
                        }
                      >
                        Cancel
                      </CustomButton>
                      <CustomButton
                        type="button"
                        style={{
                          color: Colors.red,
                          backgroundColor: "rgba(214, 40, 40 ,0.1)",
                        }}
                        onClick={() => onDeleteAccount()}
                      >
                        Delete account
                      </CustomButton>
                    </PersonalDetailsActions>
                  </PersonalDetailsWrapper>
                  <PersonalDetailsContent>
                    <PersonalDetailsForm>
                      <PersonalDetailsFormSection>
                        <PersonalDetailsFormSectionTitle>
                          Personal info
                        </PersonalDetailsFormSectionTitle>
                        <PersonalDetailsFormGroups>
                          <PersonalDetailsFormGroup>
                            <PersonalDetailsFormGroupLabel htmlFor="username">
                              Username
                            </PersonalDetailsFormGroupLabel>
                            <PersonalDetailsFormGroupInput
                              type="text"
                              id="username"
                              name="username"
                              error={errors.username}
                              {...register("username")}
                            />
                            {errors.username && (
                              <ErrorMessage
                                errors={errors}
                                name="username"
                                as={<ErrorContainer />}
                              />
                            )}
                          </PersonalDetailsFormGroup>
                          <PersonalDetailsFormGroup>
                            <PersonalDetailsFormGroupLabel htmlFor="firstName">
                              First name
                            </PersonalDetailsFormGroupLabel>
                            <PersonalDetailsFormGroupInput
                              type="text"
                              id="firstName"
                              name="firstName"
                              error={errors.firstName}
                              {...register("firstName")}
                            />
                            {errors.firstName && (
                              <ErrorMessage
                                errors={errors}
                                name="firstName"
                                as={<ErrorContainer />}
                              />
                            )}
                          </PersonalDetailsFormGroup>
                          <PersonalDetailsFormGroup>
                            <PersonalDetailsFormGroupLabel htmlFor="lastName">
                              Last name
                            </PersonalDetailsFormGroupLabel>
                            <PersonalDetailsFormGroupInput
                              type="text"
                              id="lastName"
                              name="lastName"
                              error={errors.lastName}
                              {...register("lastName")}
                            />
                            {errors.lastName && (
                              <ErrorMessage
                                errors={errors}
                                name="lastName"
                                as={<ErrorContainer />}
                              />
                            )}
                          </PersonalDetailsFormGroup>
                          <PersonalDetailsFormGroup>
                            <PersonalDetailsFormGroupLabel htmlFor="discord">
                              Discord
                            </PersonalDetailsFormGroupLabel>
                            <PersonalDetailsFormGroupInput
                              type="text"
                              id="discord"
                              name="discord"
                              error={errors.discord}
                              {...register("discord", {
                                pattern: {
                                  value: DiscordRegEx,
                                  message: "Invalid discord format.",
                                },
                              })}
                            />
                            {errors.discord && (
                              <ErrorMessage
                                errors={errors}
                                name="discord"
                                as={<ErrorContainer />}
                              />
                            )}
                          </PersonalDetailsFormGroup>
                          <PersonalDetailsFormGroup>
                            <PersonalDetailsFormGroupLabel htmlFor="country">
                              Country
                            </PersonalDetailsFormGroupLabel>
                            <PersonalDetailsFormGroupSelect
                              id="country"
                              name="country"
                              error={errors.country}
                              {...register("country")}
                            >
                              {countries &&
                                countries.map((country, index) => {
                                  return (
                                    <PersonalDetailsFormGroupSelectOption
                                      key={`country_${index}`}
                                      value={country.name}
                                    >
                                      {country.name}
                                    </PersonalDetailsFormGroupSelectOption>
                                  );
                                })}
                            </PersonalDetailsFormGroupSelect>
                            {errors.country && (
                              <ErrorMessage
                                errors={errors}
                                name="country"
                                as={<ErrorContainer />}
                              />
                            )}
                          </PersonalDetailsFormGroup>
                        </PersonalDetailsFormGroups>
                      </PersonalDetailsFormSection>
                      <PersonalDetailsFormSection>
                        <PersonalDetailsFormSectionTitle>
                          Change password
                        </PersonalDetailsFormSectionTitle>
                        <PersonalDetailsFormGroups>
                          <PersonalDetailsFormGroup>
                            <PersonalDetailsFormGroupLabel htmlFor="newPassword">
                              New password
                            </PersonalDetailsFormGroupLabel>
                            <PersonalDetailsFormGroupInput
                              type="password"
                              id="newPassword"
                              name="newPassword"
                              error={errors.newPassword}
                              {...register("newPassword", {
                                minLength: {
                                  value: 8,
                                  message:
                                    "Your password must be at least 8 characters.",
                                },
                                pattern: {
                                  value: PasswordRegEx,
                                  message: "Invalid password format.",
                                },
                              })}
                            />
                            {errors.newPassword && (
                              <ErrorMessage
                                errors={errors}
                                name="newPassword"
                                as={<ErrorContainer />}
                              />
                            )}
                          </PersonalDetailsFormGroup>
                          <PersonalDetailsFormGroup>
                            <PersonalDetailsFormGroupLabel htmlFor="currentPassword">
                              Current password
                            </PersonalDetailsFormGroupLabel>
                            <PersonalDetailsFormGroupInput
                              type="password"
                              id="currentPassword"
                              name="currentPassword"
                              error={errors.currentPassword}
                              {...register("currentPassword")}
                            />
                            {errors.currentPassword && (
                              <ErrorMessage
                                errors={errors}
                                name="currentPassword"
                                as={<ErrorContainer />}
                              />
                            )}
                          </PersonalDetailsFormGroup>
                        </PersonalDetailsFormGroups>
                      </PersonalDetailsFormSection>
                      <PersonalDetailsFormSection>
                        <PersonalDetailsFormSectionTitle>
                          Notifications
                        </PersonalDetailsFormSectionTitle>
                        <PersonalDetailsFormGroups>
                          <PersonalDetailsFormGroupWrapper>
                            <PersonalDetailsFormGroupLabel htmlFor="notifications">
                              Receive promotional emails
                            </PersonalDetailsFormGroupLabel>
                            <PersonalDetailsFormGroupInput
                              type="checkbox"
                              id="notifications"
                              name="notifications"
                              error={errors.notifications}
                              {...register("notifications")}
                            />
                          </PersonalDetailsFormGroupWrapper>
                        </PersonalDetailsFormGroups>
                      </PersonalDetailsFormSection>
                    </PersonalDetailsForm>
                  </PersonalDetailsContent>
                </PersonalDetails>
              ) : (
                <PersonalDetails>
                  <PersonalDetailsWrapper>
                    <PersonalDetailsTitle>
                      Personal details
                    </PersonalDetailsTitle>
                    <PersonalDetailsActions>
                      <CustomButton
                        type="button"
                        onClick={() =>
                          setEditPersonalDetails(!editPersonalDetails)
                        }
                      >
                        Edit profile
                      </CustomButton>
                    </PersonalDetailsActions>
                  </PersonalDetailsWrapper>
                  <PersonalDetailsContent>
                    <PersonalDetailsGroups>
                      <PersonalDetailsGroup>
                        <PersonalDetailsGroupName>
                          Username
                        </PersonalDetailsGroupName>
                        <PersonalDetailsGroupValue>
                          {userData.username
                            ? userData.username
                            : "No username"}
                        </PersonalDetailsGroupValue>
                      </PersonalDetailsGroup>
                      <PersonalDetailsGroup>
                        <PersonalDetailsGroupName>
                          First Name
                        </PersonalDetailsGroupName>
                        <PersonalDetailsGroupValue>
                          {userData.firstName
                            ? userData.firstName
                            : "No first name"}
                        </PersonalDetailsGroupValue>
                      </PersonalDetailsGroup>
                      <PersonalDetailsGroup>
                        <PersonalDetailsGroupName>
                          Last Name
                        </PersonalDetailsGroupName>
                        <PersonalDetailsGroupValue>
                          {userData.lastName
                            ? userData.lastName
                            : "No last name"}
                        </PersonalDetailsGroupValue>
                      </PersonalDetailsGroup>
                      <PersonalDetailsGroup>
                        <PersonalDetailsGroupName>
                          Discord
                        </PersonalDetailsGroupName>
                        <PersonalDetailsGroupValue>
                          {userData.discord ? userData.discord : "No discord"}
                        </PersonalDetailsGroupValue>
                      </PersonalDetailsGroup>
                      <PersonalDetailsGroup>
                        <PersonalDetailsGroupName>
                          Email
                        </PersonalDetailsGroupName>
                        <PersonalDetailsGroupValue>
                          {userData.email}
                        </PersonalDetailsGroupValue>
                      </PersonalDetailsGroup>
                      <PersonalDetailsGroup>
                        <PersonalDetailsGroupName>
                          Country
                        </PersonalDetailsGroupName>
                        <PersonalDetailsGroupValue>
                          {userData.country ? userData.country : "No country"}
                        </PersonalDetailsGroupValue>
                      </PersonalDetailsGroup>
                    </PersonalDetailsGroups>
                  </PersonalDetailsContent>
                </PersonalDetails>
              )}
            </Container>
          </MainContent>
        </Main>
      </Wrapper>
    </StyledClientAreaIndex>
  );
}

const StyledClientAreaIndex = styled.div``;
const Wrapper = styled.div``;
const Main = styled.main`
  @media screen and (min-width: 1024px) {
    width: 100%;
  }
`;
const MainContent = styled.div`
  padding: 15px;

  @media screen and (min-width: 1024px) {
    width: 80%;
    margin: 0 auto;
    padding: 30px;
  }
`;
const MainTitle = styled.h2`
  color: white;
  margin: 0;

  @media screen and (min-width: 1024px) {
    display: none;
  }
`;
const Menu = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  align-items: center;
`;
const MenuItem = styled.li`
  margin: 0 10px 0 0;
`;
const MenuItemLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: 600;

  &[data-active="true"] {
    padding: 0 0 5px 0;
    border-bottom: 2px solid rgb(157 78 221 / 1);
  }
`;
const Container = styled.div`
  @media screen and (min-width: 1024px) {
    width: 50%;
  }
`;
const Infos = styled.div`
  background-color: ${Colors.primaryLowOp};
  border-radius: 20px;
  padding: 30px;
  margin: 30px 0 0 0;
  height: max-content;
`;
const InfosAvatar = styled(Gravatar)`
  display: block;
  margin: 20px auto;
  border-radius: 100px;
`;
const InfosUsername = styled.h2`
  color: white;
  margin: 10px 0 0 0;
  font-weight: 500;
  text-align: center;
`;
const InfosEmail = styled.p`
  margin: 0 0 20px 0;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
`;
const InfosBadge = styled.div`
  background-color: ${Colors.red};
  width: max-content;
  font-size: 0.9rem;
  font-weight: 700;
  border-radius: 2px;
  padding: 1px 5px;
  color: white;
  margin: 0 auto;
`;
const InfosItem = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0;
`;
const InfosItemIcon = styled.img`
  display: block;
  margin: 0 10px 0 0;
`;
const InfosCreatedAt = styled.p`
  color: rgba(255, 255, 255, 0.5);
  margin: 10px auto 0 auto;
  display: flex;
  width: max-content;
  font-size: 0.9rem;
  align-items: center;
`;
const InfosCreatedAtSpan = styled.span`
  color: white;
  margin: 0 0 0 5px;
  width: max-content;
`;
const PersonalDetails = styled.section`
  margin: 30px 0;
`;
const PersonalDetailsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  align-items: center;
  gap: 20px;

  ${(props) => {
    if (props.editPersonalDetails) {
      return `
    display: flex;
    flex-direction: column;
    align-items: initial;
    gap: initial;
    margin: 0 0 20px 0;
    width: max-content;
    `;
    }
  }}
`;
const PersonalDetailsTitle = styled.h3`
  color: white;
`;
const PersonalDetailsActions = styled.div`
  ${(props) => {
    if (props.editPersonalDetails) {
      return `
  display: grid;
  gap: 10px;
  grid-template-columns:repeat(3, max-content); 
  `;
    }
  }}
`;
const PersonalDetailsContent = styled.div`
  background-color: ${Colors.primaryLowOp};
  padding: 30px;
  border-radius: 20px;
  display: grid;
  row-gap: 30px;
`;
const PersonalDetailsForm = styled.form`
  display: grid;
  gap: 30px;
`;
const PersonalDetailsFormSection = styled.div``;
const PersonalDetailsFormSectionTitle = styled.h3`
  margin: 0;
  color: rgba(255, 255, 255, 0.6);
`;
const PersonalDetailsFormGroups = styled.div``;
const PersonalDetailsFormGroup = styled.div`
  margin: 20px 0 0 0;
`;
const PersonalDetailsFormGroupWrapper = styled.div`
  margin: 20px 0 0 0;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: space-between;
  width: max-content;
`;
const PersonalDetailsFormGroupLabel = styled.label`
  color: white;

  ${PersonalDetailsFormGroupWrapper} & {
    font-size: 0.9rem;
  }
`;
const PersonalDetailsFormGroupInput = styled.input`
  width: 100%;
  padding: 11px 18px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border: 1px solid ${(props) => (props.error ? Colors.red : "transparent")};
  outline: none;
  margin: 10px 0 0;
  color: white;
  font-size: inherit;

  ${PersonalDetailsFormGroupWrapper} & {
    width: initial;
    margin: 0;
  }

  &[type="checkbox"] {
    accent-color: ${Colors.primary};
    height: 16px;
    width: 16px;

    @media screen and (min-width: 1024px) {
      margin: 0 10px 0 0;
    }
  }
`;
const PersonalDetailsFormGroupSelect = styled.select`
  width: 100%;
  padding: 11px 18px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border: none;
  outline: none;
  margin: 10px 0 0;
  color: white;
  font-family: inherit;
`;
const PersonalDetailsFormGroupSelectOption = styled.option``;
const PersonalDetailsGroups = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
`;
const PersonalDetailsGroup = styled.div``;
const PersonalDetailsGroupName = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
`;
const PersonalDetailsGroupValue = styled.p`
  margin: 0;
  color: white;
`;
const CustomButton = styled.button`
  color: ${Colors.primary};
  background-color: ${Colors.primaryLowOp};
  border-radius: 20px;
  border: none;
  font-family: inherit;
  font-weight: 600;
  padding: 10px 15px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transition: 0.2s;
    -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
  }
`;
