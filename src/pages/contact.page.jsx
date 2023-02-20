import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import styled from "styled-components";
import Footer from "../components/footer.component";
import Navbar from "../components/navbar.component";
import ContactCard from "../components/cards/contact-card.component";

import axios from "axios";
import { Link } from "react-router-dom";

export default function Contact() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios
      .get("./data.json")
      .then((res) => setCards(res.data.contact.cards))
      .catch((err) => console.error(err));
  }, []);

  return (
    <StyledContact>
      <Helmet>
        <title>Contact us</title>
      </Helmet>
      <Header>
        <Navbar />
        <HeaderContent>
          <HeaderTitle>Help Center</HeaderTitle>
          <HeaderDescription>
            Do you have questions, comments or do you want become a booster?
            Contact us and we will arange it.
          </HeaderDescription>
        </HeaderContent>
      </Header>
      <Main>
        <Cards>
          {cards &&
            cards.map((card, index) => {
              return <ContactCard key={`contact_card_${index}`} data={card} />;
            })}
        </Cards>
        <Form>
          <FormHeader>
            <FormHeaderTitle>How can we help you?</FormHeaderTitle>
            <FormHeaderDescription>
              Do you have any questions? Grat, because we have answers!
            </FormHeaderDescription>
            <FormHeaderSocials>
              <FormHeaderSocialItem>
                <FormHeaderSocialItemLink to="/">
                  <FormHeaderSocialIcon
                    src={`${process.env.PUBLIC_URL}/assets/icons/facebook.svg`}
                    alt="Facebook"
                  />
                </FormHeaderSocialItemLink>
              </FormHeaderSocialItem>
              <FormHeaderSocialItem>
                <FormHeaderSocialItemLink to="/">
                  <FormHeaderSocialIcon
                    src={`${process.env.PUBLIC_URL}/assets/icons/instagram.svg`}
                    alt="Instagram"
                  />
                </FormHeaderSocialItemLink>
              </FormHeaderSocialItem>
              <FormHeaderSocialItem>
                <FormHeaderSocialItemLink to="/">
                  <FormHeaderSocialIcon
                    src={`${process.env.PUBLIC_URL}/assets/icons/twitter.svg`}
                    alt="Twitter"
                  />
                </FormHeaderSocialItemLink>
              </FormHeaderSocialItem>
            </FormHeaderSocials>
          </FormHeader>
          <FormGroups>
            <FormGroupLabel htmlFor="email">
              <FormGroupInput type="email" id="email" name="email" />
            </FormGroupLabel>
          </FormGroups>
        </Form>
      </Main>
      <Footer />
    </StyledContact>
  );
}

const StyledContact = styled.div``;
const Header = styled.header``;
const HeaderContent = styled.div`
  padding: 20px;
`;
const HeaderTitle = styled.h1`
  color: white;

  @media screen and (min-width: 1024px) {
    text-align: center;
  }
`;
const HeaderDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  @media screen and (min-width: 1024px) {
    text-align: center;
  }
`;
const Main = styled.main``;
const Cards = styled.section`
  padding: 20px;
`;
const Form = styled.form``;
const FormHeader = styled.div``;
const FormHeaderTitle = styled.h2``;
const FormHeaderDescription = styled.p``;
const FormHeaderSocials = styled.ul``;
const FormHeaderSocialItem = styled.li``;
const FormHeaderSocialItemLink = styled(Link)``;
const FormHeaderSocialIcon = styled.img``;
const FormGroups = styled.div``;
const FormGroupLabel = styled.label``;
const FormGroupInput = styled.input``;