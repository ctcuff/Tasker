import React from 'react';
import styled, { keyframes } from 'styled-components';

const animation = keyframes`
  0% {
    opacity: 0;
  }
  5% {
    opacity: 0;
    transform: translateY(-50px);
  }
  10% {
    opacity: 1;
    transform: translateY(0px);
  }
  25% {
    opacity: 1;
    transform: translateY(0px);
  }
  30% {
    opacity: 0;
    transform: translateY(50px);
  }
  80% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`;

const Wrapper = styled.section`
  /*
    Makes sure the sliding text doesn't go off screen
    when the page is re-sized
  */
  @media screen and (max-width: 990px) {
    width: 80%;
  }

  @media screen and (max-width: 450px) {
    width: 50%;
  }
`;

const SlidingVertical = styled.div`
  display: inline;
  text-indent: 8px;

  & span {
    animation: ${animation} 7.5s linear infinite 0s;
    color: #6c63ff;
    opacity: 0;
    overflow: hidden;
    position: absolute;
  }

  & span:nth-child(2) {
    animation-delay: 2.5s;
  }

  & span:nth-child(3) {
    animation-delay: 5s;
  }
`;

interface SlidingTextProps {
  staticText: string;
  wordList: string[];
}

const SlidingText = ({ staticText, wordList }: SlidingTextProps) => (
  <Wrapper>
    <h1 className="sentence">
      {staticText}
      <SlidingVertical>
        {wordList.map((word, index) => (
          <span key={index}>{word}.</span>
        ))}
      </SlidingVertical>
    </h1>
  </Wrapper>
);

export default SlidingText;
