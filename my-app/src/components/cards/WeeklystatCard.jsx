import React from "react";
import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// ---------- Styled Components ----------
const Card = styled.div`
  flex: 1;
  min-width: 300px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const Stat = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StatLabel = styled.span`
  font-weight: 500;
`;

const StatValue = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 200px;
`;

const ProgressWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  width: 100%;
`;

const ProgressContainer = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProgressText = styled.p`
  text-align: center;
  margin-top: 10px;
  color: ${({ theme }) => theme.text_secondary};
`;

// ---------- Component ----------
const WeeklyStatCard = ({ data }) => {
  // Example data for daily calories burned
  const dailyCalories = [
    { day: "Mon", calories: 500 },
    { day: "Tue", calories: 700 },
    { day: "Wed", calories: 600 },
    { day: "Thu", calories: 800 },
    { day: "Fri", calories: 400 },
    { day: "Sat", calories: 900 },
    { day: "Sun", calories: 750 },
  ];

  // Weekly goal for calories burned
  const weeklyGoal = 4000;
  const totalCalories = data?.totalCaloriesBurned || 0;
  const caloriesProgress = Math.min((totalCalories / weeklyGoal) * 100, 100);

  // 🔥 Dynamic color based on progress
  const getProgressColor = (value) => {
    if (value >= 100) return "#33FF57"; // Green - goal completed
    if (value >= 70) return "#FFC300"; // Yellow - close
    return "#FF5733"; // Red - still low
  };

  return (
    <Card>
      <Title>Weekly Stats</Title>

      {/* Stats Section */}
      <Stat>
        <StatLabel>Total Calories Burned:</StatLabel>
        <StatValue>{totalCalories} kcal</StatValue>
      </Stat>
      <Stat>
        <StatLabel>Total Workouts:</StatLabel>
        <StatValue>{data?.totalWorkouts ?? "--"}</StatValue>
      </Stat>
      <Stat>
        <StatLabel>Avg Calories per Workout:</StatLabel>
        <StatValue>{data?.avgCaloriesPerWorkout ?? "--"} kcal</StatValue>
      </Stat>
      <Stat>
        <StatLabel>Active Minutes:</StatLabel>
        <StatValue>320 mins</StatValue>
      </Stat>
      <Stat>
        <StatLabel>Steps Taken:</StatLabel>
        <StatValue>45,000 steps</StatValue>
      </Stat>

      {/* Progress + Chart Section */}
      <ProgressWrapper>
        {/* Circular Progress */}
        <ProgressContainer>
          <CircularProgressbar
            value={caloriesProgress}
            text={`${Math.round(caloriesProgress)}%`}
            styles={buildStyles({
              textColor: getProgressColor(caloriesProgress),
              pathColor: getProgressColor(caloriesProgress),
              trailColor: "#f0f0f0",
            })}
          />
          <ProgressText>
            {totalCalories}/{weeklyGoal} kcal
          </ProgressText>
        </ProgressContainer>

        {/* Bar Chart */}
        <ChartContainer>
          <ResponsiveContainer>
            <BarChart data={dailyCalories}>
              <defs>
                <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF5733" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FFC300" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="calories" fill="url(#colorCalories)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ProgressWrapper>
    </Card>
  );
};

export default WeeklyStatCard;
