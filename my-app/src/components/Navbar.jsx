import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Link as LinkR, NavLink } from "react-router-dom";
import LogoImage from "../utils/Images/Logo.png";
import { MenuRounded } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducer/userSlice";
import { useNavigate } from "react-router-dom";

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
  height: 70px;
  background: ${({ theme }) => theme.card};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  box-shadow: ${({ theme }) => theme.shadow};
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(10px);
  background: ${({ theme }) => theme.card}f0;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
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
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 8px;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary + 10};
  }

  &.active {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary + 20};
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
  padding: 10px 20px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 100%
  );
  color: ${({ theme }) => theme.white};
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) => theme.shadow};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow_lg};
  }

  &:active {
    transform: translateY(0);
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

const Navbar = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <Nav>
      <NavContainer>
        <Mobileicon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded sx={{ color: "inherit", fontSize: "32px" }} />
        </Mobileicon>
        <NavLogo to="/">
          <Logo src={LogoImage} />
          FT
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
          <Avatar src={currentUser?.img}>{currentUser?.name[0]}</Avatar>
          <TextButton onClick={handleLogout}>Logout</TextButton>
        </UserContainer>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
