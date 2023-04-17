import { AppRouter } from "../router/router";
import { Form } from "./form/Form";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const App = () => {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
};
