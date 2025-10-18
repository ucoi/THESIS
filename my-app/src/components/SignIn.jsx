import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignIn } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducer/userSlice";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.bgLight || "#f3f4f6"} 0%,
    ${({ theme }) => theme.bgDark || "#e5e7eb"} 100%
  );
`;

const Container = styled.div`
  width: 100%;
  max-width: 420px;
  background: ${({ theme }) => theme.card || "#fff"};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  }
`;

const Header = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary || "#111"};
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary || "#6b7280"};
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
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
    if (!validateInputs()) return;
    setLoading(true);
    try {
      const res = await UserSignIn({ email, password });
      dispatch(loginSuccess(res.data));
      alert("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>Welcome to FitTrack 👋</Title>
          <Subtitle>Log in to continue your fitness journey</Subtitle>
        </Header>

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignIn();
          }}
        >
          <TextInput
            label="Email Address"
            placeholder="Enter your email"
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
            text={loading ? "Signing In..." : "Sign In"}
            onClick={handleSignIn}
            isLoading={loading}
            isDisabled={loading}
            type="submit"
          />
        </Form>

        <p
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#6b7280",
            marginTop: "10px",
          }}
        >
          Don’t have an account?{" "}
          <span
            style={{
              color: "#2563eb",
              fontWeight: 600,
              cursor: "pointer",
            }}
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </Container>
    </Wrapper>
  );
};

export default SignIn;
