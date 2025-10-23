import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { addWorkout as apiAddWorkout } from "../api";
import { useNavigate } from "react-router-dom";
import { AddRounded } from "@mui/icons-material";

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 28px;
  border: 1px solid ${({ theme }) => theme.text_primary + 15};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: ${({ theme }) => theme.card};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow_lg};
  }

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

const Dropdown = styled.select`
  width: 100%;
  padding: 14px;
  border: 2px solid ${({ theme }) => theme.text_secondary + 30};
  border-radius: 10px;
  background: ${({ theme }) => theme.card_light};
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  font-weight: 500;
  outline: none;
  transition: all 0.3s ease;
  cursor: pointer;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.card};
  }

  &:hover {
    border-color: ${({ theme }) => theme.primary + 50};
  }
`;

const Row = styled.div`
  display: flex;
  gap: 12px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 6px;
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Message = styled.div`
  padding: 12px;
  border-radius: 10px;
  text-align: center;
  background: ${({ success, theme }) =>
    success ? theme.green + 20 : theme.red + 20};
  color: ${({ success, theme }) => (success ? theme.green : theme.red)};
  font-size: 14px;
  font-weight: 500;
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const AddWorkout = ({ addNewWorkout, buttonLoading }) => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({ message: "", success: false });

  const [category, setCategory] = useState("Cardio");
  const [workoutName, setWorkoutName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");

  const categories = [
    "Cardio",
    "Chest",
    "Back",
    "Legs",
    "Arms",
    "Shoulders",
    "Abs",
    "Core",
    "HIIT",
    "Flexibility",
    "Other",
  ];

  const handleAddWorkout = async () => {
    if (!workoutName.trim()) {
      setFeedback({ message: "Please enter workout name.", success: false });
      setTimeout(() => setFeedback({ message: "", success: false }), 2000);
      return;
    }

    const workoutString = `#${category}
-${workoutName}
-Sets: ${sets || 0}
-Reps: ${reps || 0}
-Weight: ${weight || 0}
-Duration: ${duration || 0}`;

    const payload = {
      category,
      workout: workoutString,
      date: new Date().toISOString(),
    };

    try {
      const res = await apiAddWorkout(payload);
      setFeedback({ message: "Workout added successfully! 💪", success: true });

      setWorkoutName("");
      setSets("");
      setReps("");
      setWeight("");
      setDuration("");

      if (typeof addNewWorkout === "function") {
        await addNewWorkout();
      }
    } catch (err) {
      console.error("Add workout error:", err?.response?.data || err);

      if (err.response?.status === 401) {
        setFeedback({
          message: "Session expired. Please sign in again.",
          success: false,
        });
        setTimeout(() => navigate("/signin"), 2000);
      } else {
        const msg = err?.response?.data?.message || "Failed to add workout.";
        setFeedback({ message: msg, success: false });
      }
    } finally {
      setTimeout(() => setFeedback({ message: "", success: false }), 3000);
    }
  };

  return (
    <Card>
      <Title>
        <AddRounded /> Add New Workout
      </Title>

      <div>
        <Label>Category</Label>
        <Dropdown
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Dropdown>
      </div>

      <TextInput
        label="Workout Name"
        placeholder="e.g., Bench Press, Running"
        value={workoutName}
        handleChange={(e) => setWorkoutName(e.target.value)}
      />

      <Row>
        <TextInput
          label="Sets"
          placeholder="3"
          value={sets}
          handleChange={(e) => setSets(e.target.value)}
        />
        <TextInput
          label="Reps"
          placeholder="10"
          value={reps}
          handleChange={(e) => setReps(e.target.value)}
        />
      </Row>

      <Row>
        <TextInput
          label="Weight (kg)"
          placeholder="50"
          value={weight}
          handleChange={(e) => setWeight(e.target.value)}
        />
        <TextInput
          label="Duration (min)"
          placeholder="30"
          value={duration}
          handleChange={(e) => setDuration(e.target.value)}
        />
      </Row>

      <Button
        text="Add Workout"
        leftIcon={<AddRounded />}
        onClick={handleAddWorkout}
        isLoading={buttonLoading}
        isDisabled={buttonLoading}
      />

      {feedback.message && (
        <Message success={feedback.success}>{feedback.message}</Message>
      )}
    </Card>
  );
};

export default AddWorkout;
