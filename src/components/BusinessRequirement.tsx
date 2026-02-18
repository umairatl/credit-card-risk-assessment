import {
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Grid,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import BusinessIcon from "@mui/icons-material/Business";

const FeatureBlock = ({ icon, title, items }: any) => (
  <Grid size={{ xs: 12, sm: 6 }}>
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            {icon}
            <Typography fontWeight={700}>{title}</Typography>
          </Stack>

          <Stack spacing={1}>
            {items.map((item: string, idx: number) => (
              <Typography key={idx} variant="body2">
                • {item}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  </Grid>
);

function BusinessRequirement() {
  return (
    <Stack spacing={3} p={3}>
      <Typography fontWeight={700}>System Overview</Typography>

      <Grid container spacing={2}>
        <FeatureBlock
          icon={<CreditCardIcon color="primary" />}
          title="Card Monitoring"
          items={[
            "Track card status (Active, Blocked, Temp Blocked)",
            "View credit limit and outstanding balance",
            "Calculate available credit automatically",
            "Payment status simulation (Pending / Overdue)",
            "Auto-blocked if utilization reaches 100%",
          ]}
        />

        <FeatureBlock
          icon={<MonitorHeartIcon color="success" />}
          title="Transaction Monitoring"
          items={[
            "Simulated real-time transaction stream (updates every 5 seconds)",
            "Monitor merchant, channel, amount, and status",
            "Detect high-value transactions for potential risk",
          ]}
        />

        <FeatureBlock
          icon={<SecurityIcon color="error" />}
          title="Risk Analysis"
          items={[
            "Calculate credit utilization percentage",
            "Monitor spending behaviour",
            "Risk thresholds (cards flagged as At-risk if utilization ≥ 80% and payment is overdue)",
            "Automatic risk flagging",
          ]}
        />

        <FeatureBlock
          icon={<SettingsIcon color="warning" />}
          title="Card Controls"
          items={[
            "Block / unblock cards",
            "Set transaction limits",
            "Auto-block if risk threshold exceeded",
          ]}
        />
      </Grid>

      <Divider />

      <Card sx={{ bgcolor: "background.paper" }}>
        {/* <CardContent>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <BusinessIcon color="secondary" />
            <Typography fontWeight={700}>Business Purpose</Typography>
          </Stack>

          <Stack direction="row" flexWrap="wrap" gap={1}>
            <Chip label="Fraud detection support" color="error" />
            <Chip label="Risk monitoring" color="warning" />
            <Chip label="Customer behaviour tracking" color="info" />
            <Chip label="Operational card control" color="primary" />
            <Chip label="Real-time decisions" color="success" />
          </Stack>
        </CardContent> */}

        <Divider />

        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <BusinessIcon color="secondary" />
            <Typography variant="subtitle2">Github Repository</Typography>
          </Stack>

          <Stack direction="row" flexWrap="wrap" gap={1}>
            <Typography>to be included here</Typography>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default BusinessRequirement;
