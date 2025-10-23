import React from "react";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";

const StyledButton = styled.button`
  border-radius: 12px;
  color: ${({ theme }) => theme.white};
  font-size: ${({ small }) => (small ? "14px" : "16px")};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${({ small }) => (small ? "10px 20px" : "14px 28px")};
  border: none;
  background: ${({ theme, outlined }) =>
    outlined
      ? "transparent"
      : `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`};
  box-shadow: ${({ theme, outlined }) => (outlined ? "none" : theme.shadow)};
  border: ${({ theme, outlined }) =>
    outlined ? `2px solid ${theme.primary}` : "none"};
  color: ${({ theme, outlined }) => (outlined ? theme.primary : theme.white)};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow_lg};
    background: ${({ theme, outlined }) =>
      outlined
        ? theme.primary + "10"
        : `linear-gradient(135deg, ${theme.button_hover} 0%, ${theme.primary} 100%)`};
  }

  &:active {
    transform: translateY(0px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Button = ({
  text,
  isLoading,
  isDisabled,
  leftIcon,
  rightIcon,
  outlined,
  small,
  onClick,
  type,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={isDisabled || isLoading}
      outlined={outlined}
      small={small}
      type={type}
    >
      {isLoading ? (
        <CircularProgress size={small ? 18 : 22} style={{ color: "inherit" }} />
      ) : (
        <>
          {leftIcon}
          {text}
          {rightIcon}
        </>
      )}
    </StyledButton>
  );
};

export default Button;
