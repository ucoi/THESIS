import React from "react";
import styled from "styled-components";
import { PieChart } from "@mui/x-charts/PieChart";

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  min-height: 320px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
`;

const CategoryChart = ({ data }) => {
  const pieData = data?.pieChartData || [
    { id: 0, value: 30, label: "Abs" },
    { id: 1, value: 25, label: "Shoulders" },
    { id: 2, value: 20, label: "Legs" },
    { id: 3, value: 15, label: "Back" },
  ];

  return (
    <Card>
      <Title>Workout Categories</Title>
      <PieChart
        series={[
          {
            data: pieData,
            innerRadius: 40,
            outerRadius: 120,
            paddingAngle: 4,
            cornerRadius: 4,
          },
        ]}
        height={280}
      />
    </Card>
  );
};

export default CategoryChart;
