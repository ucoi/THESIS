import React, { useState } from "react";
import styled from "styled-components";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { FitnessCenterRounded } from "@mui/icons-material";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary}20 0%,
    ${({ theme }) => theme.secondary}20 100%
  );
  overflow: hidden;
  position: relative;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  position: relative;
  background: ${({ theme }) => theme.card};

  @media (max-width: 700px) {
    padding: 30px 20px;
    min-height: 300px;
  }
`;

const Right = styled.div`
  flex: 1.2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;

  @media (max-width: 700px) {
    padding: 30px 20px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 20px;

  @media (max-width: 700px) {
    font-size: 28px;
  }
`;

const BrandTitle = styled.h1`
  font-size: 48px;
  font-weight: 800;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
  line-height: 1.2;

  @media (max-width: 700px) {
    font-size: 36px;
  }
`;

const BrandSubtitle = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  max-width: 400px;
  line-height: 1.6;
  margin-bottom: 40px;

  @media (max-width: 700px) {
    font-size: 16px;
  }
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: ${({ theme }) => theme.primary}10;
  border-radius: 12px;
  border-left: 4px solid ${({ theme }) => theme.primary};
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  flex-shrink: 0;
`;

const FeatureText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FeatureTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const FeatureDesc = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
`;

const DecorCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary}15;

  &.circle1 {
    width: 300px;
    height: 300px;
    top: -100px;
    right: -100px;
  }

  &.circle2 {
    width: 200px;
    height: 200px;
    bottom: -50px;
    left: -50px;
  }
`;

const Authentication = () => {
  const [login, setLogin] = useState(true);

  return (
    <Container>
      <Left>
        <DecorCircle className="circle1" />
        <DecorCircle className="circle2" />

        <Logo>
          <FitnessCenterRounded style={{ fontSize: "40px" }} />
          FitTrack
        </Logo>

        <BrandTitle>
          Your Fitness
          <br /> Journey Starts Here
        </BrandTitle>

        <BrandSubtitle>
          Track workouts, monitor progress, and achieve your fitness goals with
          our comprehensive platform.
        </BrandSubtitle>

        <FeatureList>
          <Feature>
            <FeatureIcon>📊</FeatureIcon>
            <FeatureText>
              <FeatureTitle>Track Progress</FeatureTitle>
              <FeatureDesc>
                Monitor your workouts and see your improvements
              </FeatureDesc>
            </FeatureText>
          </Feature>

          <Feature>
            <FeatureIcon>💪</FeatureIcon>
            <FeatureText>
              <FeatureTitle>Custom Workouts</FeatureTitle>
              <FeatureDesc>
                Create and manage personalized workout plans
              </FeatureDesc>
            </FeatureText>
          </Feature>

          <Feature>
            <FeatureIcon>🎯</FeatureIcon>
            <FeatureText>
              <FeatureTitle>Set Goals</FeatureTitle>
              <FeatureDesc>
                Define targets and track your achievements
              </FeatureDesc>
            </FeatureText>
          </Feature>
        </FeatureList>
      </Left>

      <Right>
        {login ? (
          <SignIn setLogin={setLogin} />
        ) : (
          <SignUp setLogin={setLogin} />
        )}
      </Right>
    </Container>
  );
};

export default Authentication;
