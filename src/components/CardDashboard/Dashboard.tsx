import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useCardContext } from "../../context/CardContext";
import { CardStatus } from "../../types/card";
import { calculateUtilization } from "../../utils/dashboard";

import AutoBlockedModal from "../shared/AutoBlockModal";
import CardCarousel from "./CardCarousel";
import CardLimitModal from "./CardModal";
import CardTable from "./CardTable";

function CardDashboard({
  setSelectedCardId,
}: {
  setSelectedCardId: (id: string) => void;
}) {
  const { userCards, setUserCards, setAutoBlockDetail } = useCardContext();

  const [showLimitModal, setShowLimitModal] = useState<string | null>(null);
  const [limitValue, setLimitValue] = useState<string>("");
  const [showAutoBlockModal, setShowAutoBlockModal] = useState<boolean>(false);
  const [confirmPending, setConfirmPending] = useState<{
    cardId: string;
    currentStatus: CardStatus;
  } | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  function onClickCardStatus(cardId: string, currentStatus: CardStatus) {
    setConfirmPending({ cardId, currentStatus });
  }

  function handleConfirm() {
    if (!confirmPending) return;
    const newStatus =
      confirmPending.currentStatus === "ACTIVE"
        ? "TEMPORARY_BLOCKED"
        : "ACTIVE";
    onChangeCardStatus(confirmPending.cardId, newStatus);
    setConfirmPending(null);
  }

  function onChangeCardStatus(cardId: string, newStatus: CardStatus) {
    setUserCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, status: newStatus } : card,
      ),
    );
  }

  function handleCardClick(cardId: string) {
    setSelectedCardId(cardId);
  }

  function openLimitModal(cardId: string, currentLimit?: number) {
    setShowLimitModal(cardId);
    setLimitValue(currentLimit?.toString() || "5000");
  }

  // auto-block on 100% utilization — runs for both desktop and mobile
  useEffect(() => {
    userCards.forEach((card) => {
      if (calculateUtilization(card) >= 100 && card.status === "ACTIVE") {
        setAutoBlockDetail(card);
        onChangeCardStatus(card.id, "BLOCKED");
        setShowAutoBlockModal(true);
      }
    });
  }, [userCards]);

  const selectedCard = userCards.find((c) => c.id === showLimitModal);

  return (
    <>
      {isMobile ? (
        <CardCarousel
          cards={userCards}
          onSelect={handleCardClick}
          onToggleStatus={onClickCardStatus}
          onOpenLimit={openLimitModal}
        />
      ) : (
        <CardTable
          cards={userCards}
          onSelect={handleCardClick}
          onToggleStatus={onClickCardStatus}
          onOpenLimit={openLimitModal}
        />
      )}

      {/* Block / Unblock Confirmation Dialog */}
      <Dialog
        open={!!confirmPending}
        onClose={() => setConfirmPending(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          {confirmPending?.currentStatus === "ACTIVE"
            ? "Block Card"
            : "Unblock Card"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmPending?.currentStatus === "ACTIVE"
              ? "Are you sure you want to block this card? All transactions will be declined until it is unblocked."
              : "Are you sure you want to unblock this card? Transactions will resume immediately."}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setConfirmPending(null)} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            color={
              confirmPending?.currentStatus === "ACTIVE" ? "error" : "success"
            }
            autoFocus
          >
            {confirmPending?.currentStatus === "ACTIVE" ? "Block" : "Unblock"}
          </Button>
        </DialogActions>
      </Dialog>

      <CardLimitModal
        open={!!showLimitModal}
        onClose={() => setShowLimitModal(null)}
        card={selectedCard}
        limitValue={limitValue}
        setLimitValue={setLimitValue}
        onSave={(cardId: string, newLimit: number) => {
          setUserCards((prev) =>
            prev.map((card) =>
              card.id === cardId
                ? { ...card, transactionLimit: newLimit }
                : card,
            ),
          );
          setShowLimitModal(null);
        }}
      />

      {showAutoBlockModal && (
        <AutoBlockedModal
          open={showAutoBlockModal}
          onClose={() => {
            setShowAutoBlockModal(false);
          }}
        />
      )}
    </>
  );
}

export default CardDashboard;
