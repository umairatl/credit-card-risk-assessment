export type CardStatus = "ACTIVE" | "TEMPORARY_BLOCKED" | "BLOCKED";
export type PaymentStatus = "PAID" | "PENDING" | "OVERDUE";

export interface CardAccount {
  id: string;
  cardholderName: string;
  status: CardStatus;
  transactionLimit: number;
  outstandingBalance: number;
  paymentStatus: PaymentStatus;
}

export interface Transaction {
  id: string;
  cardId: string;
  amount: number;
  merchant: string;
  status: "APPROVED" | "DECLINED" | "DECLINED_EXCEED_LIMIT";
  channel: "POS" | "ONLINE" | "ATM";
  timestamp: string;
  currency: string;
}

export interface Merchant {
  merchantName: string;
  channel: "POS" | "ONLINE" | "ATM";
}
