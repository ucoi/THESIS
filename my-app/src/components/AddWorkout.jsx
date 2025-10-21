import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { addWorkout as apiAddWorkout } from "../api/index.js";
import TextInput from "./TextInput";
import Button from "./Button";
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
  gap: 6px;
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

const AddWorkout = ({ workout, setWorkout, addNewWorkout, buttonLoading }) => {
  const [feedback, setFeedback] = useState("");

  const token =
    useSelector((s) => s.user?.token || s.user?.currentUser?.token) ||
    localStorage.getItem("token");

  const navigate = useNavigate();

  const handleAddWorkout = async () => {
    if (!(workout || "").trim()) {
      setFeedback("Please enter workout details.");
      setTimeout(() => setFeedback(""), 2000);
      return;
    }

    const payload = {
      category: "general",
      workout,
      date: new Date().toISOString(),
    };

    console.log("Sending payload:", payload);

    setFeedback("");
    try {
      const res = await apiAddWorkout(payload);
      setFeedback("Workout added successfully!");
      setWorkout(""); // clear input

      // 👇 THIS IS KEY - call parent callback to refresh data
      if (typeof addNewWorkout === "function") {
        await addNewWorkout(); // 👈 Make sure to await it
      }
    } catch (err) {
      console.error("Add workout error:", err?.response?.data || err);
      console.error("Full error response:", err?.response);

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
      <TextInput
        label="Workout"
        textArea
        rows={10}
        placeholder={`Enter in this format:

#Category
-Workout Name
-Sets
-Reps
-Weight
-Duration`}
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
      {feedback && <div style={{ marginTop: 8, fontSize: 14 }}>{feedback}</div>}
    </Card>
  );
};

export default AddWorkout;
