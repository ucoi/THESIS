import React, { useEffect } from "react";
import styled from "styled-components";
import {
  CheckCircleRounded,
  ErrorRounded,
  InfoRounded,
  WarningRounded,
  CloseRounded,
} from "@mui/icons-material";

const ToastContainer = styled.div`
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;

  @media (max-width: 600px) {
    right: 12px;
    left: 12px;
    max-width: none;
  }
`;

const ToastItem = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: ${({ theme }) => theme.shadow_lg};
  display: flex;
  align-items: center;
  gap: 12px;
  border-left: 4px solid
    ${({ theme, type }) =>
      type === "success"
        ? theme.green
        : type === "error"
        ? theme.red
        : type === "warning"
        ? theme.orange
        : theme.primary};
  animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
  backdrop-filter: blur(10px);

  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: translateX(400px);
    }
  }
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${({ theme, type }) =>
    type === "success"
      ? theme.green + 20
      : type === "error"
      ? theme.red + 20
      : type === "warning"
      ? theme.orange + 20
      : theme.primary + 20};
  color: ${({ theme, type }) =>
    type === "success"
      ? theme.green
      : type === "error"
      ? theme.red
      : type === "warning"
      ? theme.orange
      : theme.primary};
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const Message = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text_secondary};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.text_secondary}20;
    color: ${({ theme }) => theme.text_primary};
  }
`;

const Toast = ({ toasts, removeToast }) => {
  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircleRounded />;
      case "error":
        return <ErrorRounded />;
      case "warning":
        return <WarningRounded />;
      default:
        return <InfoRounded />;
    }
  };

  return (
    <ToastContainer>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} type={toast.type}>
          <IconWrapper type={toast.type}>{getIcon(toast.type)}</IconWrapper>
          <Content>
            <Title>{toast.title}</Title>
            {toast.message && <Message>{toast.message}</Message>}
          </Content>
          <CloseButton onClick={() => removeToast(toast.id)}>
            <CloseRounded sx={{ fontSize: "18px" }} />
          </CloseButton>
        </ToastItem>
      ))}
    </ToastContainer>
  );
};

export default Toast;
