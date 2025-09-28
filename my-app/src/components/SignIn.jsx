import React from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
`;
const Span = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const SignIn = () => {
  return (
    <Container>
      <div>
        <Title>Welcome to my fucking website</Title>
        <Span>Please login in here </Span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <TextInput
          label="Email Address"
          placeholder="Enter your fucking email address"
        />
        <TextInput label="Password" placeholder="Enter your fucking Password" />
        <Button text=" Sign In " />
      </div>
    </Container>
  );
};

export default SignIn;
