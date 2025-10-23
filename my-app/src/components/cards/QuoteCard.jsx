import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FormatQuoteRounded, RefreshRounded } from "@mui/icons-material";

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 28px;
  border: 1px solid ${({ theme }) => theme.text_primary + 15};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: ${({ theme }) => theme.card};
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadow_lg};
  }

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  color: ${({ theme }) => theme.primary}20;
  font-size: 80px;
`;

const QuoteText = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.6;
  position: relative;
  z-index: 1;
  font-style: italic;
  min-height: 80px;
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    font-size: 16px;
    min-height: 70px;
  }
`;

const QuoteAuthor = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 600;
  text-align: right;
  position: relative;
  z-index: 1;

  &::before {
    content: "— ";
  }
`;

const RefreshButton = styled.button`
  position: absolute;
  bottom: 16px;
  right: 16px;
  background: ${({ theme }) => theme.primary}20;
  color: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: rotate(180deg);
  }

  &:active {
    transform: rotate(180deg) scale(0.9);
  }
`;

const QuoteCard = () => {
  const quotes = [
    {
      text: "The only bad workout is the one that didn't happen.",
      author: "Unknown",
    },
    {
      text: "Success is the sum of small efforts repeated day in and day out.",
      author: "Robert Collier",
    },
    {
      text: "Your body can stand almost anything. It's your mind you have to convince.",
      author: "Unknown",
    },
    {
      text: "The pain you feel today will be the strength you feel tomorrow.",
      author: "Arnold Schwarzenegger",
    },
    {
      text: "Take care of your body. It's the only place you have to live.",
      author: "Jim Rohn",
    },
    {
      text: "The hard days are what make you stronger.",
      author: "Aly Raisman",
    },
    {
      text: "Don't count the days, make the days count.",
      author: "Muhammad Ali",
    },
    {
      text: "Fitness is not about being better than someone else. It's about being better than you used to be.",
      author: "Khloe Kardashian",
    },
    {
      text: "The only person you are destined to become is the person you decide to be.",
      author: "Ralph Waldo Emerson",
    },
    {
      text: "Push yourself because no one else is going to do it for you.",
      author: "Unknown",
    },
    {
      text: "Fall in love with taking care of yourself.",
      author: "Unknown",
    },
    {
      text: "You don't have to be extreme, just consistent.",
      author: "Unknown",
    },
  ];

  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useEffect(() => {
    // Get random quote on mount
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
  }, []);

  const getNewQuote = () => {
    let newQuote;
    do {
      newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (newQuote.text === currentQuote.text && quotes.length > 1);
    setCurrentQuote(newQuote);
  };

  return (
    <Card>
      <QuoteIcon>
        <FormatQuoteRounded sx={{ fontSize: "inherit" }} />
      </QuoteIcon>

      <QuoteText>"{currentQuote.text}"</QuoteText>
      <QuoteAuthor>{currentQuote.author}</QuoteAuthor>

      <RefreshButton onClick={getNewQuote} title="New quote">
        <RefreshRounded />
      </RefreshButton>
    </Card>
  );
};

export default QuoteCard;
