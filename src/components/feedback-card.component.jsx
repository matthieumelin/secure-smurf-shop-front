import React from "react";

import styled from "styled-components";
import Colors from "../utils/colors.util";

export default function FeedbackCard({ data }) {
  return (
    <StyledFeedbackCard>
      <FeedbackCardAuthor>
        <FeedbackCardAuthorAvatar
          src={data.author.avatar}
          alt={data.author.username}
        />
        <FeedbackCardAuthorUsername>
          {data.author.username}
        </FeedbackCardAuthorUsername>
      </FeedbackCardAuthor>
      <FeedbackCardTitle>{data.title}</FeedbackCardTitle>
      <FeedbackCardDescription>{data.message}</FeedbackCardDescription>
    </StyledFeedbackCard>
  );
}

const StyledFeedbackCard = styled.div`
  background-color: ${Colors.gray};
  padding: 20px;
  border-radius: 10px;
`;
const FeedbackCardAuthor = styled.div`
display: flex;
align-items: center;
margin: 0 0 20px 0;
`;
const FeedbackCardAuthorAvatar = styled.img`
object-fit: cover;
border-radius: 100px;
display: block;
margin: 0 10px 0 0;
`;
const FeedbackCardAuthorUsername = styled.p`
color: white;
margin: 0;
`;
const FeedbackCardTitle = styled.h4`
color: white;
margin: 0px 0 10px 0;
`;
const FeedbackCardDescription = styled.p`
color: rgba(255,255,255,0.7);
margin: 0;
`;