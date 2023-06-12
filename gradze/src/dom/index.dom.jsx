import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCheckout } from "../redux/reducers/checkout.reducer";

import styled, { keyframes, css } from "styled-components";

import Header from "../components/header.component";
import Footer from "../components/footer.component";
import AccountCard from "../components/cards/account-card.component";
import FeatureCard from "../components/cards/feature-card.component";
import FaqCard from "../components/cards/faq-card.component";
import GuaranteeCard from "../components/cards/guarantee-card.component";
import Button from "../components/utils/button.component";
import ProductRegionCard from "../components/cards/product-region-card.component";
import ExperienceCard from "../components/cards/experience-step.component";

import Colors from "../utils/colors.util";

import axios from "axios";
import { API_ENDPOINTS } from "../api/api";
import AppRoutes from "../router/app.routes";
import Checkout from "../components/checkout.component";

export default function IndexDom({ showCheckoutModal, setShowCheckoutModal }) {
  // Redux
  const token = useSelector((state) => state.user.token);
  const userData = useSelector((state) => state.user.data);
  const checkout = useSelector((state) => state.checkout.data);
  const dispatch = useDispatch();

  // Router
  const navigate = useNavigate();

  // States
  const [features, setFeatures] = useState([]);
  const [experience, setExperience] = useState([]);
  const [guarantee, setGuarantee] = useState([]);
  const [faq, setFaq] = useState([]);

  const [productRegions, setProductRegions] = useState([]);
  const [showProductRegions, setShowProductRegions] = useState(true);
  const [currentProductRegion, setCurrentProductRegion] = useState({});

  const [products, setProducts] = useState([]);

  const [currentExperience, setCurrentExperience] = useState({});

  const [processing, setProcessing] = useState(false);

  // States animations
  const [fade, setFade] = useState(false);

  // Refs
  const productRegionsRef = useRef(productRegions);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(API_ENDPOINTS.PRODUCT_REGIONS)
        .then((res) => { if (res.status === 200) setProductRegions(res.data) })
        .catch((err) => { if (err) console.error(err) });
      await axios
        .get(API_ENDPOINTS.PRODUCTS)
        .then((res) => { if (res.status === 200) setProducts(res.data) })
        .catch((err) => { if (err) console.error(err) });
    };

    axios.get("./data.json").then((res) => {
      setFeatures(res.data.features);
      setExperience(res.data.experience);
      setGuarantee(res.data.guarantee);
      setFaq(res.data.faq);
      setCurrentProductRegion(productRegionsRef.current[0]);
      setCurrentExperience(res.data.experience[0]);
    });
    fetchData();
  }, []);

  const onSelectProductRegion = (region) => {
    setShowProductRegions(false);
    setCurrentProductRegion(region);
    setFade(true);
  };


  const onProcessToCheckout = (product) => {
    if (!token) {
      navigate(AppRoutes.Login);
      return;
    }

    document.body.style.overflow = "hidden";

    const newProduct = {
      userId: userData.id,
      quantity: 1,
      stock: product.stock,
      id: product.id,
      name: product.name,
      unitPrice: product.price,
      blueEssence: product.blueEssence,
      region: product.region
    };

    if (!showCheckoutModal) setShowCheckoutModal(true);

    const products = checkout?.products || [];

    const isDuplicateProduct = products.some(item => item.id === product.id);

    if (isDuplicateProduct) return;

    const clonedCheckout = { ...checkout, products: [...products, newProduct] };

    dispatch(setCheckout(clonedCheckout));

    sessionStorage.setItem("checkout", JSON.stringify(clonedCheckout));
  };

  const onClose = () => {
    document.body.style.overflow = "initial";

    setShowCheckoutModal(false);
  }

  const onProcessToPayment = async (type) => {
    setProcessing(true);

    if (type === "card") {
      await axios
        .post(API_ENDPOINTS.STRIPE_CREATE_CHECKOUT_SESSION, {
          userId: userData.id,
          products: checkout.products,
        })
        .then((res) => {
          if (res.status === 200) {
            const url = res.data.url;

            if (url) window.location.assign(url);

            setProcessing(false);
          }
        });
    }
  }

  const onBackToProductRegions = () => {
    setCurrentProductRegion(null);
    setShowProductRegions(true);
  }

  return (
    <StyledIndex>
      <Header />
      <Main>
        {showCheckoutModal ?
          <Checkout
            processing={processing}
            onClose={onClose}
            onProcessToPayment={onProcessToPayment} /> : null}
        {productRegions.length &&
          products.length ? (
          <Section>
            {productRegions.filter((productRegion) => {
              const filteredProducts = products.filter(
                (product) =>
                  product.region.toUpperCase() ===
                  productRegion.shortName.toUpperCase()
              );
              return filteredProducts.some((product) => !product.disabled);
            }) && !currentProductRegion && (
                <SectionHeader>
                  <SectionHeaderTitle>Choose Your Region</SectionHeaderTitle>
                </SectionHeader>
              )}
            <SectionContent>
              {showProductRegions ? (
                <Regions regions={productRegions
                  .filter((productRegion) => {
                    const filteredProducts = products.filter(
                      (product) =>
                        product.region.toUpperCase() ===
                        productRegion.shortName.toUpperCase()
                    );
                    return filteredProducts.length > 0 &&
                      filteredProducts.some((product) => !product.disabled);
                  }).length}>
                  {productRegions
                    .filter((productRegion) => {
                      const filteredProducts = products.filter(
                        (product) =>
                          product.region.toUpperCase() ===
                          productRegion.shortName.toUpperCase()
                      );
                      return filteredProducts.length > 0 &&
                        filteredProducts.some((product) => !product.disabled);
                    })
                    .sort((a, b) => new Date(b.createdAt) < new Date(a.createdAt))
                    .map((productRegion, index) => {
                      return (
                        <ProductRegionCard
                          key={`product_region_${index}`}
                          data={productRegion}
                          onClick={() => onSelectProductRegion(productRegion)}
                        />
                      );
                    })}
                </Regions>
              ) : (
                currentProductRegion && (
                  <Products>
                    <ProductsHeader>
                      <ProductsHeaderRegion>
                        <ProductsHeaderRegionHeader>
                          <ProductsHeaderRegionHeaderBackButton type="button" onClick={() => onBackToProductRegions()}>
                            <ProductsHeaderRegionHeaderBackButtonIcon src={`${process.env.PUBLIC_URL}/assets/icons/house.svg`} alt="Back" />
                          </ProductsHeaderRegionHeaderBackButton>
                          <ProductsHeaderRegionHeaderTitle>
                            {currentProductRegion.name}
                          </ProductsHeaderRegionHeaderTitle>
                        </ProductsHeaderRegionHeader>
                      </ProductsHeaderRegion>
                    </ProductsHeader>
                    <ProductsContent>
                      {currentProductRegion &&
                        <ProductsContentRegions regions={productRegions
                          .filter((productRegion) => {
                            const filteredProducts = products.filter(
                              (product) =>
                                product.region.toUpperCase() ===
                                productRegion.shortName.toUpperCase()
                            );
                            return (
                              filteredProducts.length > 0
                            );
                          }).length}>
                          {productRegions
                            .filter((productRegion) => {
                              const filteredProducts = products.filter(
                                (product) =>
                                  product.region.toUpperCase() ===
                                  productRegion.shortName.toUpperCase()
                              );
                              return (
                                filteredProducts.length > 0
                              );
                            })
                            .map((productRegion, index) => {
                              return (
                                <ProductsContentProductRegions
                                  key={`product_region_${index}`}
                                >
                                  <Button width={"200px"} title={productRegion.name} type={"submit"} onClick={() => onSelectProductRegion(productRegion)
                                  } />
                                </ProductsContentProductRegions>
                              );
                            })}
                        </ProductsContentRegions>
                      }
                      <ProductsContentProducts
                        fade={fade}
                        onAnimationEnd={() => setFade(false)}
                        products={products
                          .filter(
                            (product) =>
                              !product.disabled &&
                              product.region.toUpperCase() ===
                              currentProductRegion.shortName.toUpperCase()
                          ).length}>
                        {products
                          .filter(
                            (product) =>
                              !product.disabled &&
                              product.region.toUpperCase() ===
                              currentProductRegion.shortName.toUpperCase()
                          )
                          .sort((a, b) => new Date(b.createdAt) < new Date(a.createdAt))
                          .map((product, index) => {
                            return (
                              <AccountCard
                                key={`product_${index}`}
                                data={product}
                                processing={processing}
                                onClick={() => onProcessToCheckout(product)}
                              />
                            );
                          })}
                      </ProductsContentProducts>
                    </ProductsContent>
                  </Products>
                )
              )}
            </SectionContent>
          </Section>
        ) : null}
        {features.length ? (
          <Section>
            <SectionHeader>
              <SectionHeaderTitle>Our Features</SectionHeaderTitle>
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
            <SectionContent>
              {currentExperience && (
                <Experience>
                  <ExperienceStep>
                    <ExperienceStepImage
                      src={`${process.env.PUBLIC_URL}/assets/images/${currentExperience.image}`}
                      alt={currentExperience.title}
                    />
                    <ExperienceStepInfos>
                      <ExperienceStepInfosTitle>
                        {currentExperience.title}
                      </ExperienceStepInfosTitle>
                      {currentExperience.description.map(
                        (description, index) => {
                          return (
                            <ExperienceStepInfosDescription
                              key={`experience_step_description_${index}`}
                            >
                              {description}
                            </ExperienceStepInfosDescription>
                          );
                        }
                      )}
                      <ExperienceStepInfosFeatures>
                        {currentExperience.features.map((feature, index) => {
                          return (
                            <ExperienceStepInfosFeaturesItem
                              key={`experience_step_feature_${index}`}
                            >
                              <ExperienceStepInfosFeaturesItemIcon
                                src={`${process.env.PUBLIC_URL}/assets/icons/done.svg`}
                                alt="Check"
                              />{" "}
                              {feature}
                            </ExperienceStepInfosFeaturesItem>
                          );
                        })}
                      </ExperienceStepInfosFeatures>
                      <Button title={"Get started"} />
                    </ExperienceStepInfos>
                  </ExperienceStep>
                  <ExperiencePagination>
                    {experience.map((exp) => {
                      return (
                        <ExperiencePaginationItem
                          key={`experience_pagination_${exp.id}`}
                          active={
                            currentExperience.id === exp.id ? true : false
                          }
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
              )}
            </SectionContent>
          </Section>
        ) : null}
        {guarantee.length ? (
          <Section>
            <SectionHeader>
              <SectionHeaderTitle>
                Your Satisfaction is Guarantee
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
    </StyledIndex >
  );
}

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledIndex = styled.div`
  position: relative;
`;
const Main = styled.main``;
const Section = styled.section``;
const SectionHeader = styled.div``;
const SectionHeaderTitle = styled.h2`
  margin: 30px 0 0 0;
  color: white;
  text-align: center;

  @media screen and (min-width: 1024px) {
    font-size: 2.25rem;
  }
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
  padding: 0 20px;
  @media screen and (min-width: 1024px) {
    max-width: 90%;
    margin: 30px auto;
  }
`;

const Regions = styled.div`
  margin: 30px 0;
  display: grid;
  justify-content: center;
  grid-gap: 30px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, max-content);
  }

  ${props => {
    if (props.regions >= 3) {
      return `
      @media screen and (min-width: 1024px) {
        grid-template-columns: repeat(3, max-content);
      }
      `;
    }
  }}
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
  margin: 20px 0;

  @media screen and (min-width: 1024px) {
    display: flex;
  }
`;
const ExperienceStepInfosFeaturesItemIcon = styled.img`
  color: ${Colors.primary};
  background-color: ${Colors.primaryLowOp};
  border-radius: 100px;
  margin: 0 5px 10px 0;
  padding: 5px;
  display: block;
  width: 24px;
  height: 24px;

  @media screen and (min-width: 1024px) {
    margin: 0 10px 0 0;
  }
`;
const ExperiencePagination = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 25px);
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

  &:hover {
    cursor: pointer;
  }

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
  margin: 0 0 30px 0;
  @media screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
`;

const Products = styled.div``;
const ProductsHeader = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const ProductsHeaderRegion = styled.h3`
  color: white;
  margin: 20px 0;
  text-align: center;
`;
const ProductsHeaderRegionHeader = styled.div`
display: flex;
align-items: center;
`;
const ProductsHeaderRegionHeaderBackButton = styled.button`
background-color: ${Colors.primary};
padding: 0.5rem;
border-radius: 100px;
border: none;
margin-right: 10px;
transition: 0.2s;
cursor: pointer;

&:hover {
  transition: 0.2s;
  -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
  -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
  box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
}
`;
const ProductsHeaderRegionHeaderBackButtonIcon = styled.img`
width: 18px;
height: 18px;
display: block;
`;
const ProductsHeaderRegionHeaderTitle = styled.h2`
  margin: 0;
`;
const ProductsContent = styled.div``;
const ProductsContentRegions = styled.div`
display: grid;
grid-gap: 20px;
justify-content: center;
margin-bottom: 30px;

@media screen and (min-width: 768px) {
  grid-template-columns: repeat(2, max-content);
}

${props => {
    if (props.regions >= 3) {
      return `
    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(3, max-content);
    }
    `;
    }
  }}
`;
const ProductsContentProducts = styled.div`
  display: grid;
  grid-gap: 20px;
  justify-content: center;
  animation: ${props => props.fade ? css`${fadeInAnimation} 0.5s ease-in-out` : 'none'};

  ${props => {
    if (props.products >= 3) {
      return `
      @media screen and (min-width: 1024px) {
        grid-template-columns: repeat(3, max-content);
      }
      `;
    }
  }}
`;
const ProductsContentProductRegions = styled.div`
`;
const Features = styled.div`
  margin: 30px 0;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 30px;

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    margin: 30px 0 60px 0;
  }
`;
const Guarantee = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  margin: 30px 0 0 0;

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Faq = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  margin: 20px 0 0 0;
  justify-content: center;
`;
