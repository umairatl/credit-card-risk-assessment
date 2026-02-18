import { Box, Container, Stack, Typography } from "@mui/material";

function Footer() {

  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid #e5e7eb",
        background: "#DAEEF2",
        py: { xs: 2, sm: 2.5, md: 3 },
        px: { xs: 2, sm: 3, md: 4 },
        mt: "auto",
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#005F7B",
              textAlign: { xs: "center", sm: "left" },
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            © 2026 Capstone Project · Accenture · umairatl.dev
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.disabled",
              textAlign: { xs: "center", sm: "right" },
              fontSize: { xs: "0.7rem", sm: "0.75rem" },
            }}
          >
            Powered by React + Material-UI
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
