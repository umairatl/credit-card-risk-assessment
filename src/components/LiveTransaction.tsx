import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  Alert,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import {
  Block as BlockIcon,
  ChevronLeft,
  ChevronRight,
  CheckCircle as ApprovedIcon,
  Cancel as DeclinedIcon,
  AccountBalanceWallet as SpendIcon,
} from "@mui/icons-material";
import { useTransaction } from "../hooks/useTransaction";
import { Transaction } from "../types/card";
import { useCardContext } from "../context/CardContext";
import TransactionList from "./TransactionList";
import AutoBlockedModal from "./shared/AutoBlockModal";

const PAGE_SIZE = 5;

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <Paper
      variant="outlined"
      sx={{ flex: 1, p: { xs: 1.5, sm: 2 }, borderRadius: 2, minWidth: 0 }}
    >
      <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
        <Box sx={{ color, display: "flex" }}>{icon}</Box>
        <Typography variant="caption" color="text.secondary" fontWeight={500}>
          {label}
        </Typography>
      </Stack>
      <Typography variant="h6" fontWeight={800} color={color} sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}>
        {value}
      </Typography>
    </Paper>
  );
}

function LiveTransaction({ selectedCardId }: { selectedCardId: string }) {
  const { transactions, showExceedModal, closeExceedModal } = useTransaction(selectedCardId);
  const { userCards } = useCardContext();
  const cardDetails = userCards.find((card) => card.id === selectedCardId);
  const isCardBlocked = cardDetails?.status !== "ACTIVE";

  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [selectedCardId]);

  const totalPages = Math.ceil(transactions.length / PAGE_SIZE);
  const paginated = transactions.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const approvedCount = transactions.filter((t) => t.status === "APPROVED").length;
  const declinedCount = transactions.filter((t) => t.status !== "APPROVED").length;
  const totalSpend = transactions
    .filter((t) => t.status === "APPROVED")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <Box>
      {/* Cardholder Label */}
      <Typography variant="body2" color="text.secondary" mb={2}>
        Monitoring: <strong>{cardDetails?.cardholderName}</strong>
      </Typography>

      {isCardBlocked ? (
        <Alert severity="warning" icon={<BlockIcon />}>
          <strong>Card is Blocked</strong>
          <br />
          No transactions available for blocked cards.
        </Alert>
      ) : (
        <>
          {/* Stats Bar */}
          {transactions.length > 0 && (
            <>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} mb={2.5}>
                <StatCard
                  icon={<ApprovedIcon fontSize="small" />}
                  label="Approved"
                  value={String(approvedCount)}
                  color="#2e7d32"
                />
                <StatCard
                  icon={<DeclinedIcon fontSize="small" />}
                  label="Declined"
                  value={String(declinedCount)}
                  color="#c62828"
                />
                <StatCard
                  icon={<SpendIcon fontSize="small" />}
                  label="Total Spend"
                  value={`RM ${totalSpend.toFixed(2)}`}
                  color="#005F7B"
                />
              </Stack>
              <Divider sx={{ mb: 2 }} />
            </>
          )}

          {/* Empty State */}
          {transactions.length === 0 ? (
            <Paper
              variant="outlined"
              sx={{ p: 4, textAlign: "center", bgcolor: "grey.50" }}
            >
              <Typography variant="body1" color="text.secondary">
                ⏳ Waiting for transactions...
              </Typography>
            </Paper>
          ) : (
            <>
              <Stack spacing={1.5}>
                {paginated.map((tx: Transaction) => (
                  <TransactionList key={tx.id} transaction={tx} />
                ))}
              </Stack>

              {/* Pagination */}
              {totalPages > 1 && (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={1}
                  mt={2}
                >
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<ChevronLeft />}
                    onClick={() => setPage((p) => p - 1)}
                    disabled={page === 0}
                  >
                    Prev
                  </Button>
                  <Typography variant="body2" color="text.secondary">
                    {page + 1} / {totalPages}
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    endIcon={<ChevronRight />}
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page >= totalPages - 1}
                  >
                    Next
                  </Button>
                </Stack>
              )}
            </>
          )}
        </>
      )}

      <AutoBlockedModal
        open={showExceedModal}
        onClose={closeExceedModal}
        reason="exceed_attempts"
      />
    </Box>
  );
}

export default LiveTransaction;
