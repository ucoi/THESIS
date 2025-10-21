import React, { useState } from "react";
import styled from "styled-components";
import {
  FitnessCenterRounded,
  TimelapseRounded,
  DeleteRounded,
} from "@mui/icons-material";
import { deleteWorkout } from "../../api";
import { CircularProgress, IconButton } from "@mui/material";

const Card = styled.div`
  flex: 1;
  min-width: 250px;
  max-width: 400px;
  padding: 16px 18px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  @media (max-width: 600px) {
    padding: 12px 14px;
  }
`;

const Category = styled.div`
  width: fit-content;
  font-size: 14px;
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  background: ${({ theme }) => theme.primary + 20};
  padding: 4px 8px;
  border-radius: 8px;
`;

const Name = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
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
  gap: 16px;
`;

const Details = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const DeleteButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
  color: ${({ theme }) => theme.text_secondary};
  &:hover {
    color: ${({ theme }) => theme.red};
    background: ${({ theme }) => theme.red + 20};
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
      <DeleteButton onClick={handleDelete} disabled={deleting} size="small">
        {deleting ? <CircularProgress size={20} /> : <DeleteRounded />}
      </DeleteButton>

      <Category>#{workout?.category}</Category>
      <Name>{workout?.workoutName}</Name>
      <Sets>
        {workout?.sets} sets X {workout?.reps} reps
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
