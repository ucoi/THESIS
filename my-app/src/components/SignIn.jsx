import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignIn } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducer/userSlice";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  margin: 0 auto;
  padding: 60px 20px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
`;

const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

const BottomText = styled.p`
  font-size: 14px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary + 90};
  margin-top: 10px;

  span {
    color: #2563eb;
    font-weight: 600;
    cursor: pointer;
  }
`;

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    setButtonLoading(true);
    setButtonDisabled(true);
    try {
      const res = await UserSignIn({ email, password });

      // Store token in Redux and localStorage
      dispatch(loginSuccess({ token: res.data.token, user: res.data.user }));
      localStorage.setItem("token", res.data.token);

      alert("SignIn Successful");
      navigate("/dashboard");
    } catch (err) {
      console.error("SignIn error:", err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setButtonDisabled(false);
      setButtonLoading(false);
    }
  };

  return (
    <Container>
      <div>
        <Title>Welcome to FitTrack 👋</Title>
        <Span>Please login with your details here</Span>
      </div>

      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
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
          text={buttonLoading ? "Signing in..." : "Sign In"}
          onClick={handleSignIn}
          isLoading={buttonLoading}
          isDisabled={buttonDisabled}
        />
      </div>
    </Container>
  );
};

export default SignIn;
