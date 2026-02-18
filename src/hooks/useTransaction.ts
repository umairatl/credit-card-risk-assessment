import { useState, useEffect, useRef } from "react";
import { Transaction } from "../types/card";
import { useCardContext } from "../context/CardContext";
import { generateRandomTransaction } from "../utils/calculation";

const EXCEED_LIMIT_BLOCK_THRESHOLD = 5;

export const useTransaction = (selectedCardId: string) => {
  const { setUserCards, setAutoBlockDetail } = useCardContext();
  const [allTransactions, setAllTransactions] = useState<{
    [key: string]: Transaction[];
  }>({});
  const [showExceedModal, setShowExceedModal] = useState(false);

  // track declined-exceed-limit attempts per card without causing re-renders
  const declinedCountRef = useRef<{ [cardId: string]: number }>({});

  // track which cards have been selected at least once (simulation only starts on first click)
  const activatedCardsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (selectedCardId) {
      activatedCardsRef.current.add(selectedCardId);
    }
  }, [selectedCardId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setUserCards((prevCards) => {
        // process only cards that have been activated (selected at least once)
        let updatedCards = [...prevCards];

        prevCards.forEach((card) => {
          if (card.status !== "ACTIVE") return;
          if (!activatedCardsRef.current.has(card.id)) return;

          const attemptedTx = generateRandomTransaction(card.id);
          const limit = card.transactionLimit || 5000;
          const availableCredit = limit - card.outstandingBalance;

          // AUTHORIZATION ENGINE
          let finalTx: Transaction;

          if (attemptedTx.amount > availableCredit) {
            finalTx = { ...attemptedTx, status: "DECLINED_EXCEED_LIMIT" };

            const prev = declinedCountRef.current[card.id] ?? 0;
            const next = prev + 1;
            declinedCountRef.current[card.id] = next;

            // block after threshold of consecutive declines
            if (next >= EXCEED_LIMIT_BLOCK_THRESHOLD) {
              declinedCountRef.current[card.id] = 0;
              setAllTransactions((prev) => ({
                ...prev,
                [card.id]: [finalTx, ...(prev[card.id] || [])].slice(0, 20),
              }));
              setAutoBlockDetail(card);
              setShowExceedModal(true);
              updatedCards = updatedCards.map((c) =>
                c.id === card.id ? { ...c, status: "BLOCKED" } : c,
              );
              return;
            }
          } else if (attemptedTx.status === "DECLINED") {
            // other decline reasons (fraud, expired, etc.) — doesn't count towards streak
            finalTx = { ...attemptedTx };
            declinedCountRef.current[card.id] = 0;
          } else {
            finalTx = { ...attemptedTx, status: "APPROVED" };
            declinedCountRef.current[card.id] = 0;
          }

          // update transaction list for this card
          setAllTransactions((prev) => ({
            ...prev,
            [card.id]: [finalTx, ...(prev[card.id] || [])].slice(0, 20),
          }));

          // update outstanding balance for approved transactions
          if (finalTx.status === "APPROVED") {
            updatedCards = updatedCards.map((c) => {
              if (c.id !== card.id) return c;
              return {
                ...c,
                outstandingBalance: Number(
                  (c.outstandingBalance + finalTx.amount).toFixed(2),
                ),
              };
            });
          }
        });

        return updatedCards;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []); // empty — interval runs once and handles all cards independently

  function closeExceedModal() {
    setShowExceedModal(false);
  }

  return {
    transactions: allTransactions[selectedCardId] || [],
    showExceedModal,
    closeExceedModal,
  };
};
