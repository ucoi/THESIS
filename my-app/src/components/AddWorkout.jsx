import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { addWorkout as apiAddWorkout } from "../api";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const Dropdown = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  border-radius: 8px;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Row = styled.div`
  display: flex;
  gap: 12px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const AddWorkout = ({ addNewWorkout, buttonLoading }) => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");

  // Form fields
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
      setFeedback("Please enter workout name.");
      setTimeout(() => setFeedback(""), 2000);
      return;
    }

    // Build the workout string in the expected format
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

    console.log("Sending payload:", payload);

    setFeedback("");
    try {
      const res = await apiAddWorkout(payload);
      setFeedback("Workout added successfully!");

      // Clear form
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
        setFeedback("Session expired. Please sign in again.");
        setTimeout(() => navigate("/signin"), 2000);
      } else {
        const msg = err?.response?.data?.message || "Failed to add workout.";
        setFeedback(msg);
      }
    } finally {
      setTimeout(() => setFeedback(""), 3000);
    }
  };

  return (
    <Card>
      <Title>Add New Workout</Title>

      <div>
        <label
          style={{
            fontSize: 14,
            marginBottom: 4,
            display: "block",
          }}
        >
          Category
        </label>
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
        placeholder="e.g., Bench Press, Running, Squats"
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
          label="Weight (lbs)"
          placeholder="135"
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
        small
        onClick={handleAddWorkout}
        isLoading={buttonLoading}
        isDisabled={buttonLoading}
      />

      {feedback && (
        <div
          style={{
            marginTop: 8,
            fontSize: 14,
            textAlign: "center",
          }}
        >
          {feedback}
        </div>
      )}
    </Card>
  );
};

export default AddWorkout;
