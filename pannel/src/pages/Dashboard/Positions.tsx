import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getbalances, getPositions, history, market, price } from "../../server/admin";
import { Divider } from "@heroui/divider";
import { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Bitcoin, 
  Activity,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  Coins,
  Wallet,
  BarChart3,
  Clock
} from "lucide-react";

// Define types
interface BalanceItem {
  [key: string]: {
    balance: string;
    locked: string;
    available: string;
  };
}

interface MarketStateData {
  lastPrice: string;
  lastBuyPrice: string;
  lastSellPrice: string;
  lastState: string | number;
  state: string | number;
  currencies: string;
  totalBalance: string;
  rsi: string;
}

interface PositionData {
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

interface MarketStateResponse {
  data: MarketStateData[];
}

interface PriceResponse {
  data: any[];
}

export default function Positions() {
  const { data, isLoading, isError, error } = useQuery<BalanceItem[]>({
    queryKey: ["getBalance"],
    queryFn: getbalances,
  });

  const priceData = useQuery<PriceResponse>({
    queryKey: ["getPrice"],
    queryFn: price,
  });

  const { data: positions, isLoading: positionsLoading, isError: positionsError } = useQuery<{data : PositionData[]}>({
    queryKey: ["getPositions"],
    queryFn: getPositions,
  });

  const marketState = useQuery<MarketStateResponse>({
    queryKey: ["getMarket"],
    queryFn: market,
  });

  const [btcPrice, setBtcPrice] = useState<string>('');
  
  let queryPrice: any[] = [];
  let marketStateData: MarketStateData | undefined;
  
  let marketStateFinal = {
    lastSellPrice: 0,
    lastPrice: 0,
    lastBuyPrice: 0,
    lastState: 0,
    state: 0,
    marketStatus: 'bearish' as 'bullish' | 'bearish',
    totalBalance: 0,
    activeCurrencies: 0,
    priceChange: 0,
    rsi: 0
  };
  
  let lastChange = 0;
  let marketType = 0;

  if (marketState.isSuccess && marketState.data?.data?.[0]) {
    marketStateData = marketState.data.data[0];
    
    const totalBalance = parseFloat(marketStateData.totalBalance) || 0;
    const lastBalance = marketState.data.data[marketState.data.data.length - 1]?.totalBalance || "0";
    const lastTotalBalance = parseFloat(lastBalance) || 0;
    
    const priceChangePercent = lastTotalBalance !== 0 
      ? ((totalBalance - lastTotalBalance) / lastTotalBalance) * 100 
      : 0;
    
    marketStateFinal = {
      lastPrice: parseFloat(marketStateData.lastPrice) || 0,
      lastBuyPrice: parseFloat(marketStateData.lastBuyPrice) || 0,
      lastSellPrice: parseFloat(marketStateData.lastSellPrice) || 0,
      lastState: typeof marketStateData.lastState === 'string' ? parseInt(marketStateData.lastState) : marketStateData.lastState || 0,
      state: typeof marketStateData.state === 'string' ? parseInt(marketStateData.state) : marketStateData.state || 0,
      marketStatus: priceChangePercent > 0 ? 'bullish' : 'bearish',
      totalBalance: totalBalance,
      activeCurrencies: parseInt(marketStateData.currencies) || 0,
      priceChange: priceChangePercent,
      rsi: parseFloat(marketStateData.rsi) || 0
    };
    
    const lastState = marketStateFinal.lastState;
    const lastPrice = marketStateFinal.lastPrice;
    const lastBuyPrice = marketStateFinal.lastBuyPrice;
    const lastSellPrice = marketStateFinal.lastSellPrice;
    
    if (lastState === 0) {
      let percent = 0;
      if (lastPrice > lastSellPrice) {
        marketType = 1;
        let mainPrice = lastSellPrice;
        percent = lastSellPrice !== 0 ? ((lastPrice - mainPrice) / mainPrice) * 100 : 0;
      } else {
        marketType = 0;
        let mainPrice = lastPrice;
        percent = mainPrice !== 0 ? ((lastSellPrice - mainPrice) / mainPrice) * 100 : 0;
      }
      lastChange = +percent.toFixed(3);
    } else {
      let percent = 0;
      if (lastPrice > lastBuyPrice) {
        marketType = 1;
        let mainPrice = lastBuyPrice;
        percent = lastBuyPrice !== 0 ? ((lastPrice - mainPrice) / mainPrice) * 100 : 0;
      } else {
        marketType = 0;
        let mainPrice = lastPrice;
        percent = mainPrice !== 0 ? ((lastBuyPrice - mainPrice) / mainPrice) * 100 : 0;
      }
      lastChange = +percent.toFixed(3);
    }
  }

  if (priceData.isFetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-blue-400">در حال بارگذاری موجودی‌ها...</div>
      </div>
    );
  }

  if (priceData.isSuccess && priceData.data?.data) {
    queryPrice = priceData.data.data;
  }

  let btcDollar = 0;
  if (data && data.length > 0) {
    for (let i of data) {
      const currency = Object.keys(i)[0];
      if (currency === 'BTC') {
        let balance = parseFloat(i[currency].balance) || 0;
        if (queryPrice.length > 0 && queryPrice[queryPrice.length - 1]) {
          let btcVolum = balance * parseFloat(queryPrice[queryPrice.length - 1]) || 0;
          btcDollar = +btcVolum.toFixed(2);
        }
      }
    }
  }

  // Add loading state
  if (isLoading || positionsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-blue-400">در حال بارگذاری موجودی‌ها...</div>
      </div>
    );
  }

  // Add error state
  if (isError || positionsError) {
    console.error('Error fetching balances:', error);
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-400">خطا در بارگذاری موجودی‌ها</div>
      </div>
    );
  }

  // Check if data exists and is an array
  if (!data || !Array.isArray(data)) {
    console.log('Data is not an array or is empty:', data);
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">هیچ داده‌ای برای موجودی‌ها موجود نیست</div>
      </div>
    );
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Format percentage
  const formatPercent = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  // Helper to parse string to number safely
  const safeParseFloat = (value: string | number): number => {
    if (typeof value === 'number') return value;
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  };

  return (
    <div className="p-6 space-y-8">
      {/* Market Overview Cards */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Activity className="w-6 h-6" />
          نمای کلی بازار
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Market Price Card */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-green-400" />
              <span className="text-sm text-gray-300">قیمت فعلی</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">
              {formatCurrency(marketStateFinal.lastPrice)}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">BTC/USDT</span>
              <div className={`px-2 py-1 rounded-full text-xs ${marketStateFinal.marketStatus === 'bullish' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {marketStateFinal.marketStatus === 'bullish' ? 'صعودی' : 'نزولی'}
              </div>
            </div>
          </div>

          {/* RSI Card */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-purple-400" />
              <span className="text-sm text-gray-300">شاخص RSI</span>
            </div>
            <div className="flex items-end justify-between mb-2">
              <h3 className={`text-4xl font-bold ${marketStateFinal.rsi > 70 ? 'text-red-400' : marketStateFinal.rsi < 30 ? 'text-green-400' : 'text-yellow-400'}`}>
                {marketStateFinal.rsi.toFixed(2)}
              </h3>
              <div className={`text-sm px-3 py-1 rounded-full ${marketStateFinal.rsi > 70 ? 'bg-red-500/20 text-red-400' : marketStateFinal.rsi < 30 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                {marketStateFinal.rsi > 70 ? 'اشباع خرید' : marketStateFinal.rsi < 30 ? 'اشباع فروش' : 'خنثی'}
              </div>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full ${marketStateFinal.rsi > 70 ? 'bg-red-500' : marketStateFinal.rsi < 30 ? 'bg-green-500' : 'bg-yellow-500'}`}
                style={{ width: `${Math.min(marketStateFinal.rsi, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Price Change Card */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Percent className="w-8 h-8 text-blue-400" />
              <span className="text-sm text-gray-300">تغییر ۲۴ ساعته</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className={`text-4xl font-bold ${marketStateFinal.priceChange > 0 ? 'text-green-400' : marketStateFinal.priceChange < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                {formatPercent(marketStateFinal.priceChange)}
              </h3>
              {marketStateFinal.priceChange > 0 ? (
                <TrendingUp className="w-8 h-8 text-green-400" />
              ) : (
                <TrendingDown className="w-8 h-8 text-red-400" />
              )}
            </div>
            <div className="text-sm text-gray-400">
              موجودی کل: {formatCurrency(marketStateFinal.totalBalance)}
            </div>
          </div>

          {/* Active Positions Card */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Coins className="w-8 h-8 text-yellow-400" />
              <span className="text-sm text-gray-300">موقعیت‌های فعال</span>
            </div>
            <h3 className="text-4xl font-bold text-white mb-2">
              {marketStateFinal.activeCurrencies}
            </h3>
            <div className="text-sm text-gray-400">
              آخرین اقدام: {marketStateFinal.lastState === 0 ? 'فروش' : 'خرید'}
            </div>
          </div>
        </div>
      </div>

      {/* Buy/Sell Price Cards */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Wallet className="w-6 h-6" />
          قیمت‌های معاملاتی
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Buy Price Card */}
          <div className="bg-gradient-to-br from-green-900/30 to-gray-900 rounded-2xl p-6 border border-green-500/30 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <ArrowUpRight className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">آخرین قیمت خرید</h3>
                  <p className="text-sm text-gray-400">نقطه ورود برای خرید</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${marketType === 1 && marketStateFinal.lastState === 1 ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-300'}`}>
                فعال
              </span>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-400 mb-2">
                {marketStateFinal.lastBuyPrice > 0 ? formatCurrency(marketStateFinal.lastBuyPrice) : 'ناموجود'}
              </div>
              <div className="text-sm text-gray-400">
                تفاوت فعلی: {lastChange.toFixed(2)}%
              </div>
            </div>
          </div>

          {/* Sell Price Card */}
          <div className="bg-gradient-to-br from-red-900/30 to-gray-900 rounded-2xl p-6 border border-red-500/30 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <ArrowDownRight className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">آخرین قیمت فروش</h3>
                  <p className="text-sm text-gray-400">نقطه خروج برای فروش</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${marketType === 0 && marketStateFinal.lastState === 0 ? 'bg-red-500/20 text-red-400' : 'bg-gray-700 text-gray-300'}`}>
                فعال
              </span>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-red-400 mb-2">
                {marketStateFinal.lastSellPrice > 0 ? formatCurrency(marketStateFinal.lastSellPrice) : 'ناموجود'}
              </div>
              <div className="text-sm text-gray-400">
                تفاوت فعلی: {lastChange.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Positions Data */}
      {positions && positions.data.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            موقعیت‌های فعال
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            {positions.data.map((position: PositionData, index: number) => {
              const profit = safeParseFloat(position.profit);
              const balance = safeParseFloat(position.balance);
              const weight = safeParseFloat(position.weight);
              const priceValue = safeParseFloat(position.price);
              const marketState = safeParseFloat(position.market.state);
              
              return (
                <div key={position.id || index} className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                      <div className={`p-3 rounded-xl ${position.type === 'buy' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                        {position.type === 'buy' ? (
                          <ArrowUpRight className="w-6 h-6 text-green-400" />
                        ) : (
                          <ArrowDownRight className="w-6 h-6 text-red-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{position.currencie}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${position.type === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {position.type === 'buy' ? 'LONG' : 'SHORT'}
                          </span>
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400">
                            {marketState === 1 ? 'حجم پایه' : 
                             marketState === 2 ? 'پله اول' : 
                             marketState === 3 ? 'پله دوم' : 'پله سوم'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-3xl font-bold text-white mb-1">
                        {formatCurrency(balance)}
                      </div>
                      <div className="text-sm text-gray-400">
                        حجم موقعیت
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <div className="text-sm text-gray-400">قیمت ورود</div>
                      <div className="text-lg font-semibold text-white">
                        {formatCurrency(priceValue)}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm text-gray-400">وزن</div>
                      <div className="text-lg font-semibold text-white">
                        {weight.toFixed(8)} BTC
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm text-gray-400">سود</div>
                      <div className={`text-lg font-semibold ${profit > 0 ? 'text-green-400' : profit < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                        {profit.toFixed(8)} BTC
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm text-gray-400">وضعیت</div>
                      <div className={`text-lg font-semibold ${position.setllement ? 'text-green-400' : 'text-yellow-400'}`}>
                        {position.setllement ? 'تسویه شده' : 'فعال'}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>ایجاد شده: {new Date(position.createdAt).toLocaleString('fa-IR')}</span>
                      </div>
                      <div>
                        بروزرسانی: {new Date(position.updatedAt).toLocaleTimeString('fa-IR')}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Balance Cards */}
      {data && data.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Bitcoin className="w-6 h-6" />
            موجودی کیف پول
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item: BalanceItem, index: number) => {
              const currency = Object.keys(item)[0];
              const balanceData = item[currency];
              
              const balance = safeParseFloat(balanceData.balance);
              const locked = safeParseFloat(balanceData.locked);
              const available = safeParseFloat(balanceData.available);
              
              return (
                <div key={index} className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl hover:border-blue-500/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Bitcoin className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{currency}</h3>
                        <p className="text-sm text-gray-400">موجودی رمزارز</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${balance > 0 ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-300'}`}>
                      فعال
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">موجودی</div>
                      <div className="text-3xl font-bold text-white">
                        {balance.toFixed(8)}
                      </div>
                    </div>
                    
                    {currency === 'BTC' && btcDollar > 0 && (
                      <div className="pt-4 border-t border-gray-700">
                        <div className="text-sm text-gray-400 mb-1">ارزش به دلار</div>
                        <div className="text-2xl font-bold text-green-400">
                          {formatCurrency(btcDollar)}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>مسدود شده: {locked.toFixed(8)}</span>
                      <span>موجودی آزاد: {available.toFixed(8)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}