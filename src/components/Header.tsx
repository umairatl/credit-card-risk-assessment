import {
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  Menu as MenuIcon,
  Security as SecurityIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Chip,
  Container,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import ArticleIcon from "@mui/icons-material/Article";
import { Link } from "react-router-dom";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showLiveStatus?: boolean;
  showNotifications?: boolean;
}

function Header({
  title = "Risk Operations Dashboard",
  subtitle = "Credit Card Monitoring & Account Management",
  showLiveStatus = true,
  showNotifications = true,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "#DAEEF2",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 20px rgba(25, 118, 210, 0.3)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              py: { xs: 1.5, sm: 2 },
              px: { xs: 0, sm: 0 },
              minHeight: { xs: 64, sm: 72 },
            }}
          >
            {/* Menu Button — visible on all screen sizes */}
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={() => setMobileMenuOpen(true)}
              sx={{
                mr: 2,
                color: "#005F7B",
                background: "rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo and Title Section */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={{ xs: 1.5, sm: 2 }}
              sx={{ flex: 1 }}
            >
              {/* Title and Subtitle */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  sx={{
                    fontWeight: 800,
                    color: "#005F7B",
                    letterSpacing: "-0.02em",
                    fontSize: { xs: "1.1rem", sm: "1.5rem" },
                    textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#4caf50",
                    display: "block",
                    fontSize: "0.85rem",
                    mt: 0.3,
                    fontWeight: 500,
                  }}
                >
                  {subtitle}
                </Typography>
              </Box>

              {/* Right Side Actions */}
              {!isMobile && (
                <Stack direction="row" spacing={2} alignItems="center">
                  {/* Live Status Chip */}
                  {showLiveStatus && (
                    <Chip
                      icon={
                        <TrendingUpIcon
                          sx={{
                            color: "#4caf50 !important",
                            animation: "pulse 2s infinite",
                          }}
                        />
                      }
                      label="Live Monitoring"
                      sx={{
                        background: "rgba(255, 255, 255, 0.95)",
                        color: "#2e7d32",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        height: 36,
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                        "& .MuiChip-icon": {
                          color: "#2e7d32",
                        },
                        "@keyframes pulse": {
                          "0%, 100%": { opacity: 1 },
                          "50%": { opacity: 0.6 },
                        },
                      }}
                    />
                  )}
                </Stack>
              )}
            </Stack>
          </Toolbar>
        </Container>

        {/* Decorative Bottom Border */}
        <Box
          sx={{
            height: 4,
            background:
              "linear-gradient(90deg, #4caf50 0%, #2196f3 50%, #9c27b0 100%)",
          }}
        />
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
            background: "#DAEEF2",
            color: "#005F7B",
          },
        }}
      >
        <Box sx={{ height: "100%" }}>
          {/* Drawer Header */}
          <Box sx={{ p: 3, pb: 2 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Avatar
                  sx={{
                    bgcolor: "#005F7B",
                    width: 40,
                    height: 40,
                  }}
                >
                  <SecurityIcon sx={{ color: "#ffffff" }} />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight={700}>
                    Risk Ops
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    Dashboard
                  </Typography>
                </Box>
              </Stack>
              <IconButton
                onClick={() => setMobileMenuOpen(false)}
                sx={{ color: "#005F7B" }}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
          </Box>

          <Divider sx={{ borderColor: "rgba(76, 175, 80, 0.2)" }} />

          {/* Menu Items */}
          <Box sx={{ p: 2 }}>
            <Stack spacing={1.5}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  background: "rgba(255, 255, 255, 0.1)",
                  cursor: "pointer",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  component={Link}
                  to="/"
                  sx={{ textDecoration: "none", color: "inherit" }}
                  onClick={() => setMobileMenuOpen(false)} // <-- closes drawer
                >
                  <DashboardIcon />
                  <Typography variant="body2" fontWeight={600}>
                    Dashboard
                  </Typography>
                </Stack>
              </Box>

              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  background: "rgba(255, 255, 255, 0.1)",
                  cursor: "pointer",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  component={Link}
                  to="/business-requirement"
                  onClick={() => setMobileMenuOpen(false)} // <-- closes drawer
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  <ArticleIcon />
                  <Typography variant="body2" fontWeight={600}>
                    System Overview
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default Header;
