import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  max-width: 500px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + "20"};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + "15"};
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: ${({ theme }) => theme.card_light};
  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const CategorySelect = styled.select`
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.text_secondary + "40"};
  margin-bottom: 12px;
  background: white;
  cursor: pointer;
`;

const Feedback = styled.div`
  font-size: 14px;
  color: ${({ success, theme }) => (success ? theme.green : theme.red)};
  margin-top: 8px;
`;

const AddWorkout = ({ workout, setWorkout, addNewWorkout, buttonLoading }) => {
  const [category, setCategory] = useState("Abs");
  const [feedback, setFeedback] = useState("");

  const handleAddWorkout = () => {
    if (!workout.trim()) {
      setFeedback("Please enter workout details.");
      return;
    }
    addNewWorkout({ category, workout });
    setWorkout("");
    setFeedback("Workout added successfully!");
    setTimeout(() => setFeedback(""), 3000); // Clear message after 3s
  };

  return (
    <Card>
      <Title>Add New Workout</Title>

      <CategorySelect
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Abs">Abs</option>
        <option value="Shoulders">Shoulders</option>
        <option value="Legs">Legs</option>
        <option value="Back">Back</option>
        <option value="Chest">Chest</option>
        <option value="Arms">Arms</option>
      </CategorySelect>

      <TextInput
        label="Workout Details"
        textArea
        rows={6}
        placeholder={`Enter workout in this format:
- Workout Name
- Sets
- Reps
- Weight
- Duration`}
        value={workout}
        handelChange={(e) => setWorkout(e.target.value)}
      />

      <Button
        text="Add Workout"
        small
        onClick={handleAddWorkout}
        isLoading={buttonLoading}
        isDisabled={buttonLoading}
      />

      {feedback && <Feedback success={feedback.includes("successfully")}>{feedback}</Feedback>}
    </Card>
  );
};

export default AddWorkout;
