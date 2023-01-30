import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  faAngleLeft,
  faAngleRight,
  faCheck,
  faLongArrowLeft,
  faLongArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styled from "styled-components";

import axios from "axios";

import Header from "../components/header.component";
import Footer from "../components/footer.component";
import AccountCard from "../components/cards/account-card.component";
import FeatureCard from "../components/cards/feature-card.component";
import FeedbackCard from "../components/cards/feedback-card.component";
import FaqCard from "../components/cards/faq-card.component";
import GuaranteeCard from "../components/cards/guarantee-card.component";
import HeroBanner from "../components/hero-banner.component";

import Colors from "../utils/colors.util";
import Button from "../components/utils/button.component";
import ButtonStyles from "../utils/button-styles.util";
import ServerCard from "../components/cards/server-card.component";
import ExperienceCard from "../components/cards/experience/experience-step.component";

export default function Index() {
  const [features, setFeatures] = useState([]);
  const [experience, setExperience] = useState([]);
  const [guarantee, setGuarantee] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [faq, setFaq] = useState([]);

  const [servers, setServers] = useState([]);
  const [showServers, setShowServers] = useState(true);
  const [currentServer, setCurrentServer] = useState({});

  const [currentExperience, setCurrentExperience] = useState({});

  useEffect(() => {
    axios
      .get("./data.json")
      .then((res) => {
        setFeatures(res.data.features);

        setExperience(res.data.experience);

        setFeedbacks(res.data.feedbacks);

        setGuarantee(res.data.guarantee);

        setFaq(res.data.faq);

        setServers(res.data.servers);
        setCurrentServer(res.data.servers[0]);

        setCurrentExperience(res.data.experience[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const selectServer = (server) => {
    setCurrentServer(server);
    setShowServers(false);
  };

  return (
    <StyledIndex>
      <Header />
      <Main>
        <Section>
          <SectionHeader>
            <SectionHeaderTitle>
              Choose Your{" "}
              <SectionHeaderTitleSpan>Server</SectionHeaderTitleSpan>
            </SectionHeaderTitle>
          </SectionHeader>
          <SectionContent>
            {showServers ? (
              <Servers>
                {servers.map((server, index) => {
                  return (
                    <ServerCard
                      key={`server_${index}`}
                      data={server}
                      selectServer={selectServer}
                    />
                  );
                })}
              </Servers>
            ) : (
              <Accounts>
                <AccountsHeader>
                  <AccountsHeaderRegion>
                    {currentServer.name}
                  </AccountsHeaderRegion>
                  <Button
                    title={"Change server"}
                    theme={ButtonStyles.outlined}
                    onClick={() => setShowServers(true)}
                  />
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
            )}
          </SectionContent>
        </Section>
        {features.length ? (
          <Section>
            <SectionHeader>
              <SectionHeaderTitle>
                Our <SectionHeaderTitleSpan>Features</SectionHeaderTitleSpan>
              </SectionHeaderTitle>
            </SectionHeader>
            <SectionContent>
              <Features>
                {features.map((feature, index) => {
                  return (
                    <FeatureCard key={`feature_${index}`} data={feature} />
                  );
                })}
              </Features>
            </SectionContent>
          </Section>
        ) : null}
        <HeroBanner />
        {experience.length ? (
          <Section style={{ backgroundColor: Colors.gray }}>
            <SectionHeader>
              <SectionHeaderTitle style={{ paddingTop: 30 }}>
                Experience flow
              </SectionHeaderTitle>
              <SectionHeaderDescription>
                The effortless LoL Smurf Account buying process.
              </SectionHeaderDescription>
            </SectionHeader>
            <SectionContent style={{ paddingBottom: 20 }}>
              <Experience>
                <ExperienceStep>
                  <ExperienceStepImage
                    src={`${process.env.PUBLIC_URL}/images/${currentExperience.image}`}
                    alt={currentExperience.title}
                  />
                  <ExperienceStepInfos>
                    <ExperienceStepInfosTitle>
                      {currentExperience.title}
                    </ExperienceStepInfosTitle>
                    {currentExperience.description.map((description, index) => {
                      return (
                        <ExperienceStepInfosDescription
                          key={`experience_step_description_${index}`}
                        >
                          {description}
                        </ExperienceStepInfosDescription>
                      );
                    })}
                    <ExperienceStepInfosFeatures>
                      {currentExperience.features.map((feature, index) => {
                        return (
                          <ExperienceStepInfosFeaturesItem
                            key={`experience_step_feature_${index}`}
                          >
                            <ExperienceStepInfosFeaturesItemIcon
                              icon={faCheck}
                            />{" "}
                            {feature}
                          </ExperienceStepInfosFeaturesItem>
                        );
                      })}
                    </ExperienceStepInfosFeatures>
                    <Button
                      theme={ButtonStyles.outlined}
                      title={"Get started"}
                    />
                  </ExperienceStepInfos>
                </ExperienceStep>
                <ExperiencePagination items={experience.length}>
                  {experience.map((exp) => {
                    return (
                      <ExperiencePaginationItem
                        key={`experience_pagination_${exp.id}`}
                        active={currentExperience.id === exp.id ? true : false}
                        onClick={() => setCurrentExperience(exp)}
                      />
                    );
                  })}
                </ExperiencePagination>
                <ExperienceCards>
                  {experience
                    .map((exp) => exp.card)
                    .map((card) => {
                      const exp = experience.find(
                        (item) => item.id === card.id
                      );
                      return (
                        <ExperienceCard
                          key={`experience_step_${card.id}`}
                          active={
                            currentExperience.id === card.id ? true : false
                          }
                          data={card}
                          dataExp={exp}
                          setCurrentExperience={setCurrentExperience}
                        />
                      );
                    })}
                </ExperienceCards>
              </Experience>
            </SectionContent>
          </Section>
        ) : null}
        {feedbacks.length ? (
          <Section>
            <SectionHeader>
              <SectionHeaderTitle>
                Our <SectionHeaderTitleSpan>Community</SectionHeaderTitleSpan>
              </SectionHeaderTitle>
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
                  {feedbacks.map((feedback, index) => {
                    return (
                      <FeedbackCard key={`feedback_${index}`} data={feedback} />
                    );
                  })}
                </FeedbacksContent>
              </Feedbacks>
            </SectionContent>
          </Section>
        ) : null}
        {guarantee.length ? (
          <Section>
            <SectionHeader>
              <SectionHeaderTitle>
                Your Satisfaction is Guaranteed
              </SectionHeaderTitle>
              <SectionHeaderDescription>
                About Secure Smurf Shop
              </SectionHeaderDescription>
            </SectionHeader>
            <SectionContent>
              <Guarantee>
                {guarantee.map((item, index) => {
                  return (
                    <GuaranteeCard key={`guarantee_${index}`} data={item} />
                  );
                })}
              </Guarantee>
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
                {faq.map((item, index) => {
                  return (
                    <FaqCard
                      key={`faq_${index}`}
                      data={item}
                      defaultActive={index === 0 ? true : false}
                    />
                  );
                })}
              </Faq>
            </SectionContent>
          </Section>
        ) : null}
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

  @media screen and (min-width: 1024px) {
    font-size: 2.25rem;
  }
`;
const SectionHeaderTitleSpan = styled.span`
  color: ${Colors.primary};
`;
const SectionHeaderDescription = styled.p`
  margin: 0;
  text-align: center;
  color: ${Colors.primary};
  font-weight: 700;

  @media screen and (min-width: 1024px) {
    font-size: 1.25rem;
  }
`;
const SectionContent = styled.div`
  @media screen and (min-width: 1024px) {
    max-width: 90%;
    margin: 30px auto;
  }
`;

const Servers = styled.div`
  display: grid;
  grid-gap: 30px;
  row-gap: 20px;
  margin: 30px 0;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Experience = styled.div`
  margin: 30px 0;
  display: grid;
  grid-gap: 20px;
`;
const ExperienceStep = styled.div`
  @media screen and (min-width: 1024px) {
    display: flex;
    align-items: center;
  }
`;
const ExperienceStepImage = styled.img`
  display: block;
  max-width: 100%;
  margin: 0 auto;
  -webkit-animation-name: fadeIn;
  -webkit-animation-duration: 1s;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  animation-name: fadeIn;
  animation-duration: 1s;

  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 0;
    }
    40% {
      opacity: 0.3;
    }
    60% {
      opacity: 0.5;
    }
    80% {
      opacity: 0.9;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 0;
    }
    40% {
      opacity: 0.3;
    }
    60% {
      opacity: 0.5;
    }
    80% {
      opacity: 0.9;
    }
    100% {
      opacity: 1;
    }
  }
`;
const ExperienceStepInfos = styled.div``;
const ExperienceStepInfosTitle = styled.h2`
  color: white;

  @media screen and (min-width: 1024px) {
    font-size: 1.875rem;
    margin: 0;
  }
`;
const ExperienceStepInfosDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
`;
const ExperienceStepInfosFeatures = styled.ul`
  list-style: none;
  padding: 0;
`;
const ExperienceStepInfosFeaturesItem = styled.li`
  color: white;
  margin: 0 0 10px 0;
`;
const ExperienceStepInfosFeaturesItemIcon = styled(FontAwesomeIcon)`
  color: ${Colors.primary};
  background-color: ${Colors.primaryLowOp};
  border-radius: 100px;
  margin: 0 5px 0 0;
  padding: 2px;
`;
const ExperiencePagination = styled.ul`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.items}, 25px)`};
  align-items: center;
  justify-content: center;
  padding: 0;
  list-style: none;
`;
const ExperiencePaginationItem = styled.li`
  border-radius: 100px;
  background-color: ${Colors.lightGray};
  width: 8px;
  height: 8px;
  ${(props) => {
    if (props.active) {
      return `
    width: 12px;
    height: 12px;
    background-color: ${Colors.primary};
    `;
    }
  }}
`;
const ExperienceCards = styled.div`
  @media screen and (min-width: 1024px) {
    display: flex;
    justify-content: space-between;
    padding: 30px;
  }
`;

const Accounts = styled.div``;
const AccountsHeader = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const AccountsHeaderRegion = styled.h3`
  color: white;
  margin: 20px 0;
  text-align: center;
`;
const AccountsHeaderCarouselButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 20px 0 0 0;
`;
const AccountsHeaderCarouselButton = styled.button`
  background-color: transparent;
  border: 2px solid ${Colors.primary};
  border-radius: 5px;
  padding: 3px 8px;
  transition: 0.2s;

  &:hover {
    transition: 0.2s;
    background-color: ${Colors.primary};
  }
`;
const AccountsHeaderCarouselButtonIcon = styled(FontAwesomeIcon)`
  color: ${Colors.primary};
  font-size: 1.2rem;
  transition: 0.2s;

  ${AccountsHeaderCarouselButton}:hover & {
    transition: 0.2s;
    color: white;
  }
`;
const AccountsContent = styled.div`
  margin: 20px 0 0 0;
`;

const Features = styled.div`
  margin: 30xp 0;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 30px;

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
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
  transition: 0.2s;

  ${FeedbacksHeaderCarouselButton}:hover & {
    transition: 0.2s;
    color: ${Colors.primary};
  }
`;
const FeedbacksContent = styled.div`
  margin: 20px 0 0 0;
  display: grid;
  gap: 20px;

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Guarantee = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  margin: 20px 0 0 0;
`;

const Faq = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  margin: 20px 0 0 0;
  justify-content: center;
`;
