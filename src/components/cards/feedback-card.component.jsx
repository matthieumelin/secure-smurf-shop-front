import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";

import Colors from "../../utils/colors.util";

export default function FeedbackCard({ data }) {
  return (
    <StyledFeedbackCard>
      <FeedbackCardAuthor>
        <FeedbackCardAuthorUsername>
          Posted by {data.author.username}
        </FeedbackCardAuthorUsername>
      </FeedbackCardAuthor>
      <FeedbackCardStars>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <FeedbackCardStar
              key={`star_${index}`}
              icon={faStar}
              data-active={index <= data.rating}
            />
          );
        })}
      </FeedbackCardStars>
      <FeedbackCardTitle>{data.title}</FeedbackCardTitle>
      <FeedbackCardDescription>{data.message}</FeedbackCardDescription>
      <FeedbackCardDate>{data.date}</FeedbackCardDate>
    </StyledFeedbackCard>
  );
}

const StyledFeedbackCard = styled.div`
  background-color: ${Colors.gray};
  padding: 20px;
  border-radius: 10px;
`;
const FeedbackCardStars = styled.div`
display:grid;
grid-template-columns: repeat(5, 23px);
`;
const FeedbackCardStar = styled(FontAwesomeIcon)`
  color: #e5e5e5;
  &[data-active="true"] {
    color: ${Colors.yellow};
  }
`;
const FeedbackCardAuthor = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 20px 0;
`;
const FeedbackCardAuthorUsername = styled.p`
  color: white;
  margin: 0;
`;
const FeedbackCardTitle = styled.h4`
  color: white;
  margin: 10px 0 10px 0;
`;
const FeedbackCardDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
`;
const FeedbackCardDate = styled.p`
  color: rgba(255,255,255,0.7);
  font-style: italic;
  margin: 10px 0 0 0;
`;