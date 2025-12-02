import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getbalances, history, market, price } from "../../server/admin";
import { Divider } from "@heroui/divider";
import { useState } from "react";

export default function Home() {
  // const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getBalance"],
    queryFn: getbalances,
  });


  const priceData = useQuery({
    queryKey: ["getPrice"],
    queryFn: price,
  });


  const historyData = useQuery({
    queryKey: ["getHistory"],
    queryFn: history,
  });


  const marketState = useQuery({
    queryKey: ["getMarket"],
    queryFn: market,
  });

  let queryPrice: any;

  let Histories: any;

  let marketStateData: any;

  if (historyData.isFetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-blue-400">Loading balances...</div>
      </div>
    );
  }

  let marketStateFinal = { state: 0, marketStatus: 'bearish', totalBalance: 0, activeCurrencies: 0, priceChange: 0, rsi: 0 }

  if (marketState.isSuccess) {
    marketStateData = marketState.data.data
    console.log('its hereeasasaasas', marketStateData)
    marketStateFinal = { state: marketStateData[0].state, marketStatus: (((+marketStateData[0].totalBalance) - (+marketStateData[marketStateData.length - 1].totalBalance)) / (+marketStateData[marketStateData.length - 1].totalBalance)) * 100 > 0 ? 'bullish' : 'bearish', totalBalance: +marketStateData[0].totalBalance, activeCurrencies: marketStateData[0].currencies, priceChange: (((+marketStateData[0].totalBalance) - (+marketStateData[marketStateData.length - 1].totalBalance)) / (+marketStateData[marketStateData.length - 1].totalBalance)) * 100, rsi: marketStateData[0].rsi }
    console.log('its done', marketStateData)
  }

  if (historyData.isSuccess) {
    Histories = historyData.data.data
  }

  if (priceData.isFetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-blue-400">Loading balances...</div>
      </div>
    );
  }

  if (priceData.isSuccess) {
    queryPrice = priceData.data.data
    console.log('check the api222>>>', queryPrice.data);
  }

  // Add loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-blue-400">Loading balances...</div>
      </div>
    );
  }


  // Add error state
  if (isError) {
    console.error('Error fetching balances:', error);
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-400">Error loading balances</div>
      </div>
    );
  }

  // Check if data exists and is an array
  if (!data || !Array.isArray(data)) {
    console.log('Data is not an array or is empty:', data);
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">No balance data available</div>
      </div>
    );
  }

  return (
    // <div className="p-6">



    <div className="p-6">
      {/* Market State Card - Always Visible */}
      <div className="mb-8">


        <div className={`relative overflow-hidden rounded-2xl p-6 border-2 backdrop-blur-sm ${marketStateFinal.marketStatus === 'bullish'
            ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30'
            : marketStateFinal.marketStatus === 'bearish'
              ? 'bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/30'
              : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30'
          }`}>
          {/* Market Status Indicator */}
          <div className="mt-4 w-full md:mt-0 flex items-center space-x-2">
            <div className={`w-full flex font-bold text-xl flex-row h-3  rounded-full justify-center text-green-400 text-center animate-pulse`}>

              {`STEP ${marketStateFinal.state}`}

            </div>
          </div>
          <Divider className="py-2 mt-5"></Divider>

          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full animate-pulse ${marketStateFinal.marketStatus === 'bullish'
                ? 'bg-green-400'
                : marketStateFinal.marketStatus === 'bearish'
                  ? 'bg-red-400'
                  : 'bg-blue-400'
              }`}></div>
            <span className={`font-semibold ${marketStateFinal.marketStatus === 'bullish'
                ? 'text-green-400'
                : marketStateFinal.marketStatus === 'bearish'
                  ? 'text-red-400'
                  : 'text-blue-400'
              }`}>
              {marketStateFinal.marketStatus === 'bullish' ? 'Bull Market' :
                marketStateFinal.marketStatus === 'bearish' ? 'Bear Market' : 'Market Stable'}
            </span>
          </div>

          <Divider className="py-2 mt-2"></Divider>

          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>

          <div className="flex flex-col md:flex-row justify-between items-center">

            <div className="text-center md:text-left mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-white mb-2">
                Market Overview
              </h2>
              <p className="text-gray-300">
                Real-time portfolio status
              </p>
            </div>
            <Divider className="lg:hidden md:hidden py-2"></Divider>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
              {/* Total Balance */}
              <div className="flex flex-col items-center">
                <span className="text-gray-400 text-sm mb-1">Total Balance</span>
                <span className="text-xl font-bold text-white">
                  ${marketStateFinal.totalBalance.toFixed(2)}
                </span>
              </div>
              <Divider className="lg:hidden md:hidden py-2 mt-2"></Divider>

              <div className="flex flex-col  items-center">
                <span className="text-gray-400 text-sm mb-1">RSI</span>
                <span className="text-xl font-bold text-white">
                  {(+marketStateFinal.rsi).toFixed(2)}
                </span>
              </div>
              <Divider className="lg:hidden md:hidden"></Divider>
              {/* Active Currencies */}
              <div className="flex flex-col items-center">
                <span className="text-gray-400 text-sm mb-1">Currencies</span>
                <span className="text-xl font-bold text-blue-400">
                  {marketStateFinal.activeCurrencies}
                </span>
              </div>
              {/* <div className="flex flex-col items-center">
              </div> */}
              <Divider className="lg:hidden md:hidden"></Divider>
              {/* Price Change */}
              <div className="flex flex-col items-center">
                <span className="text-gray-400 text-sm mb-1">24h Change</span>
                <span className={`text-4xl font-bold  ${marketStateFinal.priceChange > 0
                    ? 'text-green-400'
                    : marketStateFinal.priceChange < 0
                      ? 'text-red-400'
                      : 'text-gray-400'
                  }`}>
                  {marketStateFinal.priceChange > 0 ? '+' : ''} {marketStateFinal.priceChange.toFixed(4)}%
                </span>
              </div>

              <Divider className="lg:hidden md:hidden"></Divider>
            </div>

          </div>

          {/* Progress bar for visual indicator */}
          <div className="mt-4 w-full bg-gray-700/50 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${marketStateFinal.marketStatus === 'bullish'
                  ? 'bg-gradient-to-r from-green-400 to-emerald-400'
                  : marketStateFinal.marketStatus === 'bearish'
                    ? 'bg-gradient-to-r from-red-400 to-orange-400'
                    : 'bg-gradient-to-r from-blue-400 to-purple-400'
                }`}
              style={{
                width: `${Math.min(Math.abs(marketStateFinal.priceChange) * 10, 100)}%`
              }}
            ></div>
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-blue-400 mb-6">Wallet Balances</h1>
      {data.length === 0 ? (
        <div className="text-gray-400 text-center py-8">
          No balances found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item: any, index: number) => (
            <div key={index} className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              {/* Display the raw item first to see what you're getting */}
              {/* <h1 className="text-sm text-gray-400 mb-4"> */}
              {/* {JSON.stringify(item, null, 2)} */}
              {/* </h1> */}

              {/* If item is an object with properties */}
              {typeof item === 'object' && item !== null && (
                <div className="space-y-2">
                  {Object.entries(item).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-400 capitalize">{key}:</span>
                      {key == 'BTC' && (
                        <span className={`font-bold text-xl ${(+queryPrice[queryPrice.length - 1] > +queryPrice[queryPrice.length - 2]) ? 'text-green-400 rounded-xl border border-green-400 p-2 shadow-3xl' : 'text-red-400 rounded-xl border border-red-400 p-2 shadow-3xl'}`}>{
                          String(queryPrice[queryPrice.length - 1])} $</span>
                      )}
                      <span className={`font-bold text-xl ${(+value?.balance > 0 && key != 'RLS') ? 'text-green-400 rounded-xl border border-green-400 p-2 shadow-3xl' : 'text-red-400 rounded-xl border border-red-400 p-2 shadow-3xl'}`}>{
                        String(value?.balance)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="py-10">
        <Divider ></Divider>
        <h1 className="text-2xl py-8 font-bold text-blue-400 mb-6 text-center">TransActions History</h1>
        {Histories && Histories.length ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
              {Histories.map((history: any, index: number) => (
                <div key={index} className="bg-gray-900/50 rounded-3xl p-6 border border-gray-800 hover:border-red-800 transition-all duration-600">
                  <div className="space-y-6">
                    {/* Transaction Type */}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Type:</span>
                      <span className={`font-bold ${history.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                        {history.type?.toUpperCase()}
                      </span>
                    </div>
                    <Divider></Divider>
                    {/* Currency */}
                    <div className="flex justify-between">
                      <span className="text-gray-400">Currency:</span>
                      <span className="text-white font-medium">{history.currency}</span>
                    </div>
                    <Divider></Divider>

                    {/* Amount */}
                    <div className="flex justify-between">
                      <span className="text-gray-400">Amount:</span>
                      <span className="text-white font-bold">{history.amount}</span>
                    </div>
                    <Divider></Divider>

                    {/* Price
                    {history.price && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Price:</span>
                        <span className="text-white">${history.price}</span>
                      </div>
                    )} */}

                    {/* Date */}
                    {history.created_at && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Date:</span>
                        <span className="text-gray-300 text-sm">{new Date(history.created_at).toLocaleString('fa-IR')}</span>
                      </div>
                    )}
                    <Divider></Divider>

                    {/* Status */}
                    {history.description && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">description:</span>
                        <span className={`px-2 py-1 rounded text-xs ${(history.description.includes('خرید') || history.description.includes('واریز')) ? 'bg-green-500/20 text-green-400' :
                          history.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                          {history.description}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (<>
          <div className="text-gray-400 text-center py-8">
            No history founded !
          </div>
        </>)}
      </div>
    </div>
  );
}