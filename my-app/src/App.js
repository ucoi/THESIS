import { ThemeProvider, styled } from "styled-components";
import { lightTheme, darkTheme } from "./utils/Themes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "./redux/reducer/userSlice";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Tutorials from "./pages/Tutorials";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Toast from "./components/Toast";
import React from "react";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

// Toast Context
export const ToastContext = React.createContext();

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  // Toast state
  const [toasts, setToasts] = useState([]);

  // Toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(!isDarkMode));
  };

  // Add toast
  const addToast = (type, title, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => removeToast(id), 3000);
  };

  // Remove toast
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Check for token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !currentUser) {
      dispatch(loginSuccess({ token }));
    }
  }, [currentUser, dispatch]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <ToastContext.Provider value={{ addToast }}>
        <BrowserRouter>
          {currentUser ? (
            <Container>
              <Navbar
                currentUser={currentUser}
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
              />
              <Routes>
                <Route path="/" exact element={<Dashboard />} />
                <Route path="/workouts" exact element={<Workouts />} />
                <Route path="/tutorials" exact element={<Tutorials />} />
                <Route path="/blogs" exact element={<Blogs />} />
                <Route path="/contact" exact element={<Contact />} />
              </Routes>
              <Toast toasts={toasts} removeToast={removeToast} />
            </Container>
          ) : (
            <Container>
              <Routes>
                <Route path="/" exact element={<Authentication />} />
                <Route path="/signin" exact element={<Authentication />} />
                <Route path="/signup" exact element={<Authentication />} />
              </Routes>
              <Toast toasts={toasts} removeToast={removeToast} />
            </Container>
          )}
        </BrowserRouter>
      </ToastContext.Provider>
    </ThemeProvider>
  );
}

export default App;
