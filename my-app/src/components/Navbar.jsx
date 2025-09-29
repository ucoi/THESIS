import React from "react";
import styled from "styled-components";
import { Link as LinkR, NavLink } from "react-router-dom";
import LogoImage from "../utils/Images/Logo.png";
import { MenuRounded } from "@mui/icons-material";

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.bg};
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

const Navbar = () => {
  return (
    <Nav>
      <NavContainer>
        <Mobileicon>
          <MenuRounded sx={{ color: "inherit", fontSize: "32px" }} />
        </Mobileicon>
        <NavLogo to="/">
          <Logo src={LogoImage} />
          Fittracker
        </NavLogo>
        <NavItems>
          <Navlink to="/dashboard">Dashboard</Navlink>
          <Navlink to="/Workouts">Workouts</Navlink>
          <Navlink to="/tutorials">tutorials</Navlink>
          <Navlink to="/blogs">blogs</Navlink>
          <Navlink to="/contact">contact</Navlink>
        </NavItems>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
