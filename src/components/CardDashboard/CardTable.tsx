import {
  Block as BlockIcon,
  CreditCard as CreditCardIcon,
  Edit as EditIcon,
  CheckCircle as UnblockIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import {
  calculateAvailableCredit,
  calculateRiskLevel,
  calculateUtilization,
  paymentStatusSimulation,
} from "../../utils/dashboard";
import { CardAccount, CardStatus } from "../../types/card";

type Props = {
  cards: CardAccount[];
  onSelect: (cardId: string) => void;
  onToggleStatus: (cardId: string, status: CardStatus) => void;
  onOpenLimit: (cardId: string, currentLimit?: number) => void;
};

function CardTable({ cards, onSelect, onToggleStatus, onOpenLimit }: Props) {
  return (
    <Box>
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ borderRadius: 2 }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.50" }}>
              <Header>Card Holder</Header>
              <Header>Status</Header>
              <Header align="right">Credit Limit</Header>
              <Header align="right">Outstanding</Header>
              <Header align="right">Available Credit</Header>
              <Header align="right">Utilization</Header>
              <Header align="right">Payment Status</Header>
              <Header align="center">Risk Level</Header>
              <Header align="center">Actions</Header>
            </TableRow>
          </TableHead>

          <TableBody>
            {cards.map((card) => {
              const cardLimit = card.transactionLimit || 6000;
              const utilization = calculateUtilization(card);
              const availableCredit = calculateAvailableCredit(card);
              const riskStatus = calculateRiskLevel(utilization);

              return (
                <TableRow
                  key={card.id}
                  onClick={() => onSelect(card.id)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <TableCell>
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
                          width: 36,
                          height: 36,
                        }}
                      >
                        <CreditCardIcon fontSize="small" />
                      </Avatar>
                      <Typography variant="body2" fontWeight={600}>
                        {card.cardholderName}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={card.status.replace("_", " ").toLocaleLowerCase()}
                      size="small"
                      color={card.status === "ACTIVE" ? "success" : "error"}
                    />
                  </TableCell>

                  <MoneyCell value={cardLimit} />
                  <MoneyCell value={card.outstandingBalance} />
                  <MoneyCell value={availableCredit} color="success.main" />

                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      color={
                        utilization >= 80
                          ? "error.main"
                          : utilization >= 60
                          ? "warning.main"
                          : "success.main"
                      }
                    >
                      {utilization.toFixed(1)}%
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      color={
                        paymentStatusSimulation(utilization) !== "On time"
                          ? "error.main"
                          : "success.main"
                      }
                    >
                      {paymentStatusSimulation(utilization)}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Chip
                      icon={utilization >= 60 ? <WarningIcon /> : undefined}
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
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button
                        variant={
                          card.status === "ACTIVE" ? "contained" : "outlined"
                        }
                        color={card.status === "ACTIVE" ? "error" : "success"}
                        size="small"
                        startIcon={
                          card.status === "ACTIVE" ? (
                            <BlockIcon />
                          ) : (
                            <UnblockIcon />
                          )
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleStatus(card.id, card.status);
                        }}
                        sx={{ fontWeight: 600 }}
                      >
                        {card.status === "ACTIVE" ? "Block" : "Unblock"}
                      </Button>

                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenLimit(card.id, card.transactionLimit);
                        }}
                        sx={{ fontWeight: 600 }}
                      >
                        Limit
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default CardTable;

function Header({ children, align = "left" }: any) {
  return (
    <TableCell align={align} sx={{ fontWeight: 700 }}>
      {children}
    </TableCell>
  );
}

function MoneyCell({ value, color }: { value: number; color?: string }) {
  return (
    <TableCell align="right">
      <Typography variant="body2" fontWeight={600} color={color}>
        RM {value.toLocaleString()}
      </Typography>
    </TableCell>
  );
}
