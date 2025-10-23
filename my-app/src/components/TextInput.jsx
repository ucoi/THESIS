import React, { useState } from "react";
import styled from "styled-components";
import { Visibility, VisibilityOff, CloseRounded } from "@mui/icons-material";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const OutlinedInput = styled.div`
  width: 100%;
  border-radius: 10px;
  border: 2px solid
    ${({ theme, error }) => (error ? theme.red : theme.text_secondary + 30)};
  background-color: ${({ theme }) => theme.card_light};
  color: ${({ theme }) => theme.text_primary};
  outline: none;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;

  &:focus-within {
    border-color: ${({ theme, error }) => (error ? theme.red : theme.primary)};
    background: ${({ theme }) => theme.card};
  }

  &:hover {
    border-color: ${({ theme, error }) =>
      error ? theme.red : theme.primary + 50};
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  background-color: transparent;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary + 80};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  background-color: transparent;
  outline: none;
  resize: vertical;
  font-family: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary + 80};
  }
`;

const Error = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.red};
  font-weight: 500;
  margin-top: 2px;
`;

const ChipWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
`;

const Chip = styled.div`
  background: ${({ theme }) => theme.primary + 20};
  color: ${({ theme }) => theme.primary};
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    cursor: pointer;
    font-size: 16px;
    transition: all 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.red};
    }
  }
`;

const TextInput = ({
  label,
  placeholder,
  name,
  value,
  error,
  handleChange,
  handelChange,
  onChange,
  textArea,
  rows,
  chipableInput,
  chipableArray = [],
  removeChip,
  password,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const changeHandler = handleChange || handelChange || onChange || (() => {});

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <OutlinedInput error={error}>
        {chipableInput ? (
          <ChipWrapper>
            {chipableArray.map((chip, index) => (
              <Chip key={index}>
                <span>{chip}</span>
                <CloseRounded onClick={() => removeChip(name, index)} />
              </Chip>
            ))}
            <Input
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={(e) => changeHandler(e)}
            />
          </ChipWrapper>
        ) : (
          <>
            {textArea ? (
              <Textarea
                name={name}
                rows={rows || 4}
                placeholder={placeholder}
                value={value}
                onChange={(e) => changeHandler(e)}
              />
            ) : (
              <Input
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={(e) => changeHandler(e)}
                type={password && !showPassword ? "password" : "text"}
              />
            )}
            {password && (
              <>
                {showPassword ? (
                  <Visibility
                    onClick={() => setShowPassword(false)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <VisibilityOff
                    onClick={() => setShowPassword(true)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </>
            )}
          </>
        )}
      </OutlinedInput>
      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default TextInput;
