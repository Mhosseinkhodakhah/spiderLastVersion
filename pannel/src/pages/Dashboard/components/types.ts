// types.ts - Create this file for shared types
export interface BalanceItem {
  [key: string]: {
    balance: string;
    locked: string;
    available: string;
  };
}

export interface MarketStateData {
  lastPrice: string;
  lastBuyPrice: string;
  lastSellPrice: string;
  lastState: string | number;
  state: string | number;
  currencies: string;
  totalBalance: string;
  rsi: string;
}

export interface PositionData {
  id: string;
  balance: string;
  currencie: string;
  createdAt: string;
  date: string;
  deletedAt: string | null;
  market: {
    createdAt: string;
    currencies: string;
    deletedAt: string | null;
    id: string;
    lastBuyPrice: string;
    lastPrice: string;
    lastSellPrice: string;
    lastState: string | number;
    profit: string;
    rsi: string;
    state: string | number;
    totalBalance: string;
    updatedAt: string;
  };
  milisecond: string;
  price: string;
  profit: string;
  setllement: boolean;
  time: string;
  type: string;
  updatedAt: string;
  weight: string;
}