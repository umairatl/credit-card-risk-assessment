import { merchantData1, merchantData2 } from "../data/merchantData";
import { Transaction } from "../types/card";

export const isHighValue = (amount: number) => {
  return amount > 260;
};

export const generateRandomTransaction = (
  selectedCardId: string,
): Transaction => {
  const merchantsById = selectedCardId === "1" ? merchantData1 : merchantData2;
  const merchants =
    merchantsById[Math.floor(Math.random() * merchantsById.length)]; //pick random merchant
  const purchaseAmount =
    Math.random() > 0.2
      ? parseFloat((Math.random() * 130 + 20).toFixed(2)) // RM 20–150
      : parseFloat((Math.random() * 100 + 200).toFixed(2)); // RM 200–300;

  return {
    id: "TXN-" + Math.random().toString(36).slice(2, 11).toUpperCase(),
    cardId: selectedCardId,
    amount: purchaseAmount,
    merchant: merchants.merchantName,
    status: Math.random() > 0.2 ? "APPROVED" : "DECLINED",
    timestamp: new Date().toLocaleTimeString(),
    channel: merchants.channel,
    currency: "RM",
  };
};
