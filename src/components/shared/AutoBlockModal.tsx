import BlockIcon from "@mui/icons-material/Block";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { useCardContext } from "../../context/CardContext";

type AutoBlockedModalProps = {
  open: boolean;
  onClose: () => void;
  reason?: "utilization" | "exceed_attempts";
};

function AutoBlockedModal({
  open,
  onClose,
  reason = "utilization",
}: AutoBlockedModalProps) {
  const { autoBlockDetail } = useCardContext();

  const isExceedAttempts = reason === "exceed_attempts";

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Stack direction="row" alignItems="center" columnGap={1}>
          <BlockIcon color="error" />
          <Typography color="error" variant="h6">
            Card Blocked
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          The card of <strong>{autoBlockDetail?.cardholderName}</strong> has
          been automatically blocked due to{" "}
          {isExceedAttempts ? (
            <>
              <strong>
                more than 3 attempts of declined transactions exceeding the
                credit limit.
              </strong>
            </>
          ) : (
            <>
              reaching <strong>100% utilization and overdue payment</strong>.
            </>
          )}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {isExceedAttempts
            ? "This user has repeatedly attempted transactions beyond their approved limit. Please review the account and take the necessary action."
            : "For security, the system blocks cards automatically when utilization hits 100% or other risk thresholds are exceeded. Please take the necessary action."}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AutoBlockedModal;
