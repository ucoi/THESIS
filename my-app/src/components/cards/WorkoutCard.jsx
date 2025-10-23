import React, { useState } from "react";
import styled from "styled-components";
import {
  FitnessCenterRounded,
  TimelapseRounded,
  DeleteRounded,
} from "@mui/icons-material";
import { deleteWorkout } from "../../api";
import { CircularProgress } from "@mui/material";

const Card = styled.div`
  flex: 1;
  min-width: 250px;
  max-width: 400px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.text_primary + 15};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  background: ${({ theme }) => theme.card};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadow_lg};
  }

  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const Category = styled.div`
  width: fit-content;
  font-size: 13px;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  background: ${({ theme }) => theme.primary + 20};
  padding: 6px 12px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Name = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 700;
  margin-top: 4px;
`;

const Sets = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 500;
  display: flex;
  gap: 6px;
`;

const Flex = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 8px;
`;

const Details = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.card_light};
  padding: 8px 12px;
  border-radius: 8px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: ${({ theme }) => theme.red + 20};
  color: ${({ theme }) => theme.red};
  border: none;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  opacity: 0;

  ${Card}:hover & {
    opacity: 1;
  }

  &:hover {
    background: ${({ theme }) => theme.red};
    color: ${({ theme }) => theme.white};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const WorkoutCard = ({ workout, onDelete }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${workout.workoutName}"?`)) {
      return;
    }

    setDeleting(true);
    try {
      await deleteWorkout(workout._id);

      // Call parent callback to refresh list
      if (typeof onDelete === "function") {
        await onDelete();
      }
    } catch (err) {
      console.error("Delete workout error:", err);
      alert(err?.response?.data?.message || "Failed to delete workout");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card>
      <DeleteButton onClick={handleDelete} disabled={deleting}>
        {deleting ? (
          <CircularProgress size={20} style={{ color: "inherit" }} />
        ) : (
          <DeleteRounded fontSize="small" />
        )}
      </DeleteButton>

      <Category>#{workout?.category}</Category>
      <Name>{workout?.workoutName}</Name>
      <Sets>
        {workout?.sets} sets × {workout?.reps} reps
      </Sets>
      <Flex>
        <Details>
          <FitnessCenterRounded sx={{ fontSize: "20px" }} />
          {workout?.weight} kg
        </Details>
        <Details>
          <TimelapseRounded sx={{ fontSize: "20px" }} />
          {workout?.duration} min
        </Details>
      </Flex>
    </Card>
  );
};

export default WorkoutCard;
