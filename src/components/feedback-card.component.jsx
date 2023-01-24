import React from "react";

import styled from "styled-components";

export default function FeedbackCard({ data }) {
  return (
    <StyledFeedbackCard>
      <FeedbackCardAuthor>
        <FeedbackCardAuthorAvatar
          src={data.author.avatar}
          alt={data.author.username}
        />
        <FeedbackCardAuthorUsername>{data.author.username}</FeedbackCardAuthorUsername>
      </FeedbackCardAuthor>
    </StyledFeedbackCard>
  );
}

const StyledFeedbackCard = styled.div``;
const FeedbackCardAuthor = styled.div``;
const FeedbackCardAuthorAvatar = styled.img``;
const FeedbackCardAuthorUsername = styled.h3``;