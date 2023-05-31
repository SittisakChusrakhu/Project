import "../styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { AppProps } from "next/app";

const THEME = createTheme({
  typography: {
    fontFamily: "Kanit",
  },
  palette: {
    primary: {
      light: "#368980",
      main: "#368980",
      dark: "#368980",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#FF2828",
      dark: "#ffebee",
      contrastText: "#000",
    },
    info: {
      light: "#FFEBEE",
      main: "#FFFFFF",
      dark: "#ffebee",
      contrastText: "#000",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={THEME}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}