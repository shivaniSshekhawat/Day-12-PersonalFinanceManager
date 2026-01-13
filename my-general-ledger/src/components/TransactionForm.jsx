import { Plus, Save, X, Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLedgerStore } from "../store/useLedgerStore";

const TransactionForm = () => {
  const { addTransaction, updateTransaction, editingTransaction, cancelEdit } =
    useLedgerStore();

  const [currTransaction, setCurrTransaction] = useState({
    description: "",
    amount: "",
    type: "expense",
  });

  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (editingTransaction) {
      setCurrTransaction(editingTransaction);
      setError("");
    }
  }, [editingTransaction]);

  function handleSubmit() {
    if (!currTransaction.description.trim()) {
      setError("Please add a description");
      triggerShake();
      return;
    }
    if (Number(currTransaction.amount) <= 0) {
      setError("Amount must be greater than zero");
      triggerShake();
      return;
    }

    editingTransaction
      ? updateTransaction(currTransaction)
      : addTransaction(currTransaction);

    setCurrTransaction({
      description: "",
      amount: "",
      type: "expense",
    });
    setError("");
  }

  function triggerShake() {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }

  return (
    <div
      className={`w-full bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-xl transition-all duration-300 ${shake ? 'animate-shake' : ''}`}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
          {editingTransaction ? <Pencil size={20} /> : <Plus size={24} />}
        </div>
        <h2 className="text-2xl font-bold text-white">
          {editingTransaction ? "Edit Record" : "New Transaction"}
        </h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-1">Description</label>
          <input
            className={`w-full px-5 py-3 rounded-xl bg-white/5 border text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600 ${
              error && !currTransaction.description.trim() ? "border-red-500/50" : "border-white/10"
            }`}
            placeholder="What was this for?"
            value={currTransaction.description}
            onChange={(e) => {
              setCurrTransaction({ ...currTransaction, description: e.target.value });
              if (error) setError("");
            }}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-1">Amount</label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₹</span>
            <input
              type="number"
              className={`w-full pl-10 pr-5 py-3 rounded-xl bg-white/5 border text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600 ${
                error && Number(currTransaction.amount) <= 0 ? "border-red-500/50" : "border-white/10"
              }`}
              placeholder="0.00"
              value={currTransaction.amount}
              onChange={(e) => {
                setCurrTransaction({ ...currTransaction, amount: e.target.value });
                if (error) setError("");
              }}
            />
          </div>
          {error && (
            <p className="text-red-400 text-xs font-medium px-1 animate-fadeIn flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-red-400" /> {error}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-1">Type</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setCurrTransaction({ ...currTransaction, type: "expense" })}
              className={`py-3 rounded-xl border transition-all flex items-center justify-center gap-2 font-medium ${
                currTransaction.type === "expense"
                  ? "bg-red-500/20 border-red-500/50 text-red-400"
                  : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${currTransaction.type === 'expense' ? 'bg-red-400' : 'bg-gray-600'}`} />
              Expense
            </button>
            <button
              onClick={() => setCurrTransaction({ ...currTransaction, type: "income" })}
              className={`py-3 rounded-xl border transition-all flex items-center justify-center gap-2 font-medium ${
                currTransaction.type === "income"
                  ? "bg-green-500/20 border-green-500/50 text-green-400"
                  : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${currTransaction.type === 'income' ? 'bg-green-400' : 'bg-gray-600'}`} />
              Income
            </button>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={handleSubmit}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl
            bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 
            text-white font-bold shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
          >
            {editingTransaction ? <Save size={20} /> : <Plus size={20} />}
            {editingTransaction ? "Save Changes" : "Add Transaction"}
          </button>

          {editingTransaction && (
            <button
              onClick={cancelEdit}
              className="px-6 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
