import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import styled from "styled-components";

import Header from "../../components/client-area/header.component";
import Navbar from "../../components/client-area/navbar.component";

import Colors from "../../utils/colors.util";

import axios from "axios";

export default function Profile({ sidebarIsOpen, setSidebarIsOpen }) {
  const [countries, setCountries] = useState([]);
  const [editPersonalDetails, setEditPersonalDetails] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get("./countries.json")
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <StyledClientAreaIndex>
      <Helmet>
        <title>My profile</title>
      </Helmet>
      <Wrapper>
        <Header
          sidebarIsOpen={sidebarIsOpen}
          setSidebarIsOpen={setSidebarIsOpen}
        />
        <Main>
          <Navbar setSidebarIsOpen={setSidebarIsOpen} />
          <MainContent>
            <MainTitle>Profile</MainTitle>
            <Menu>
              <MenuItem>
                <MenuItemLink to="/profile" data-active={true}>
                  Profile
                </MenuItemLink>
              </MenuItem>
              <MenuItem>
                <MenuItemLink to="/profile/billing">Billing</MenuItemLink>
              </MenuItem>
            </Menu>
            <Container>
              <Infos>
                <InfosAvatar
                  src="https://dashboard.boostroyal.com/assets/img/default-avatar.png"
                  alt={"GeekLegend"}
                />
                <InfosUsername>GeekLegend</InfosUsername>
                <InfosEmail>geeklegendofficiel@gmail.com</InfosEmail>
                <InfosId>
                  <InfosIdIcon
                    src={`${process.env.PUBLIC_URL}/assets/icons/id.svg`}
                    alt="1"
                  />
                  Account ID - 1
                </InfosId>
                <InfosCreatedAt>
                  member since
                  <InfosCreatedAtSpan>Feb 6, 2023</InfosCreatedAtSpan>
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
                        onClick={() =>
                          setEditPersonalDetails(!editPersonalDetails)
                        }
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
                        onClick={() =>
                          setEditPersonalDetails(!editPersonalDetails)
                        }
                      >
                        Delete account
                      </CustomButton>
                    </PersonalDetailsActions>
                  </PersonalDetailsWrapper>
                  <PersonalDetailsContent>
                    <PersonalDetailsForm>
                      <PersonalDetailsFormTitle>
                        Personal info
                      </PersonalDetailsFormTitle>
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
                            {...register("discord")}
                          />
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
                                    value={country.code}
                                  >
                                    {country.name}
                                  </PersonalDetailsFormGroupSelectOption>
                                );
                              })}
                          </PersonalDetailsFormGroupSelect>
                        </PersonalDetailsFormGroup>
                      </PersonalDetailsFormGroups>
                    </PersonalDetailsForm>
                    <PersonalDetailsForm>
                      <PersonalDetailsFormTitle>
                        Notifications
                      </PersonalDetailsFormTitle>
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
                          GeekLegend
                        </PersonalDetailsGroupValue>
                      </PersonalDetailsGroup>
                      <PersonalDetailsGroup>
                        <PersonalDetailsGroupName>
                          First Name
                        </PersonalDetailsGroupName>
                        <PersonalDetailsGroupValue></PersonalDetailsGroupValue>
                      </PersonalDetailsGroup>
                      <PersonalDetailsGroup>
                        <PersonalDetailsGroupName>
                          Last Name
                        </PersonalDetailsGroupName>
                        <PersonalDetailsGroupValue></PersonalDetailsGroupValue>
                      </PersonalDetailsGroup>
                      <PersonalDetailsGroup>
                        <PersonalDetailsGroupName>
                          Discord
                        </PersonalDetailsGroupName>
                        <PersonalDetailsGroupValue></PersonalDetailsGroupValue>
                      </PersonalDetailsGroup>
                      <PersonalDetailsGroup>
                        <PersonalDetailsGroupName>
                          Email
                        </PersonalDetailsGroupName>
                        <PersonalDetailsGroupValue>
                          geeklegendofficiel@gmail.com
                        </PersonalDetailsGroupValue>
                      </PersonalDetailsGroup>
                      <PersonalDetailsGroup>
                        <PersonalDetailsGroupName>
                          Country
                        </PersonalDetailsGroupName>
                        <PersonalDetailsGroupValue></PersonalDetailsGroupValue>
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
const Wrapper = styled.div`
  @media screen and (min-width: 1024px) {
    display: flex;
  }
`;
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
const InfosAvatar = styled.img`
  display: block;
  margin: 30px auto 0 auto;
`;
const InfosUsername = styled.h2`
  color: white;
  margin: 20px 0 0 0;
  font-weight: 500;
  text-align: center;
`;
const InfosEmail = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
`;
const InfosId = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;
const InfosIdIcon = styled.img`
  display: block;
  margin: 0 10px 0 0;
`;
const InfosCreatedAt = styled.p`
  color: rgba(255, 255, 255, 0.5);
  margin: 0 auto;
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
const PersonalDetailsForm = styled.form``;
const PersonalDetailsFormTitle = styled.h3`
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
  border: none;
  outline: none;
  margin: 10px 0 0;

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
  grid-template-columns: repeat(1fr, 1fr);
  grid-gap: 20px;
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
`;
