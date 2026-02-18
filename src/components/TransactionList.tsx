import {
  Box,
  Paper,
  Stack,
  Typography,
  Chip,
  IconButton,
  Collapse,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  CheckCircle as ApprovedIcon,
  Cancel as DeclinedIcon,
  HourglassEmpty as PendingIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { Transaction } from "../types/card";
import { isHighValue } from "../utils/calculation";

interface TransactionListProps {
  transaction: Transaction;
}

const STATUS_CONFIG: Record<string, { color: "success" | "error" | "warning"; icon: React.ReactElement }> = {
  APPROVED: { color: "success", icon: <ApprovedIcon fontSize="inherit" /> },
  DECLINED: { color: "error", icon: <DeclinedIcon fontSize="inherit" /> },
  DECLINED_EXCEED_LIMIT: { color: "error", icon: <DeclinedIcon fontSize="inherit" /> },
};

const DEFAULT_STATUS = { color: "warning" as const, icon: <PendingIcon fontSize="inherit" /> };

function DetailRow({
  label,
  children,
  textVariant,
}: {
  label: string;
  children: React.ReactNode;
  textVariant: "caption" | "body2";
}) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant={textVariant} color="text.secondary">
        {label}
      </Typography>
      {children}
    </Stack>
  );
}

function TransactionList({ transaction }: TransactionListProps) {
  const [expanded, setExpanded] = useState(false);
  const highValue = isHighValue(transaction.amount);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const statusConfig = STATUS_CONFIG[transaction.status] ?? DEFAULT_STATUS;
  const textVariant = isMobile ? "caption" : "body2";
  const chipFontSize = isMobile ? "0.7rem" : "0.75rem";

  const expandButton = (
    <IconButton
      size="small"
      onClick={() => setExpanded((p) => !p)}
      sx={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
    >
      <ExpandMoreIcon fontSize="small" />
    </IconButton>
  );

  const statusChips = (
    <Stack direction="row" spacing={0.5} alignItems="center" flexWrap="wrap" gap={0.5}>
      <Chip
        icon={statusConfig.icon}
        label={transaction.status}
        color={statusConfig.color}
        size="small"
        sx={{ height: 24, fontSize: chipFontSize, fontWeight: 600 }}
      />
      {highValue && (
        <Chip
          label="HIGH RISK"
          color="error"
          size="small"
          sx={{ height: 24, fontSize: chipFontSize, fontWeight: 600 }}
        />
      )}
    </Stack>
  );

  const expandedDetails = (
    <Collapse in={expanded}>
      <Divider sx={{ my: isMobile ? 1 : 2 }} />
      <Stack spacing={1}>
        <DetailRow label="Transaction ID" textVariant={textVariant}>
          <Typography variant={textVariant} fontWeight={500} fontFamily="monospace">
            {transaction.id}
          </Typography>
        </DetailRow>
        <DetailRow label="Channel" textVariant={textVariant}>
          <Typography variant={textVariant} fontWeight={500}>
            {transaction.channel}
          </Typography>
        </DetailRow>
        <DetailRow label="Status" textVariant={textVariant}>
          <Chip
            label={transaction.status}
            color={statusConfig.color}
            size="small"
            sx={{ height: 20, fontSize: isMobile ? "0.65rem" : "0.7rem" }}
          />
        </DetailRow>
        <DetailRow label="Risk Level" textVariant={textVariant}>
          <Chip
            label={highValue ? "High Risk" : "Low Risk"}
            color={highValue ? "error" : "success"}
            size="small"
            sx={{ height: 20, fontSize: isMobile ? "0.65rem" : "0.7rem" }}
          />
        </DetailRow>
      </Stack>
    </Collapse>
  );

  const accentColor =
    statusConfig.color === "success"
      ? theme.palette.success.main
      : statusConfig.color === "error"
      ? theme.palette.error.main
      : theme.palette.warning.main;

  return (
    <Paper
      variant="outlined"
      sx={{
        borderColor: highValue ? "error.main" : "divider",
        borderWidth: highValue ? 2 : 1,
        bgcolor: highValue ? "error.lighter" : "background.paper",
        borderLeft: isMobile ? undefined : `4px solid ${accentColor}`,
        "&:hover": { boxShadow: 2, borderColor: highValue ? "error.main" : "primary.light" },
        transition: "all 0.2s",
      }}
    >
      <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
        {isMobile ? (
          // Mobile layout — unchanged
          <Stack spacing={1.5}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box sx={{ flex: 1, minWidth: 0, mr: 1 }}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                >
                  {transaction.merchant}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {transaction.timestamp}
                </Typography>
              </Box>
              {expandButton}
            </Stack>

            <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
              {statusChips}
              <Typography variant="body1" fontWeight={700} color={highValue ? "error.main" : "text.primary"} sx={{ whiteSpace: "nowrap" }}>
                RM {transaction.amount.toFixed(2)}
              </Typography>
            </Stack>

            {expandedDetails}
          </Stack>
        ) : (
          // Desktop layout
          <Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="body1"
                  fontWeight={700}
                  color="text.primary"
                  sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", letterSpacing: "-0.01em" }}
                >
                  {transaction.merchant}
                </Typography>
                <Typography variant="caption" color="text.disabled" sx={{ fontFamily: "monospace" }}>
                  {transaction.timestamp}
                </Typography>
              </Box>

              <Stack direction="row" alignItems="center" spacing={1.5}>
                {statusChips}
                <Typography
                  variant="body1"
                  fontWeight={800}
                  color={highValue ? "error.main" : "text.primary"}
                  sx={{ minWidth: 110, textAlign: "right", letterSpacing: "-0.01em" }}
                >
                  RM {transaction.amount.toFixed(2)}
                </Typography>
                {expandButton}
              </Stack>
            </Stack>

            {expandedDetails}
          </Stack>
        )}
      </Box>
    </Paper>
  );
}

export default TransactionList;
