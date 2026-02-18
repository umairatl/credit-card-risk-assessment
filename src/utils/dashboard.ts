import { CardAccount } from "../types/card";

// Calculate outstanding
export const calculateUtilization = (card: CardAccount) => {
  return (card.outstandingBalance / card.transactionLimit) * 100;
};

// Calculate available credit
export const calculateAvailableCredit = (card: CardAccount) => {
  const limit = card.transactionLimit || 6000;
  return Math.max(0, limit - card.outstandingBalance);
};

// Calculate risk level
export const calculateRiskLevel = (rate: number) => {
  if (rate >= 80) return "At-risk";
  if (rate >= 60) return "Medium risk";
  return "Low risk";
};

// Simulate payment status
export const paymentStatusSimulation = (utilization: number) => {
  if (utilization === 0) {
    return "On time";
  }

  if (utilization <= 50) {
    return "Pending";
  }

  return "Overdue";
};

