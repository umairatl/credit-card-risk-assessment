import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#005F7B",
      light: "#3385A0",
      dark: "#003D53",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#2e7d32", // Professional green
      light: "#4caf50",
      dark: "#1b5e20",
      contrastText: "#ffffff",
    },
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
    },
    warning: {
      main: "#ed6c02",
      light: "#ff9800",
      dark: "#e65100",
    },
    info: {
      main: "#005F7B",
      light: "#DAEEF2",
      dark: "#003D53",
    },
    success: {
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20",
    },
    background: {
      default: "#f5f7fa", // Light gray background
      paper: "#ffffff",
    },
    text: {
      primary: "#1a202c", // Dark gray for text
      secondary: "#64748b", // Medium gray
      disabled: "#94a3b8",
    },
    divider: "rgba(0, 0, 0, 0.08)",
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
  typography: {
    fontFamily:
      "'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
      color: "#1a202c",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
      color: "#1a202c",
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
      color: "#1a202c",
    },
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
      color: "#1a202c",
    },
    h5: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
      color: "#1a202c",
    },
    h6: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
      color: "#1a202c",
    },
    subtitle1: {
      fontWeight: 500,
      color: "#475569",
    },
    subtitle2: {
      fontWeight: 500,
      color: "#64748b",
    },
    body1: {
      color: "#334155",
    },
    body2: {
      color: "#475569",
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: "0.01em",
    },
    caption: {
      color: "#64748b",
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    ...Array(19).fill(
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    ),
  ] as any,
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        elevation1: {
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        },
        elevation2: {
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "10px 20px",
          boxShadow: "none",
          "&:hover": {
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          },
        },
        contained: {
          "&:hover": {
            transform: "translateY(-1px)",
            transition: "transform 0.2s",
          },
        },
        outlined: {
          borderWidth: "1.5px",
          "&:hover": {
            borderWidth: "1.5px",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid #e5e7eb",
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
        outlined: {
          borderWidth: "1.5px",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: "#f8fafc",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

// Export color palette for use in components
export const colors = {
  primary: {
    main: "#005F7B",
    light: "#DAEEF2",
    dark: "#003D53",
  },
  success: {
    main: "#2e7d32",
    light: "#e8f5e9",
    dark: "#1b5e20",
  },
  warning: {
    main: "#ed6c02",
    light: "#fff3e0",
    dark: "#e65100",
  },
  error: {
    main: "#d32f2f",
    light: "#ffebee",
    dark: "#c62828",
  },
  info: {
    main: "#0288d1",
    light: "#e1f5fe",
    dark: "#01579b",
  },
  grey: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
  },
};
