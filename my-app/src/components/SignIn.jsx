import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignIn } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducer/userSlice";
import { useNavigate } from "react-router-dom";
import { LoginRounded } from "@mui/icons-material";

const Container = styled.div`
  width: 100%;
  max-width: 450px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadow_lg};

  @media (max-width: 700px) {
    padding: 30px 24px;
    gap: 24px;
  }
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};

  @media (max-width: 700px) {
    font-size: 28px;
  }
`;

const Subtitle = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: -16px;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ForgotPassword = styled.div`
  text-align: right;
  font-size: 13px;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  cursor: pointer;
  margin-top: -8px;

  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 8px 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.text_secondary}30;
  }

  span {
    font-size: 13px;
    color: ${({ theme }) => theme.text_secondary};
    font-weight: 500;
  }
`;

const AccountText = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;

  span {
    color: ${({ theme }) => theme.primary};
    font-weight: 700;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  padding: 12px;
  border-radius: 10px;
  background: ${({ theme }) => theme.red}20;
  color: ${({ theme }) => theme.red};
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  animation: shake 0.3s ease;

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-10px);
    }
    75% {
      transform: translateX(10px);
    }
  }
`;

const SignIn = ({ setLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateInputs = () => {
    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    setButtonDisabled(true);

    try {
      const res = await UserSignIn({ email, password });

      // Store token in localStorage
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // Dispatch to Redux
      dispatch(loginSuccess(res.data));

      // Navigate to dashboard
      navigate("/");
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <Container>
      <div>
        <Title>Welcome Back!</Title>
        <Subtitle>Sign in to continue your fitness journey</Subtitle>
      </div>

      <Form onSubmit={handleSignIn}>
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

        <ForgotPassword>Forgot password?</ForgotPassword>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <Button
          text="Sign In"
          leftIcon={<LoginRounded />}
          type="submit"
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </Form>

      <Divider>
        <span>OR</span>
      </Divider>

      <AccountText>
        Don't have an account?{" "}
        <span onClick={() => setLogin(false)}>Sign Up</span>
      </AccountText>
    </Container>
  );
};

export default SignIn;
