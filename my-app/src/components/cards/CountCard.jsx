import React from "react";
import styled from "styled-components";

const Card = styled.div`
  flex: 1;
  min-width: 200px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 12px;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 600px) {
    gap: 6px;
  }
`;

const Icon = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: ${({ bg }) => bg || "#f0f0f0"};
  color: ${({ color }) => color || "#333"};
  font-size: 28px;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const Value = styled.div`
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 28px;
  color: ${({ theme }) => theme.text_primary};
`;

const Unit = styled.span`
  font-size: 16px;
  margin-bottom: 4px;
`;

const Span = styled.span`
  font-size: 16px;
  font-weight: 500;

  @media (max-width: 600px) {
    font-size: 12px;
  }

  ${({ positive, theme }) =>
    positive ? `color: ${theme.green};` : `color: ${theme.red};`}
`;
const Desc = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 4px;
  @media (max-width: 600px) {
    font-size: 8px;
  }
`;
const CountCard = ({ item }) => {
  return (
    <Card>
      <Left>
        <Title>{item.name}</Title>
        <Value>
          123
          <Unit>{item.unit}</Unit>
          <Span positive>(+10%)</Span>
        </Value>
        <Desc>{item.desc}</Desc>
      </Left>
      <Icon color={item.color} bg={item.bg}>
        {item.icon}
      </Icon>
    </Card>
  );
};

export default CountCard;
