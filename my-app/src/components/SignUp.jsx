import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignUp } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducer/userSlice";
import { useNavigate } from "react-router-dom";
import { PersonAddRounded } from "@mui/icons-material";

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

const SuccessMessage = styled.div`
  padding: 12px;
  border-radius: 10px;
  background: ${({ theme }) => theme.green}20;
  color: ${({ theme }) => theme.green};
  font-size: 13px;
  font-weight: 500;
  text-align: center;
`;

const PasswordStrength = styled.div`
  display: flex;
  gap: 4px;
  margin-top: -12px;
`;

const StrengthBar = styled.div`
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: ${({ active, theme, level }) =>
    active
      ? level === "weak"
        ? theme.red
        : level === "medium"
        ? theme.orange
        : theme.green
      : theme.text_secondary}30;
  transition: all 0.3s ease;
`;

const SignUp = ({ setLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const getPasswordStrength = (pass) => {
    if (pass.length < 6) return { level: "weak", bars: 1 };
    if (pass.length < 10) return { level: "medium", bars: 2 };
    return { level: "strong", bars: 3 };
  };

  const passwordStrength = getPasswordStrength(password);

  const validateInputs = () => {
    if (!name || !email || !password) {
      setErrorMessage("Please fill in all fields");
      return false;
    }

    if (name.length < 2) {
      setErrorMessage("Name must be at least 2 characters");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    setButtonDisabled(true);

    try {
      const res = await UserSignUp({ name, email, password });

      // Store token in localStorage
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // Dispatch to Redux
      dispatch(loginSuccess(res.data));

      setSuccessMessage("Account created successfully! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <Container>
      <div>
        <Title>Create Account</Title>
        <Subtitle>Join thousands of fitness enthusiasts today</Subtitle>
      </div>

      <Form onSubmit={handleSignUp}>
        <TextInput
          label="Full Name"
          placeholder="Enter your name"
          value={name}
          handleChange={(e) => setName(e.target.value)}
        />

        <TextInput
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />

        <div>
          <TextInput
            label="Password"
            placeholder="Create a password"
            password
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
          {password && (
            <PasswordStrength>
              <StrengthBar
                active={passwordStrength.bars >= 1}
                level={passwordStrength.level}
              />
              <StrengthBar
                active={passwordStrength.bars >= 2}
                level={passwordStrength.level}
              />
              <StrengthBar
                active={passwordStrength.bars >= 3}
                level={passwordStrength.level}
              />
            </PasswordStrength>
          )}
        </div>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

        <Button
          text="Create Account"
          leftIcon={<PersonAddRounded />}
          type="submit"
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </Form>

      <Divider>
        <span>OR</span>
      </Divider>

      <AccountText>
        Already have an account?{" "}
        <span onClick={() => setLogin(true)}>Sign In</span>
      </AccountText>
    </Container>
  );
};

export default SignUp;
