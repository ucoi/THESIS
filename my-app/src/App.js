import { ThemeProvider, styled } from "styled-components";
import { lightTheme } from "./utils/Themes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "./redux/reducer/userSlice";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Tutorials from "./pages/Tutorials";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";

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

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Check for token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !currentUser) {
      // Restore user session from token
      dispatch(loginSuccess({ token }));
    }
  }, [currentUser, dispatch]);

  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        {currentUser ? (
          <Container>
            <Navbar currentUser={currentUser} />
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/workouts" exact element={<Workouts />} />
              <Route path="/tutorials" exact element={<Tutorials />} />
              <Route path="/blogs" exact element={<Blogs />} />
              <Route path="/contact" exact element={<Contact />} />
            </Routes>
          </Container>
        ) : (
          <Container>
            <Routes>
              <Route path="/" exact element={<Authentication />} />
              <Route path="/signin" exact element={<Authentication />} />
              <Route path="/signup" exact element={<Authentication />} />
            </Routes>
          </Container>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
