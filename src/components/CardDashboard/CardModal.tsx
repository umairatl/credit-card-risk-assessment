import { Close as CloseIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CardAccount } from "../../types/card";

type Props = {
  open: boolean;
  onClose: () => void;
  card: CardAccount | undefined;
  limitValue: string;
  setLimitValue: (value: string) => void;
  onSave: (cardId: string, newLimit: number) => void;
};

function CardLimitModal({
  open,
  onClose,
  card,
  limitValue,
  setLimitValue,
  onSave,
}: Props) {
  const handleSave = () => {
    if (!card) return;
    onSave(card.id, parseFloat(limitValue));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" fontWeight={700}>
            Set Transaction Limit
          </Typography>

          <IconButton edge="end" onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Card: <strong>{card?.cardholderName}</strong>
          </Typography>

          <TextField
            fullWidth
            label="Max Transaction Amount (RM)"
            type="number"
            value={limitValue}
            onChange={(e) => setLimitValue(e.target.value)}
            variant="outlined"
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, pt: 0 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>

        <Button onClick={handleSave} variant="contained" disabled={!card}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CardLimitModal;
