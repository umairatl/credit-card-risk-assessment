import {
  Block as BlockIcon,
  CreditCard as CreditCardIcon,
  Edit as EditIcon,
  CheckCircle as UnblockIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { CardAccount, CardStatus } from "../../types/card";
import {
  calculateAvailableCredit,
  calculateRiskLevel,
  calculateUtilization,
  paymentStatusSimulation,
} from "../../utils/dashboard";

type Props = {
  cards: CardAccount[];
  onSelect: (cardId: string) => void;
  onToggleStatus: (cardId: string, status: CardStatus) => void;
  onOpenLimit: (cardId: string, currentLimit?: number) => void;
};

function CardCarousel({ cards, onSelect, onToggleStatus, onOpenLimit }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        gap: 2,
        pb: 2,
      }}
    >
      {cards.map((card) => {
        const cardLimit = card.transactionLimit || 6000;
        const utilization = calculateUtilization(card);
        const availableCredit = calculateAvailableCredit(card);
        const riskStatus = calculateRiskLevel(utilization);

        return (
          <Card
            key={card.id}
            onClick={() => onSelect(card.id)}
            sx={{
              minWidth: 320,
              maxWidth: 320,
              cursor: "pointer",
              border: "1px solid",
              borderColor: "divider",
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: "#DAEEF2",
                boxShadow: 3,
                transform: "translateY(-2px)",
                background: "#DAEEF2",
              },
            }}
          >
            <CardContent>
              <Stack spacing={2}>
                {/* Header */}
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Avatar
                    sx={{
                      background: "white",
                      border:
                        card.status === "ACTIVE"
                          ? "2px dashed #81c784"
                          : "2px dashed #e57373",
                      color:
                        card.status === "ACTIVE"
                          ? "success.main"
                          : "error.main",
                    }}
                  >
                    <CreditCardIcon />
                  </Avatar>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2" fontWeight={700} noWrap>
                      {card.cardholderName}
                    </Typography>

                    <Chip
                      label={card.status.replace("_", " ").toLocaleLowerCase()}
                      size="small"
                      color={card.status === "ACTIVE" ? "success" : "error"}
                      sx={{
                        mt: 0.5,
                        fontWeight: 600,
                        height: 20,
                        fontSize: "0.7rem",
                      }}
                    />
                  </Box>
                </Stack>

                {/* Financial Details */}
                <Stack spacing={1}>
                  <Row
                    label="Credit Limit"
                    value={`RM ${cardLimit.toLocaleString()}`}
                  />
                  <Row
                    label="Outstanding"
                    value={`RM ${card.outstandingBalance.toLocaleString()}`}
                  />
                  <Row
                    label="Available Credit"
                    value={`RM ${availableCredit.toLocaleString()}`}
                    valueColor="success.main"
                  />
                  <Row
                    label="Utilization"
                    value={`${utilization.toFixed(1)}%`}
                    valueColor={
                      utilization >= 80
                        ? "error.main"
                        : utilization >= 60
                          ? "warning.main"
                          : "success.main"
                    }
                  />

                  <Row
                    label="Payment Status"
                    value={paymentStatusSimulation(utilization)}
                    valueColor={
                      paymentStatusSimulation(utilization) !== "On time"
                        ? "error.main"
                        : "success.main"
                    }
                  />

                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">
                      Risk Level
                    </Typography>
                    <Chip
                      label={riskStatus}
                      size="small"
                      color={
                        utilization >= 80
                          ? "warning"
                          : utilization >= 60
                            ? "info"
                            : "success"
                      }
                      variant="outlined"
                      sx={{ height: 18, fontSize: "0.65rem" }}
                    />
                  </Stack>
                </Stack>

                {/* Actions */}
                <Stack direction="row" spacing={1}>
                  <Button
                    fullWidth
                    variant={
                      card.status === "ACTIVE" ? "contained" : "outlined"
                    }
                    color={card.status === "ACTIVE" ? "error" : "success"}
                    size="small"
                    startIcon={
                      card.status === "ACTIVE" ? <BlockIcon /> : <UnblockIcon />
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleStatus(card.id, card.status);
                    }}
                    sx={{ fontWeight: 600, fontSize: "0.75rem" }}
                  >
                    {card.status === "ACTIVE" ? "Block" : "Unblock"}
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenLimit(card.id, card.transactionLimit);
                    }}
                    sx={{ fontWeight: 600, fontSize: "0.75rem" }}
                  >
                    Limit
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}

export default CardCarousel;

/* Small helper component to reduce repetition */
function Row({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="caption" fontWeight={600} color={valueColor}>
        {value}
      </Typography>
    </Stack>
  );
}
