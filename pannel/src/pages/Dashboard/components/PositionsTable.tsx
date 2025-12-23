// components/PositionsTable.tsx
import { PositionData } from "../types";
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, MoreVertical } from "lucide-react";
import { useState } from "react";

interface PositionsTableProps {
  positions: PositionData[];
  priceData: any[];
}

const PositionsTable: React.FC<PositionsTableProps> = ({ positions, priceData }) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatBTC = (value: number) => {
    return value.toFixed(8) + ' BTC';
  };

  const getCurrentPrice = () => {
    if (priceData.length > 0) {
      const lastPrice = priceData[priceData.length - 1];
      return typeof lastPrice === 'number' ? lastPrice : parseFloat(lastPrice) || 0;
    }
    return 0;
  };

  const calculatePositionStats = (position: PositionData) => {
    const entryPrice = parseFloat(position.price) || 0;
    const profitPercent = parseFloat(position.profit) || 0;
    const currentPrice = getCurrentPrice() || entryPrice * (1 + profitPercent / 100);
    const balance = parseFloat(position.balance) || 0;
    const weight = parseFloat(position.weight) || 0;
    const profitValue = (profitPercent / 100) * balance;
    const profitBTC = weight * (profitPercent / 100);
    
    // Calculate P/L in USD using current BTC price
    const currentBTCPrice = getCurrentPrice();
    const profitUSD = profitBTC * currentBTCPrice;
    
    return {
      entryPrice,
      currentPrice,
      balance,
      weight,
      profitPercent,
      profitValue,
      profitBTC,
      profitUSD,
      marketState: parseFloat(position.market?.state?.toString() || "0"),
    };
  };

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  if (positions.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400">
        <div className="mb-2">هیچ موقعیت فعالی ندارید</div>
        <div className="text-sm">اولین معامله خود را شروع کنید</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-sm text-gray-400 border-b border-gray-800">
            <th className="text-right p-3">جفت ارز</th>
            <th className="text-right p-3">نوع / وضعیت</th>
            <th className="text-right p-3">حجم</th>
            <th className="text-right p-3">قیمت ورود</th>
            <th className="text-right p-3">قیمت فعلی</th>
            <th className="text-right p-3">سود/ضرر</th>
            <th className="text-right p-3">اقدام</th>
          </tr>
        </thead>
        <tbody>
          {positions.filter(pos => !pos.setllement).slice(0, 10).map((position) => {
            const stats = calculatePositionStats(position);
            const isExpanded = expandedRow === position.id;
            
            return (
              <>
                <tr 
                  key={position.id} 
                  className="border-b border-gray-800/50 hover:bg-gray-800/30 cursor-pointer"
                  onClick={() => toggleRow(position.id)}
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        position.currencie.includes('BTC') ? 'bg-yellow-500/20' : 'bg-blue-500/20'
                      }`}>
                        <span className="text-xs font-bold">
                          {position.currencie.includes('BTC') ? 'B' : position.currencie.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-white">{position.currencie}/USDT</div>
                        <div className="text-xs text-gray-400">
                          {new Date(position.createdAt).toLocaleDateString('fa-IR')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="space-y-1">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                        position.type === 'buy' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {position.type === 'buy' ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3" />
                        )}
                        <span>{position.type === 'buy' ? 'LONG' : 'SHORT'}</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        {stats.marketState === 1 ? 'حجم پایه' : 
                         stats.marketState === 2 ? 'پله اول' : 
                         stats.marketState === 3 ? 'پله دوم' : 'پله سوم'}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="space-y-1">
                      <div className="text-white font-medium">
                        {formatCurrency(stats.balance)}
                      </div>
                      <div className="text-xs text-gray-400">
                        {formatBTC(stats.weight)}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="space-y-1">
                      <div className="text-white">
                        ${stats.entryPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className={`font-bold ${
                      stats.currentPrice > stats.entryPrice ? 'text-green-400' : 
                      stats.currentPrice < stats.entryPrice ? 'text-red-400' : 
                      'text-gray-400'
                    }`}>
                      ${stats.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="space-y-1">
                      <div className={`inline-flex items-center gap-1 ${
                        stats.profitPercent >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {stats.profitPercent >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span className="font-bold">
                          {stats.profitPercent >= 0 ? '+' : ''}{stats.profitPercent.toFixed(2)}%
                        </span>
                      </div>
                      <div className={`text-xs ${stats.profitUSD >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ${stats.profitUSD.toFixed(2)}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors">
                        بستن
                      </button>
                      <button className="p-1 hover:bg-gray-700 rounded">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </td>
                </tr>
                
                {/* Expanded Details */}
                {isExpanded && (
                  <tr className="bg-gray-800/20">
                    <td colSpan={7} className="p-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="text-gray-400">اطلاعات موقعیت</div>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-400">شناسه:</span>
                              <span className="text-white font-mono">{position.id.substring(0, 8)}...</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">ایجاد شده:</span>
                              <span className="text-white">
                                {new Date(position.createdAt).toLocaleString('fa-IR')}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">بروزرسانی:</span>
                              <span className="text-white">
                                {new Date(position.updatedAt).toLocaleTimeString('fa-IR')}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-gray-400">جزئیات مالی</div>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-400">سود BTC:</span>
                              <span className={`${stats.profitBTC >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {stats.profitBTC >= 0 ? '+' : ''}{stats.profitBTC.toFixed(8)} BTC
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">ارزش دلاری:</span>
                              <span className={`${stats.profitUSD >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                ${stats.profitUSD.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">ارزش کل:</span>
                              <span className="text-white">
                                ${(stats.balance + stats.profitValue).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-gray-400">تحلیل تکنیکال</div>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-400">RSI بازار:</span>
                              <span className="text-white">
                                {parseFloat(position.market?.rsi || "0").toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">وضعیت:</span>
                              <span className={`${
                                parseFloat(position.market?.state?.toString() || "0") === 1 ? 'text-green-400' : 
                                parseFloat(position.market?.state?.toString() || "0") === 0 ? 'text-red-400' : 
                                'text-yellow-400'
                              }`}>
                                {parseFloat(position.market?.state?.toString() || "0") === 1 ? 'خرید' : 
                                 parseFloat(position.market?.state?.toString() || "0") === 0 ? 'فروش' : 
                                 'انتظار'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">مقدار میلی‌ثانیه:</span>
                              <span className="text-white">
                                {position.milisecond}ms
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-gray-400">اقدامات</div>
                          <div className="space-y-2">
                            <button className="w-full py-2 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors">
                              بستن فوری
                            </button>
                            <button className="w-full py-2 bg-yellow-600 hover:bg-yellow-700 rounded text-sm transition-colors">
                              تنظیم حد ضرر
                            </button>
                            <button className="w-full py-2 bg-green-600 hover:bg-green-700 rounded text-sm transition-colors">
                              افزایش حجم
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
      
      {/* Summary Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            تعداد موقعیت‌های فعال: <span className="text-white font-bold">
              {positions.filter(pos => !pos.setllement).length}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="text-gray-400">مجموع سود:</span>
              <span className={`ml-2 font-bold ${
                positions.reduce((sum, pos) => sum + (parseFloat(pos.profit) || 0), 0) >= 0 ? 
                'text-green-400' : 'text-red-400'
              }`}>
                {positions.reduce((sum, pos) => sum + (parseFloat(pos.profit) || 0), 0).toFixed(2)}%
              </span>
            </div>
            <div className="text-sm">
              <span className="text-gray-400">ارزش کل:</span>
              <span className="ml-2 font-bold text-white">
                ${positions
                  .filter(pos => !pos.setllement)
                  .reduce((sum, pos) => sum + (parseFloat(pos.balance) || 0), 0)
                  .toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionsTable;