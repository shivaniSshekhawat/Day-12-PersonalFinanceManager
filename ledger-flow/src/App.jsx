import React from "react";
import TotalAmounts from "./components/TotalAmounts";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-6 md:p-10 font-sans selection:bg-indigo-500/30">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-2">
            My General Ledger
          </h1>
          <p className="text-gray-400 tracking-widest uppercase text-xs font-medium">
            Personal Finance Manager
          </p>
        </header>

        <TotalAmounts />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <TransactionForm />
          <TransactionList />
        </div>
      </div>
    </div>
  );
};

export default App;
