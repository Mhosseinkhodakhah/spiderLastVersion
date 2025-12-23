// components/BalanceSummary.tsx
import { Bitcoin, DollarSign, Wallet } from "lucide-react";

interface BalanceItem {
  [key: string]: {
    balance: string;
    locked: string;
    available: string;
  };
}

interface BalanceSummaryProps {
  balanceData: BalanceItem[];
}

const BalanceSummary: React.FC<BalanceSummaryProps> = ({ balanceData }) => {
  const calculateTotals = () => {
    let totalBalance = 0;
    let totalLocked = 0;
    let totalAvailable = 0;
    
    balanceData.forEach(item => {
      const currency = Object.keys(item)[0];
      const data = item[currency];
      
      totalBalance += parseFloat(data.balance) || 0;
      totalLocked += parseFloat(data.locked) || 0;
      totalAvailable += parseFloat(data.available) || 0;
    });
    
    return { totalBalance, totalLocked, totalAvailable };
  };
  
  const totals = calculateTotals();

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Wallet className="w-5 h-5 text-blue-400" />
          خلاصه موجودی
        </h3>
        <span className="text-sm text-gray-400">مجموع</span>
      </div>
      
      <div className="space-y-4">
        {/* Total Balance */}
        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">موجودی کل</span>
            <DollarSign className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            ${totals.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </div>
        
        {/* Available Balance */}
        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">موجودی آزاد</span>
            <Bitcoin className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-xl font-bold text-white">
            ${totals.totalAvailable.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </div>
        
        {/* Locked Balance */}
        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">موجودی مسدود</span>
            <Wallet className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-xl font-bold text-white">
            ${totals.totalLocked.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </div>
        
        {/* Breakdown */}
        <div className="pt-4 border-t border-gray-800">
          <h4 className="text-sm text-gray-400 mb-3">توزیع ارزها</h4>
          <div className="space-y-2">
            {balanceData.map((item, index) => {
              const currency = Object.keys(item)[0];
              const balance = parseFloat(item[currency].balance) || 0;
              const percentage = totals.totalBalance > 0 ? (balance / totals.totalBalance) * 100 : 0;
              
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-xs font-bold">{currency.charAt(0)}</span>
                    </div>
                    <span className="text-sm text-white">{currency}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-300 w-16 text-left">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceSummary;