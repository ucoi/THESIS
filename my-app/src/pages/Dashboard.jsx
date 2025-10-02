import React from "react";
import styled from "styled-components";
import { counts } from "../utils/data";
import CountsCard from "../components/cards/CountCard";
const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0px;
  overflow-y: scroll;
`;
const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 768px) {
    gap: 12px;
  }
`;
const Title = styled.div`
  padding: 0 16px;
  font-size: 32px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
`;
const FlexWrap = styled.div`
  display: flex; /* Arrange items in a row */
  flex-wrap: wrap; /* Allow items to wrap to the next line if needed */
  justify-content: center; /* Center items horizontally */
  gap: 22px; /* Add spacing between items */
  padding: 0px 16px; /* Add padding around the container */
  @media (max-width: 768px) {
    gap: 12px;
`;

const Dashboard = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Dashboard</Title>
        <FlexWrap>
          {counts.map((item) => (
            <CountsCard item={item} />
          ))}
        </FlexWrap>
        <FlexWrap>
          <WeeklysStat></WeeklysStat>
        </FlexWrap>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
