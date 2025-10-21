import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignUp } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducer/userSlice";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  background: ${({ theme }) => theme.card};
  padding: 40px 32px;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  @media (max-width: 600px) {
    padding: 28px 20px;
    gap: 28px;
  }
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
`;

const Span = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
  margin-top: 8px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!name || !email || !password) {
      alert("⚠️ Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateInputs()) return;

    setButtonLoading(true);
    setButtonDisabled(true);
    try {
      const res = await UserSignUp({ name, email, password });

      // Store token in Redux and localStorage
      dispatch(loginSuccess({ token: res.data.token, user: res.data.user }));
      localStorage.setItem("token", res.data.token);

      alert("Account Created Successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error("SignUp error:", err);
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setButtonLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <Container>
      <div>
        <Title>Create a New Account 👋</Title>
        <Span>Join FitTrack today and start your fitness journey</Span>
      </div>

      <Form>
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          handleChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          password
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
        />
        <Button
          text="Sign Up"
          onClick={handleSignUp}
          isLoading={buttonLoading}
          isDisabled={buttonDisabled}
        />
      </Form>
    </Container>
  );
};

export default SignUp;
