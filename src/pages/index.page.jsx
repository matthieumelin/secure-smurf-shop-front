import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import Header from "../components/header.component";
import AccountCard from "../components/account-card.component";
import FeatureCard from "../components/feature-card.component";
import FeedbackCard from "../components/feedback-card.component";
import axios from "axios";
import FaqCard from "../components/faq-card.component";
import Button from "../components/utils/button.component";
import Footer from "../components/footer.component";
import HeroBanner from "../components/hero-banner.component";

export default function Index() {
  const [features, setFeatures] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [faq, setFaq] = useState([]);

  useEffect(() => {
    axios
      .get("./data.json")
      .then((res) => {
        setFeatures(res.data.features);
        setFeedbacks(res.data.feedbacks);
        setFaq(res.data.faq);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <StyledIndex>
      <Header />
      <Main>
        <Section>
          <SectionHeader>
            <SectionHeaderTitle>Lorem ipsum</SectionHeaderTitle>
            <SectionHeaderDescription>Lorem ipsum</SectionHeaderDescription>
          </SectionHeader>
          <SectionContent>
            <Accounts>
              <AccountsHeader>
                <AccountsHeaderRegion>EU-West</AccountsHeaderRegion>
                <AccountsHeaderLink to="/">Change server</AccountsHeaderLink>
              </AccountsHeader>
              <AccountsContent>
                <AccountCard />
              </AccountsContent>
            </Accounts>
          </SectionContent>
        </Section>
        {features.length ? (
          <Section>
            <SectionHeader>
              <SectionHeaderTitle>Our Key Features</SectionHeaderTitle>
              <SectionHeaderDescription>
                The most satisfying in-game service.
              </SectionHeaderDescription>
            </SectionHeader>
            <SectionContent>
              {features.map((feature, key) => {
                return <FeatureCard key={`feature_${key}`} data={feature} />;
              })}
            </SectionContent>
          </Section>
        ) : null}
        {feedbacks.length ? (
          <Section>
            <SectionHeader>
              <SectionHeaderTitle>Our Community</SectionHeaderTitle>
            </SectionHeader>
            <SectionContent>
              {feedbacks.map((feedback, key) => {
                return <FeedbackCard key={`feedback_${key}`} data={feedback} />;
              })}
            </SectionContent>
          </Section>
        ) : null}
        {faq.length ? (
          <Section>
            <SectionHeader>
              <SectionHeaderTitle>
                Frequently Asked Questions
              </SectionHeaderTitle>
            </SectionHeader>
            <SectionContent>
              <Faq>
                {faq.map((item, key) => {
                  return <FaqCard key={`faq_${key}`} data={item} />;
                })}
              </Faq>
              <Button title={"Show more"} type="submit" />
            </SectionContent>
          </Section>
        ) : null}
        <HeroBanner />
        <Footer />
      </Main>
    </StyledIndex>
  );
}

const StyledIndex = styled.div``;
const Main = styled.main``;
const Section = styled.section``;
const SectionHeader = styled.div``;
const SectionHeaderTitle = styled.h2``;
const SectionHeaderDescription = styled.p``;
const SectionContent = styled.div``;

const Accounts = styled.div``;
const AccountsHeader = styled.div``;
const AccountsHeaderRegion = styled.h2``;
const AccountsHeaderLink = styled(Link)``;
const AccountsContent = styled.div``;

const Faq = styled.div``;
