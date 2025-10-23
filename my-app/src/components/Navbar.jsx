import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FitnessCenterRounded,
  LogoutRounded,
  MenuRounded,
  CloseRounded,
  DarkModeRounded,
  LightModeRounded,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducer/userSlice";

const NavbarContainer = styled.div`
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
  z-index: 100;
  backdrop-filter: blur(10px);
  background: ${({ theme }) => theme.card}f0;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const MobileMenuIcon = styled.div`
  display: none;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  padding: 8px;

  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.card};
  padding: 20px;
  box-shadow: ${({ theme }) => theme.shadow_lg};
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 99;
  animation: slideDown 0.3s ease;

  @keyframes slideDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (min-width: 1025px) {
    display: none;
  }
`;

const StyledNavLink = styled(NavLink)`
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

  @media (max-width: 1024px) {
    padding: 12px 16px;
    font-size: 16px;
  }
`;

const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ThemeToggle = styled.button`
  background: ${({ theme }) => theme.primary}20;
  border: none;
  border-radius: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: rotate(180deg);
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 16px;
`;

const UserName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;

  @media (max-width: 900px) {
    display: none;
  }
`;

const LogoutButton = styled.button`
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

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 0;
    gap: 0;
  }
`;

const Navbar = ({ currentUser, isDarkMode, toggleTheme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.split(" ");
    if (names.length >= 2) {
      return names[0][0] + names[1][0];
    }
    return name[0];
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <NavbarContainer>
        <NavbarLeft>
          <Logo onClick={() => navigate("/")}>
            <FitnessCenterRounded style={{ fontSize: "28px" }} />
            FitTrack
          </Logo>

          <NavLinks>
            <StyledNavLink to="/" end>
              Dashboard
            </StyledNavLink>
            <StyledNavLink to="/workouts">Workouts</StyledNavLink>
            <StyledNavLink to="/tutorials">Tutorials</StyledNavLink>
            <StyledNavLink to="/blogs">Blogs</StyledNavLink>
            <StyledNavLink to="/contact">Contact</StyledNavLink>
          </NavLinks>
        </NavbarLeft>

        <NavbarRight>
          <ThemeToggle
            onClick={toggleTheme}
            title={isDarkMode ? "Light Mode" : "Dark Mode"}
          >
            {isDarkMode ? <LightModeRounded /> : <DarkModeRounded />}
          </ThemeToggle>

          <UserContainer>
            <Avatar>
              {getInitials(currentUser?.user?.name || currentUser?.name)}
            </Avatar>
            <UserName>
              {currentUser?.user?.name || currentUser?.name || "User"}
            </UserName>
          </UserContainer>

          <LogoutButton onClick={handleLogout}>
            <LogoutRounded style={{ fontSize: "18px" }} />
            <span>Logout</span>
          </LogoutButton>

          <MobileMenuIcon onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <CloseRounded sx={{ fontSize: "28px" }} />
            ) : (
              <MenuRounded sx={{ fontSize: "28px" }} />
            )}
          </MobileMenuIcon>
        </NavbarRight>
      </NavbarContainer>

      {mobileMenuOpen && (
        <MobileMenu>
          <StyledNavLink to="/" end onClick={closeMobileMenu}>
            Dashboard
          </StyledNavLink>
          <StyledNavLink to="/workouts" onClick={closeMobileMenu}>
            Workouts
          </StyledNavLink>
          <StyledNavLink to="/tutorials" onClick={closeMobileMenu}>
            Tutorials
          </StyledNavLink>
          <StyledNavLink to="/blogs" onClick={closeMobileMenu}>
            Blogs
          </StyledNavLink>
          <StyledNavLink to="/contact" onClick={closeMobileMenu}>
            Contact
          </StyledNavLink>
        </MobileMenu>
      )}
    </>
  );
};

export default Navbar;
