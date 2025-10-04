import React from "react";
import styled from "styled-components";
import CountsCard from "../components/cards/CountCard";
import WeeklysStatCard from "../components/cards/WeeklystatCard";

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
  }
`;

const Dashboard = () => {
  const data = [
    {
      id: 1, // Unique ID
      name: "Total Calories Burned",
      Key: "totalCaloriesBurned",
      unit: "kcal",
      desc: "Calories burned this week",
      color: "#FF5733",
      bg: "#FFE6E6",
      icon: "🔥",
    },
    {
      id: 2, // Unique ID
      name: "Total Workouts",
      Key: "totalWorkouts",
      unit: "",
      desc: "Workouts completed this week",
      color: "#33B5FF",
      bg: "#E6F7FF",
      icon: "🏋️",
    },
    {
      id: 3, // Unique ID
      name: "Avg Calories per Workout",
      Key: "avgCaloriesPerWorkout",
      unit: "kcal",
      desc: "Average calories burned per workout",
      color: "#33FF57",
      bg: "#E6FFE6",
      icon: "⚡",
    },
  ];

  // Numeric values for the keys
  const dataValues = {
    totalCaloriesBurned: 3500,
    totalWorkouts: 5,
    avgCaloriesPerWorkout: 700,
  };

  return (
    <Container>
      <Wrapper>
        <Title>Dashboard</Title>
        <FlexWrap>
          {data.map((item) => (
            <CountsCard key={item.id} item={item} data={dataValues} />
          ))}
        </FlexWrap>
        <FlexWrap>
          <WeeklysStatCard data={dataValues} />
        </FlexWrap>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
