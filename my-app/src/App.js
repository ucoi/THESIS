import styled, { ThemeProvider } from "styled-components";
import { lightTheme } from "./utils/Themes";
import { BrowserRouter } from "react-router-dom";

const Container = styled.div`
  width: 100;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${(theme) => theme.bg};
  color: ${(theme) => theme.text_primary};
  overflow-x: hidden;
`;

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Container>hello</Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
