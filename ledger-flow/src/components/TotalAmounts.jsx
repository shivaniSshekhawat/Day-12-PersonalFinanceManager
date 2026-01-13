import React, { useEffect, useState } from "react";
import { useLedgerStore } from "../../store/useLedgerStore";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const TotalAmounts = () => {
  const transactions = useLedgerStore((s) => s.transactions);
  const summaryFn = useLedgerStore((s) => s.totalSummary);

  const [summaryObj, setSummaryObj] = useState({
    totalIncome: 0,
    totalExpense: 0,
    totalBalance: 0,
  });

  useEffect(() => {
    const s = summaryFn();
    setSummaryObj({
      totalIncome: Number(s.totalIncome) || 0,
      totalExpense: Number(s.totalExpense) || 0,
      totalBalance: Number(s.totalBalance) || 0,
    });
  }, [transactions]);

  const hasData = summaryObj.totalIncome > 0 || summaryObj.totalExpense > 0;

  const data = hasData
    ? [
        { name: "Income", value: summaryObj.totalIncome },
        { name: "Expense", value: summaryObj.totalExpense },
      ]
    : [{ name: "No Data", value: 1 }];

  const COLORS = hasData ? ["#4ade80", "#f87171"] : ["#9ca3af"];

  return (
    <div className="w-full mb-10 space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">
              Total Income
            </p>
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-green-400">
            ₹{summaryObj.totalIncome.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">
              Total Expense
            </p>
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-red-400">
            ₹{summaryObj.totalExpense.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">
              Total Balance
            </p>
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            </div>
          </div>
          <h2
            className={`text-4xl font-bold ${
              summaryObj.totalBalance >= 0 ? "text-indigo-400" : "text-red-400"
            }`}
          >
            ₹{summaryObj.totalBalance.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* Chart Section */}
      <div
        className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-xl
        flex flex-col items-center relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-50" />
        <h3 className="text-xl font-semibold text-white mb-6">Cash Flow Analysis</h3>
        
        <div className="relative flex justify-center items-center">
          <PieChart width={320} height={320}>
            <Pie 
              data={data} 
              dataKey="value" 
              innerRadius={90} 
              outerRadius={130} 
              paddingAngle={5}
              stroke="none"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} className="hover:opacity-80 transition-opacity cursor-pointer" />
              ))}
            </Pie>
            {hasData && <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />}
          </PieChart>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-gray-400 text-sm uppercase tracking-widest">Balance</span>
            <span className={`text-2xl font-bold ${summaryObj.totalBalance >= 0 ? 'text-white' : 'text-red-400'}`}>
              ₹{summaryObj.totalBalance.toLocaleString()}
            </span>
          </div>
        </div>
        
        {!hasData && (
          <p className="mt-4 text-gray-500 italic">Start adding transactions to see your financial breakdown</p>
        )}
      </div>
    </div>
  );
};

export default TotalAmounts;
