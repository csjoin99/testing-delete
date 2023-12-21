"use client";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: "#F9F9F9",
    },
    text: {
      primary: "#222741",
    },
  },
  typography: {
    h1: { fontFamily: "Poppins", fontSize: "24px" },
    h2: { fontFamily: "Poppins", fontSize: "20px" },
    h3: { fontFamily: "Poppins", fontSize: "1rem" },
    h4: { fontFamily: "Poppins", fontSize: "14px" },
    body1: { fontFamily: "Noto" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Poppins';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: url('/fonts/poppins/Poppins-Regular.otf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        };
        @font-face {
          font-family: 'Noto';
          font-style: normal;
          font-display: swap;
          font-weight: 600;
          src: url('/fonts/noto-sans/NotoSans-Regular.ttf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        };
      `,
    },
  },
});

export { theme };

declare module "@mui/material/styles" {
  interface Theme {
  
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
   
  }
}
