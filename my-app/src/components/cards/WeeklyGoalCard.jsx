import React, { useState } from "react";
import styled from "styled-components";
import {
  FlagRounded,
  CheckCircleRounded,
  EditRounded,
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
  background: ${({ theme }) => theme.card};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadow_lg};
  }

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const EditButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text_secondary};
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary}20;
    color: ${({ theme }) => theme.primary};
  }
`;

const GoalContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const GoalNumber = styled.div`
  font-size: 48px;
  font-weight: 800;
  color: ${({ theme }) => theme.primary};
  line-height: 1;

  @media (max-width: 600px) {
    font-size: 40px;
  }
`;

const GoalDivider = styled.div`
  font-size: 48px;
  font-weight: 300;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1;

  @media (max-width: 600px) {
    font-size: 40px;
  }
`;

const GoalTarget = styled.div`
  font-size: 48px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1;

  @media (max-width: 600px) {
    font-size: 40px;
  }
`;

const GoalLabel = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 600;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 12px;
  background: ${({ theme }) => theme.text_secondary}20;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 100%
  );
  border-radius: 12px;
  transition: width 0.5s ease;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const ProgressText = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
`;

const StatusMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-radius: 10px;
  background: ${({ theme, achieved }) =>
    achieved ? theme.green + 20 : theme.orange + 20};
  color: ${({ theme, achieved }) => (achieved ? theme.green : theme.orange)};
  font-size: 14px;
  font-weight: 600;
`;

const Input = styled.input`
  width: 80px;
  padding: 8px;
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 8px;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  background: ${({ theme }) => theme.card_light};
  color: ${({ theme }) => theme.text_primary};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  flex: 1;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &.save {
    background: ${({ theme }) => theme.primary};
    color: white;

    &:hover {
      background: ${({ theme }) => theme.button_hover};
    }
  }

  &.cancel {
    background: ${({ theme }) => theme.text_secondary}20;
    color: ${({ theme }) => theme.text_secondary};

    &:hover {
      background: ${({ theme }) => theme.text_secondary}30;
    }
  }
`;

const WeeklyGoalCard = ({ completedWorkouts = 0 }) => {
  const [goalTarget, setGoalTarget] = useState(5);
  const [editMode, setEditMode] = useState(false);
  const [tempTarget, setTempTarget] = useState(goalTarget);

  const progress = Math.min((completedWorkouts / goalTarget) * 100, 100);
  const isAchieved = completedWorkouts >= goalTarget;

  const handleSave = () => {
    if (tempTarget > 0 && tempTarget <= 30) {
      setGoalTarget(tempTarget);
      setEditMode(false);
    }
  };

  const handleCancel = () => {
    setTempTarget(goalTarget);
    setEditMode(false);
  };

  return (
    <Card>
      <Header>
        <Title>
          <FlagRounded /> Weekly Goal
        </Title>
        {!editMode && (
          <EditButton onClick={() => setEditMode(true)}>
            <EditRounded fontSize="small" />
          </EditButton>
        )}
      </Header>

      {editMode ? (
        <>
          <div>
            <GoalLabel style={{ marginBottom: "12px" }}>
              Set your weekly workout target:
            </GoalLabel>
            <Input
              type="number"
              min="1"
              max="30"
              value={tempTarget}
              onChange={(e) => setTempTarget(parseInt(e.target.value) || 1)}
              autoFocus
            />
          </div>
          <ButtonGroup>
            <Button className="save" onClick={handleSave}>
              Save Goal
            </Button>
            <Button className="cancel" onClick={handleCancel}>
              Cancel
            </Button>
          </ButtonGroup>
        </>
      ) : (
        <>
          <GoalContainer>
            <GoalNumber>{completedWorkouts}</GoalNumber>
            <GoalDivider>/</GoalDivider>
            <GoalTarget>{goalTarget}</GoalTarget>
          </GoalContainer>

          <GoalLabel>Workouts this week</GoalLabel>

          <ProgressBarContainer>
            <ProgressBar style={{ width: `${progress}%` }} />
          </ProgressBarContainer>

          <ProgressText>{Math.round(progress)}% Complete</ProgressText>

          {isAchieved ? (
            <StatusMessage achieved>
              <CheckCircleRounded />
              Goal achieved! You're crushing it! 🎉
            </StatusMessage>
          ) : (
            <StatusMessage>
              {goalTarget - completedWorkouts} more workout
              {goalTarget - completedWorkouts !== 1 ? "s" : ""} to reach your
              goal!
            </StatusMessage>
          )}
        </>
      )}
    </Card>
  );
};

export default WeeklyGoalCard;
