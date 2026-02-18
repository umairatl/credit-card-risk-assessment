import { CardAccount } from "../types/card";

export const MOCK_CARDS: CardAccount[] = [
  {
    id: "1",
    cardholderName: "James John",
    status: "ACTIVE",
    transactionLimit: 6000,
    outstandingBalance: 0,
    paymentStatus: "OVERDUE",
  },
  {
    id: "2",
    cardholderName: "Miller Doe",
    status: "ACTIVE",
    transactionLimit: 6000,
    outstandingBalance: 0,
    paymentStatus: "OVERDUE",
  },
];
