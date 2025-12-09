import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart,
  Shield,
  Zap,
  BarChart3,
  ArrowRight,
  Coins,
  Wallet,
  History,
  Globe
} from "lucide-react";
import { getbalances, history, market, price } from "../../server/admin";
import { Navigate, useNavigate } from "react-router";


export default function LandingPage() {
    // State for animated counters
    const [counterValues, setCounterValues] = useState({
        totalBalance: 0,
        activeCurrencies: 0,
        priceChange: 0
    });
    const navigate = useNavigate();

  // API Queries
  const { data: balanceData, isLoading: balanceLoading } = useQuery({
    queryKey: ["getBalance"],
    queryFn: getbalances,
  });

  const { data: priceData } = useQuery({
    queryKey: ["getPrice"],
    queryFn: price,
  });

  const { data: historyData } = useQuery({
    queryKey: ["getHistory"],
    queryFn: history,
  });

  const { data: marketState } = useQuery({
    queryKey: ["getMarket"],
    queryFn: market,
  });

  // Calculate market stats
  const calculateMarketStats = () => {
    if (!marketState?.data?.data?.length) return null;
    
    const marketData = marketState.data.data[0];
    const totalBalance = +marketData.totalBalance || 0;
    const previousBalance = +marketState.data.data[marketState.data.data.length - 1]?.totalBalance || 0;
    const priceChange = previousBalance ? ((totalBalance - previousBalance) / previousBalance) * 100 : 0;
    
    return {
      isBullish: priceChange > 0,
      totalBalance,
      activeCurrencies: marketData.currencies || 0,
      priceChange: Math.abs(priceChange),
      rsi: +marketData.rsi || 50,
      marketStatus: priceChange > 0 ? 'bullish' : 'bearish'
    };
  };

  const marketStats = calculateMarketStats();

  // Hero Section
  const HeroSection = () => (
    <div className="relative overflow-hidden min-h-screen flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-black"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Zap className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-blue-400 text-sm">Real-time Trading Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Smart Trading
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Made Simple
              </span>
            </h1>
            
            <p className="text-gray-300 text-lg mb-8 max-w-lg">
              Advanced algorithmic trading platform with real-time market analysis, 
              automated strategies, and comprehensive portfolio management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
              onClick={()=>{
                    navigate("/signin")
                }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:opacity-90 transition-all transform hover:scale-105">
                Start Trading Now
              </button>
              <button 
              onClick={()=>{
                    navigate("/signin")
                }}
              className="px-8 py-3 border border-gray-700 rounded-full font-semibold hover:bg-white/5 transition-all">
                View Demo
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-1">
              <div className="bg-gray-900 rounded-3xl p-6">
                {/* Animated Chart Preview */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-gray-300">Live Portfolio</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full ${marketStats?.isBullish ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {marketStats?.isBullish ?  priceData?.data[priceData?.data?.length - 1] - priceData?.data[0] > 0 ? (((priceData?.data[priceData?.data?.length - 1] - priceData?.data[0]) / priceData?.data[priceData?.data?.length - 1] )* 100).toFixed(3) : (((priceData?.data[priceData?.data?.length - 1] - priceData?.data[0]) / priceData?.data[0] )* 100).toFixed(3) : priceData?.data[priceData?.data?.length - 1] - priceData?.data[0] > 0 ? (((priceData?.data[priceData?.data?.length - 1] - priceData?.data[0]) / priceData?.data[priceData?.data?.length - 1] )* 100 ).toFixed(3): (((priceData?.data[priceData?.data?.length - 1] - priceData?.data[0]) / priceData?.data[0] )* 100).toFixed(3)  } Today
                    </div>
                  </div>
                  
                  {/* Simplified Chart */}
                  <div className="h-48 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                    <svg viewBox="0 0 400 200" className="w-full h-full">
                      <path
                        d="M0,150 Q100,50 200,100 Q300,150 400,50"
                        fill="none"
                        stroke={marketStats?.isBullish ? "#10B981" : "#EF4444"}
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <div className="text-gray-400 text-sm mb-1">Total Balance</div>
                    <div className="text-2xl font-bold text-white">${marketStats?.totalBalance.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <div className="text-gray-400 text-sm mb-1">Active Pairs</div>
                    <div className="text-2xl font-bold text-blue-400">{marketStats?.activeCurrencies}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );

  // Features Section
  const FeaturesSection = () => (
    <div className="py-20 bg-black/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need for successful trading in one platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:-translate-y-2">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  // Stats Section
  const StatsSection = () => (
    <div className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-pink-900/10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  // CTA Section
  const CTASection = () => (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-gray-900 rounded-3xl p-12">
              <h2 className="text-4xl font-bold mb-4">Ready to Start Trading?</h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of traders who trust our platform for their automated trading needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                onClick={()=>{
                    navigate("/signin")
                }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-lg hover:opacity-90 transition-all transform hover:scale-105">
                  Create Free Account
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </button>
                <button 
                onClick={()=>{
                    navigate("/signin")
                }
                }
                className="px-8 py-4 border border-gray-700 rounded-full font-semibold text-lg hover:bg-white/5 transition-all">
                  Schedule a Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </div>
  );
}

// Features data
const features = [
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Live market data with advanced charting tools and technical indicators"
  },
  {
    icon: Shield,
    title: "Secure Trading",
    description: "Bank-level security with multi-factor authentication and cold storage"
  },
  {
    icon: Zap,
    title: "Auto Trading",
    description: "Algorithmic trading with customizable strategies and risk management"
  },
  {
    icon: Wallet,
    title: "Portfolio Management",
    description: "Comprehensive portfolio tracking and performance analytics"
  },
  {
    icon: Coins,
    title: "Multi-exchange",
    description: "Trade across multiple exchanges from a single interface"
  },
  {
    icon: History,
    title: "History & Reports",
    description: "Detailed transaction history and comprehensive reporting"
  }
];

// Stats data
const stats = [
  { value: "24/7", label: "Market Monitoring" },
  { value: "99.9%", label: "Uptime" },
  { value: "50+", label: "Trading Pairs" },
//   { value: "10K+", label: "Active Traders" }
];