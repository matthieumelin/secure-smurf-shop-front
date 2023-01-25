import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  faAngleLeft,
  faAngleRight,
  faLongArrowLeft,
  faLongArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styled from "styled-components";

import axios from "axios";

import Header from "../components/header.component";
import AccountCard from "../components/account-card.component";
import FeatureCard from "../components/feature-card.component";
import FeedbackCard from "../components/feedback-card.component";
import FaqCard from "../components/faq-card.component";
import Button from "../components/utils/button.component";
import Footer from "../components/footer.component";
import HeroBanner from "../components/hero-banner.component";

import Colors from "../utils/colors.util";

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
            <SectionHeaderTitle>What we offer</SectionHeaderTitle>
            <SectionHeaderDescription>
              Featured Services{" "}
            </SectionHeaderDescription>
          </SectionHeader>
          <SectionContent>
            <Accounts>
              <AccountsHeader>
                <AccountsHeaderRegion>EU-West</AccountsHeaderRegion>
                <AccountsHeaderLink to="/">Change server</AccountsHeaderLink>
                <AccountsHeaderCarouselButtons>
                  <AccountsHeaderCarouselButton>
                    <AccountsHeaderCarouselButtonIcon icon={faAngleLeft} />
                  </AccountsHeaderCarouselButton>
                  <AccountsHeaderCarouselButton>
                    <AccountsHeaderCarouselButtonIcon icon={faAngleRight} />
                  </AccountsHeaderCarouselButton>
                </AccountsHeaderCarouselButtons>
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
              <Features>
                {features.map((feature, key) => {
                  return <FeatureCard key={`feature_${key}`} data={feature} />;
                })}
              </Features>
            </SectionContent>
          </Section>
        ) : null}
        {feedbacks.length ? (
          <Section>
            <SectionHeader>
              <SectionHeaderTitle>Our Community</SectionHeaderTitle>
            </SectionHeader>
            <SectionContent>
              <Feedbacks>
                <FeedbacksHeader>
                  <FeedbacksHeaderCarouselButtons>
                    <FeedbacksHeaderCarouselButton>
                      <FeedbacksHeaderCarouselButtonIcon
                        icon={faLongArrowLeft}
                      />
                    </FeedbacksHeaderCarouselButton>
                    <FeedbacksHeaderCarouselButton>
                      <FeedbacksHeaderCarouselButtonIcon
                        icon={faLongArrowRight}
                      />
                    </FeedbacksHeaderCarouselButton>
                  </FeedbacksHeaderCarouselButtons>
                </FeedbacksHeader>
                <FeedbacksContent>
                  {feedbacks.map((feedback, key) => {
                    return (
                      <FeedbackCard key={`feedback_${key}`} data={feedback} />
                    );
                  })}
                </FeedbacksContent>
              </Feedbacks>
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
                  return (
                    <FaqCard
                      key={`faq_${key}`}
                      data={item}
                      defaultActive={key === 0 ? true : false}
                    />
                  );
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
const Section = styled.section`
  padding: 20px;
`;
const SectionHeader = styled.div``;
const SectionHeaderTitle = styled.h2`
  margin: 0;
  color: white;
  text-align: center;
`;
const SectionHeaderDescription = styled.p`
  margin: 0;
  text-align: center;
  color: ${Colors.primary};
  font-weight: 700;
`;
const SectionContent = styled.div``;

const Accounts = styled.div``;
const AccountsHeader = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const AccountsHeaderRegion = styled.h2`
  color: white;
  margin: 20px 0 0 0;
  text-align: center;
`;
const AccountsHeaderLink = styled(Link)`
  color: ${Colors.primary};
  font-weight: 700;
  text-transform: uppercase;
`;
const AccountsHeaderCarouselButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 10px 0 0 0;
`;
const AccountsHeaderCarouselButton = styled.button`
  background-color: transparent;
  border: 2px solid ${Colors.primary};
  border-radius: 5px;
  padding: 3px 8px;
`;
const AccountsHeaderCarouselButtonIcon = styled(FontAwesomeIcon)`
  color: ${Colors.primary};
  font-size: 1.2rem;
`;
const AccountsContent = styled.div`
  margin: 20px 0 0 0;
`;

const Features = styled.div`
  margin: 20px 0 0 0;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 30px;
`;

const Feedbacks = styled.div``;
const FeedbacksHeader = styled.div`
  margin: 20px 0 0 0;
`;
const FeedbacksHeaderCarouselButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50px);
  justify-content: center;
`;
const FeedbacksHeaderCarouselButton = styled.button`
  font-size: 1.2rem;
  background-color: transparent;
  border: none;
`;
const FeedbacksHeaderCarouselButtonIcon = styled(FontAwesomeIcon)`
  color: rgba(255, 255, 255, 0.3);
  font-size: 1.5rem;
  &:last-child {
    color: red;
  }
`;
const FeedbacksContent = styled.div`
  margin: 20px 0 0 0;
`;

const Faq = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  margin: 20px 0 0 0;
`;
