import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Link as LinkR, NavLink } from "react-router-dom";
import LogoImage from "../utils/Images/Logo.png";
import { MenuRounded } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";

const Nav = styled.nav`
  background: #d3d3d3; /* Darker grey background */
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 20};
`;
const NavContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 32px; /* Increased padding */
  display: flex;
  gap: 24px; /* Increased gap */
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;
const NavLogo = styled(LinkR)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 6px;
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme }) => theme.black};
`;
const Logo = styled.img`
  width: 40px;
  height: 40px;
`;
const Mobileicon = styled.div`
  color: ${({ theme }) => theme.text_primary};

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;
const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none; /* Hide on smaller screens */
  }
`;
const Navlink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.accent || "#007BFF"}; /* Accent color */
    transform: scale(1.1); /* Slight zoom effect */
  }
  &.active {
    color: ${({ theme }) => theme.accent || "#007BFF"};
    border-bottom: 2px solid ${({ theme }) => theme.accent || "#007BFF"};
  }
`;
const UserContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  align-items: center;
  padding: 0 6px;
  color: ${({ theme }) => theme.primary};
`;
const TextButton = styled.button`
  background: ${({ theme }) => theme.accent || "#007BFF"}; /* Accent color */
  color: white;
  border: none;
  border-radius: 4px; /* Rounded corners */
  padding: 8px 16px; /* Add padding */
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) =>
      theme.accentHover || "#0056b3"}; /* Darker hover color */
    transform: scale(1.05); /* Slight zoom effect */
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 4px ${({ theme }) => theme.accent || "#007BFF"}; /* Focus effect */
  }
`;

const MobileMenu = styled.ul`
  flex-direction: column;
  align-items: start;
  gap: 16px;
  padding: 12px 40px 24px 40px;
  list-style: none;
  width: 90%;
  background: ${({ theme }) => theme.bg};
  position: absolute;
  top: 80px;
  right: 0;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-20px)"};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
  transition: transform 0.3s ease, opacity 0.3s ease;
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Nav>
      <NavContainer>
        <Mobileicon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded sx={{ color: "inherit", fontSize: "32px" }} />
        </Mobileicon>
        <NavLogo to="/">
          <Logo src={LogoImage} />
          Fittracker
        </NavLogo>

        <MobileMenu isOpen={isOpen}>
          <Navlink to="/dashboard">Dashboard</Navlink>
          <Navlink to="/Workouts">Workouts</Navlink>
          <Navlink to="/tutorials">tutorials</Navlink>
          <Navlink to="/blogs">blogs</Navlink>
          <Navlink to="/contact">contact</Navlink>
        </MobileMenu>
        <NavItems>
          <Navlink to="/dashboard">Dashboard</Navlink>
          <Navlink to="/Workouts">Workouts</Navlink>
          <Navlink to="/tutorials">tutorials</Navlink>
          <Navlink to="/blogs">blogs</Navlink>
          <Navlink to="/contact">contact</Navlink>
        </NavItems>
        <UserContainer>
          <Avatar />
          <TextButton>Logout</TextButton>
        </UserContainer>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
