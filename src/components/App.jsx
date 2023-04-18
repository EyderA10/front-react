import { AppRouter } from "../router/router";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const App = () => {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
};
