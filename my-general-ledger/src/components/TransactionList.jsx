import React from "react";
import { Trash2, Pencil } from "lucide-react";
import { useLedgerStore } from "../store/useLedgerStore";

const TransactionList = () => {
  const { transactions, deleteTransaction, setEditingTransaction } =
    useLedgerStore();

  const isEmpty = transactions.length === 0;

  return (
    <div
      className="w-full bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-xl transition-all duration-300 min-h-[500px] flex flex-col"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
        <span className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-500/20">
          {transactions.length} {transactions.length === 1 ? 'Record' : 'Records'}
        </span>
      </div>

      <div className="flex-1 space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {isEmpty ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
              <div className="w-10 h-10 text-gray-600">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <p className="text-gray-400 text-lg font-medium">No transactions found</p>
            <p className="text-gray-600 text-sm max-w-[200px]">Recording your first transaction to get started.</p>
          </div>
        ) : (
          transactions.map((t) => (
            <div
              key={t.id}
              className="group flex items-center justify-between bg-white/5
              border border-white/10 rounded-2xl px-5 py-4 hover:bg-white/10 transition-all border-l-4"
              style={{ borderLeftColor: t.type === "income" ? "#4ade80" : "#f87171" }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  t.type === "income" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                }`}>
                  {t.type === "income" ? "↑" : "↓"}
                </div>
                <div>
                  <p className="text-white font-bold group-hover:text-indigo-400 transition-colors">{t.description}</p>
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-tighter">
                    {new Date(t.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p
                    className={`text-lg font-black ${
                      t.type === "income" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}₹{t.amount.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2 transition-opacity">
                  <button 
                    onClick={() => setEditingTransaction(t)}
                    className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all"
                  >
                    <Pencil size={16} />
                  </button>
                  <button 
                    onClick={() => deleteTransaction(t.id)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;
