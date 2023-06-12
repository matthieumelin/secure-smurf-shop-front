import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import styled from "styled-components";

import Footer from "../components/footer.component";
import Navbar from "../components/navbar.component";
import Loading from "../components/loading.component";

import Colors from "../utils/colors.util";

import axios from "axios";
import { API_ENDPOINTS } from "../api/api";

export default function PrivacyPolicy() {
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      await axios
        .get(API_ENDPOINTS.PRIVACY_POLICY)
        .then((res) => { if (res.status === 200) setContent(res.data.content) })
        .catch((err) => { if (err) console.error(err.response.data.message) });
    };

    fetchContent();
  }, []);

  if (!content) {
    return <Loading />;
  }

  return (
    <StyledPrivacyPolicy>
      <Helmet>
        <title>Privacy Policy</title>
      </Helmet>
      <Navbar />
      <Main>
        {content && <MainContent dangerouslySetInnerHTML={{ __html: content }} />}
      </Main>
      <Footer />
    </StyledPrivacyPolicy>
  );
}

const StyledPrivacyPolicy = styled.div`
`;
const Main = styled.main`
  padding: 30px;
  max-width: 1440px;
  margin: 0 auto;
`;
const MainContent = styled.div`
color: white;
font-family: inherit;

& a {
  color: ${Colors.primary};
}
`; 
