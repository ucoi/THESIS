import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { counts } from "../utils/data";
import CountsCard from "../components/cards/CountCard";
import WeeklyStatCard from "../components/cards/WeeklystatCard";
import CategoryChart from "../components/cards/CategoryChart";
import AddWorkout from "../components/AddWorkout";
import WorkoutCard from "../components/cards/WorkoutCard";
import StreakCard from "../components/cards/StreakCard";
import QuoteCard from "../components/cards/QuoteCard";
import WeeklyGoalCard from "../components/cards/WeeklyGoalCard";
import { getDashboardDetails, getWorkouts } from "../api";
import { useSelector } from "react-redux";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Title = styled.div`
  padding: 0px 16px;
  font-size: 28px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 700;

  span {
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.primary} 0%,
      ${({ theme }) => theme.secondary} 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const SectionTitle = styled.div`
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.text_secondary};
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  border: 2px dashed ${({ theme }) => theme.text_secondary}30;

  h3 {
    font-size: 24px;
    margin-bottom: 12px;
    color: ${({ theme }) => theme.text_primary};
  }

  p {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .emoji {
    font-size: 64px;
    margin-bottom: 16px;
  }
`;

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [streak, setStreak] = useState(0);
  const [weeklyWorkouts, setWeeklyWorkouts] = useState(0);

  const dashboardData = async () => {
    setLoading(true);
    try {
      const res = await getDashboardDetails();
      console.log("Dashboard data refreshed:", res.data);
      setData(res.data);

      // Calculate streak (you can enhance this with backend data)
      calculateStreak(res.data);

      // Calculate weekly workouts
      setWeeklyWorkouts(res.data?.totalWorkouts || 0);
    } catch (err) {
      console.error("Dashboard error:", err);
      alert(err?.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const getTodaysWorkout = async () => {
    setLoading(true);
    try {
      const res = await getWorkouts("");
      console.log("Today's workouts refreshed:", res?.data?.todaysWorkouts);
      setTodaysWorkouts(res?.data?.todaysWorkouts || []);
    } catch (err) {
      console.error("Get workouts error:", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStreak = (dashboardData) => {
    // Simple streak calculation - you can enhance this
    // For now, if there are workouts today, increment streak
    const hasWorkoutToday = todaysWorkouts.length > 0;

    // This is a placeholder - in production, you'd calculate this on backend
    // based on consecutive days with workouts
    const currentStreak = dashboardData?.totalWorkouts
      ? Math.min(dashboardData.totalWorkouts, 100)
      : 0;
    setStreak(currentStreak);
  };

  const addNewWorkout = async () => {
    console.log("addNewWorkout callback triggered");
    await dashboardData();
    await getTodaysWorkout();
  };

  const handleDeleteWorkout = async () => {
    await dashboardData();
    await getTodaysWorkout();
  };

  useEffect(() => {
    dashboardData();
    getTodaysWorkout();
  }, []);

  const getFirstName = () => {
    const fullName = currentUser?.user?.name || currentUser?.name || "User";
    return fullName.split(" ")[0];
  };

  return (
    <Container>
      <Wrapper>
        <Title>
          Hey, <span>{getFirstName()}</span> 👋
        </Title>

        {/* Stats Cards Row */}
        <FlexWrap>
          {counts.map((item) => (
            <CountsCard key={item.name} item={item} data={data} />
          ))}
        </FlexWrap>

        {/* Motivation & Goals Row */}
        <FlexWrap>
          <QuoteCard />
          <StreakCard streak={streak} lastWorkout={todaysWorkouts[0]?.date} />
          <WeeklyGoalCard completedWorkouts={weeklyWorkouts} />
        </FlexWrap>

        {/* Charts & Add Workout Row */}
        <FlexWrap>
          <WeeklyStatCard data={data} />
          <CategoryChart data={data} />
          <AddWorkout
            addNewWorkout={addNewWorkout}
            buttonLoading={buttonLoading}
          />
        </FlexWrap>

        {/* Today's Workouts Section */}
        <Section>
          <SectionTitle>Today's Workouts</SectionTitle>
          {todaysWorkouts.length > 0 ? (
            <CardWrapper>
              {todaysWorkouts.map((workout) => (
                <WorkoutCard
                  key={workout._id}
                  workout={workout}
                  onDelete={handleDeleteWorkout}
                />
              ))}
            </CardWrapper>
          ) : (
            <EmptyState>
              <div className="emoji">🏋️</div>
              <h3>No workouts yet today</h3>
              <p>Time to get moving! Add your first workout above.</p>
            </EmptyState>
          )}
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
