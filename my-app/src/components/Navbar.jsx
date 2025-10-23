import React from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { FitnessCenterRounded, LogoutRounded } from "@mui/icons-material";
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
  z-index: 10;
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

  @media (max-width: 768px) {
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
`;

const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
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

  @media (max-width: 768px) {
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
`;

const Navbar = ({ currentUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
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
          Logout
        </LogoutButton>
      </NavbarRight>
    </NavbarContainer>
  );
};

export default Navbar;
