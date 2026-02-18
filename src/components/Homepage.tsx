import {
  Box,
  Container,
  Fade,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { CardProvider } from "../context/CardContext";
import CardDashboard from "./CardDashboard/Dashboard";
import LiveTransaction from "./LiveTransaction";

function Homepage() {
  const [selectedCardId, setSelectedCardId] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <CardProvider>
      <Box
        sx={{
          minHeight: "100vh",
          background: "#f5f7fa",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Main Content - Professional White Cards */}
        <Container
          maxWidth="xl"
          sx={{
            flex: 1,
            py: { xs: 2, sm: 3, md: 4 },
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Stack spacing={{ xs: 2.5, sm: 3, md: 4 }}>
            {/* Card List Section */}
            <Paper
              elevation={1}
              sx={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: { xs: 2, sm: 3 },
                overflow: "hidden",
              }}
            >
              {/* Section Header */}
              <Box
                sx={{
                  p: { xs: 2, sm: 2.5, md: 3 },
                  background:
                    "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  justifyContent="space-between"
                  spacing={1.5}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box>
                      <Typography
                        variant={isMobile ? "h6" : "h5"}
                        sx={{
                          fontWeight: 700,
                          color: "text.primary",
                          fontSize: { xs: "1.1rem", sm: "1.5rem" },
                        }}
                      >
                        Credit Card Account Risk Monitor
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontSize: { xs: "0.8rem", sm: "0.875rem" },
                        }}
                      >
                        Select an account to start simulation
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Box>

              {/* Card List Content - Your Component */}
              <Box
                sx={{
                  p: { xs: 2, sm: 2.5, md: 3 },
                  background: "#fafbfc",
                }}
              >
                <CardDashboard setSelectedCardId={setSelectedCardId} />
              </Box>
            </Paper>

            {/* Live Transaction Section - Shows when card is selected */}
            {selectedCardId && (
              <Fade in={true} timeout={500}>
                <Paper
                  elevation={1}
                  sx={{
                    background: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: { xs: 2, sm: 3 },
                    overflow: "hidden",
                  }}
                >
                  {/* Section Header */}
                  <Box
                    sx={{
                      p: { xs: 2, sm: 2.5, md: 3 },
                      background:
                        "linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      alignItems={{ xs: "flex-start", sm: "center" }}
                      spacing={2}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant={isMobile ? "h6" : "h5"}
                          sx={{
                            fontWeight: 700,
                            color: "text.primary",
                            fontSize: { xs: "1.1rem", sm: "1.5rem" },
                          }}
                        >
                          Live Transaction Monitor
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            fontSize: { xs: "0.8rem", sm: "0.875rem" },
                          }}
                        >
                          Real-time transaction monitoring and risk analysis
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>

                  {/* Transaction Content - Your Component */}
                  <Box
                    sx={{
                      p: { xs: 2, sm: 2.5, md: 3 },
                      background: "#fafbfc",
                    }}
                  >
                    <LiveTransaction selectedCardId={selectedCardId} />
                  </Box>
                </Paper>
              </Fade>
            )}
          </Stack>
        </Container>
      </Box>
    </CardProvider>
  );
}

export default Homepage;
