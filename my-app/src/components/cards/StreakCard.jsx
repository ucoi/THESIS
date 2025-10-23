import React from "react";
import styled from "styled-components";
import {
  LocalFireDepartmentRounded,
  EmojiEventsRounded,
} from "@mui/icons-material";

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 15};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary}15 0%,
    ${({ theme }) => theme.secondary}15 100%
  );
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

const DecorCircle = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary}10;
  top: -50px;
  right: -50px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  animation: flame 1.5s ease-in-out infinite;

  @keyframes flame {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;

const StreakNumber = styled.div`
  font-size: 56px;
  font-weight: 800;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  position: relative;
  z-index: 1;

  @media (max-width: 600px) {
    font-size: 48px;
  }
`;

const StreakLabel = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  position: relative;
  z-index: 1;
`;

const Message = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
  position: relative;
  z-index: 1;
`;

const Milestones = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  position: relative;
  z-index: 1;
`;

const Milestone = styled.div`
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  background: ${({ theme, achieved }) =>
    achieved ? theme.primary + 20 : theme.text_secondary + 10};
  border: 2px solid
    ${({ theme, achieved }) => (achieved ? theme.primary : "transparent")};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const MilestoneIcon = styled.div`
  color: ${({ theme, achieved }) =>
    achieved ? theme.primary : theme.text_secondary};
  font-size: 20px;
`;

const MilestoneText = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme, achieved }) =>
    achieved ? theme.primary : theme.text_secondary};
  text-align: center;
`;

const StreakCard = ({ streak = 0, lastWorkout = null }) => {
  // Calculate if workout was today
  const isToday =
    lastWorkout &&
    new Date(lastWorkout).toDateString() === new Date().toDateString();

  const getMessage = (days) => {
    if (days === 0) return "Start your streak today! 🚀";
    if (days === 1) return "Great start! Keep it going! 💪";
    if (days < 7) return "Building momentum! Don't break it! 🔥";
    if (days < 30) return "You're on fire! Consistency is key! ⚡";
    if (days < 100) return "Incredible dedication! You're unstoppable! 🌟";
    return "LEGENDARY STATUS! Hall of Fame! 👑";
  };

  const milestones = [
    { days: 7, label: "1 Week", achieved: streak >= 7 },
    { days: 30, label: "1 Month", achieved: streak >= 30 },
    { days: 100, label: "100 Days", achieved: streak >= 100 },
  ];

  return (
    <Card>
      <DecorCircle />

      <Header>
        <Title>Workout Streak</Title>
        <IconWrapper>
          <LocalFireDepartmentRounded sx={{ fontSize: "28px" }} />
        </IconWrapper>
      </Header>

      <StreakNumber>{streak}</StreakNumber>
      <StreakLabel>{streak === 1 ? "Day" : "Days"} in a row!</StreakLabel>

      <Message>{getMessage(streak)}</Message>

      <Milestones>
        {milestones.map((milestone) => (
          <Milestone key={milestone.days} achieved={milestone.achieved}>
            <MilestoneIcon achieved={milestone.achieved}>
              {milestone.achieved ? <EmojiEventsRounded /> : "🔒"}
            </MilestoneIcon>
            <MilestoneText achieved={milestone.achieved}>
              {milestone.label}
            </MilestoneText>
          </Milestone>
        ))}
      </Milestones>
    </Card>
  );
};

export default StreakCard;
