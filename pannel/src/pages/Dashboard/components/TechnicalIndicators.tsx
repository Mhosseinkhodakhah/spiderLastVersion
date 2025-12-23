// components/TechnicalIndicators.tsx
import { TrendingUp, TrendingDown, Activity, Zap } from "lucide-react";

const TechnicalIndicators: React.FC = () => {
  const indicators = [
    { name: "RSI", value: 67.8, status: "overbought", level: "high" },
    { name: "MACD", value: 2.34, status: "bullish", level: "medium" },
    { name: "Bollinger", value: "Wide", status: "volatile", level: "high" },
    { name: "Volume", value: "1.2M", status: "high", level: "high" },
    { name: "Stoch RSI", value: 89.2, status: "overbought", level: "high" },
    { name: "ADX", value: 45.6, status: "strong", level: "medium" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "bullish":
      case "strong":
        return "text-green-400";
      case "bearish":
      case "weak":
        return "text-red-400";
      case "overbought":
        return "text-yellow-400";
      case "oversold":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-500/20 border-red-500/30";
      case "medium":
        return "bg-yellow-500/20 border-yellow-500/30";
      case "low":
        return "bg-green-500/20 border-green-500/30";
      default:
        return "bg-gray-500/20 border-gray-500/30";
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-400" />
          اندیکاتورهای تکنیکال
        </h3>
        <Zap className="w-4 h-4 text-yellow-400" />
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {indicators.map((indicator, index) => (
          <div 
            key={index}
            className={`p-3 rounded-lg border ${getLevelColor(indicator.level)}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">{indicator.name}</span>
              {indicator.level === "high" ? (
                <TrendingUp className="w-3 h-3 text-red-400" />
              ) : indicator.level === "medium" ? (
                <Activity className="w-3 h-3 text-yellow-400" />
              ) : (
                <TrendingDown className="w-3 h-3 text-green-400" />
              )}
            </div>
            <div className={`text-lg font-bold ${getStatusColor(indicator.status)}`}>
              {typeof indicator.value === "number" 
                ? indicator.value.toFixed(2)
                : indicator.value}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {indicator.status}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-800">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">سیگنال کلی:</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-green-400 font-medium">صعودی</span>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-400">
          بر اساس ۶ اندیکاتور اصلی
        </div>
      </div>
    </div>
  );
};

export default TechnicalIndicators;