import { createContext, useContext, useState, ReactNode } from "react";
import { CardAccount } from "../types/card";
import { MOCK_CARDS } from "../data/mockData";

interface CardContextType {
  userCards: CardAccount[];
  setUserCards: (
    updater: CardAccount[] | ((prev: CardAccount[]) => CardAccount[]),
  ) => void;
  autoBlockDetail: CardAccount | null;
  setAutoBlockDetail: (card: CardAccount | null) => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: ReactNode }) {
  const [userCards, setUserCards] = useState<CardAccount[]>(
    MOCK_CARDS.map((card) => ({ ...card, transactionLimit: 5000 })),
  );
  const [autoBlockDetail, setAutoBlockDetail] = useState<CardAccount | null>(
    null,
  );

  return (
    <CardContext.Provider
      value={{ userCards, setUserCards, autoBlockDetail, setAutoBlockDetail }}
    >
      {children}
    </CardContext.Provider>
  );
}

export function useCardContext() {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCardContext must be used within CardProvider");
  }
  return context;
}
