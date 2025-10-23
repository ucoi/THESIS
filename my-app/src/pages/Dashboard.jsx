import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { counts } from "../utils/data";
import CountsCard from "../components/cards/CountCard";
import WeeklyStatCard from "../components/cards/WeeklystatCard";
import CategoryChart from "../components/cards/CategoryChart";
import AddWorkout from "../components/AddWorkout";
import WorkoutCard from "../components/cards/WorkoutCard";
import { getDashboardDetails, getWorkouts } from "../api";
import { useSelector } from "react-redux"; // 👈 ADD THIS

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
  font-size: 28px; // 👈 INCREASED SIZE
  color: ${({ theme }) => theme.text_primary};
  font-weight: 700; // 👈 MADE BOLDER

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

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user); // 👈 ADD THIS
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);

  const dashboardData = async () => {
    setLoading(true);
    try {
      const res = await getDashboardDetails();
      console.log("Dashboard data refreshed:", res.data);
      setData(res.data);
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

  // 👇 ADD THIS - Get first name from user
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
        <FlexWrap>
          {counts.map((item) => (
            <CountsCard key={item.name} item={item} data={data} />
          ))}
        </FlexWrap>

        <FlexWrap>
          <WeeklyStatCard data={data} />
          <CategoryChart data={data} />
          <AddWorkout
            addNewWorkout={addNewWorkout}
            buttonLoading={buttonLoading}
          />
        </FlexWrap>

        <Section>
          <SectionTitle>Today's Workouts</SectionTitle>
          <CardWrapper>
            {todaysWorkouts.map((workout) => (
              <WorkoutCard
                key={workout._id}
                workout={workout}
                onDelete={handleDeleteWorkout}
              />
            ))}
          </CardWrapper>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
