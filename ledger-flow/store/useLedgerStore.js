import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { persist, devtools } from "zustand/middleware";

export const useLedgerStore = create(
  devtools(
    persist(
      (set, get) => ({
        transactions: [],
        editingTransaction: null,

        addTransaction: (transaction) =>
          set((state) => ({
            transactions: [
              {
                id: uuidv4(),
                date: new Date().toISOString(),
                description: transaction.description,
                amount: Number(transaction.amount),
                type: transaction.type,
              },
              ...state.transactions,
            ],
          })),

        deleteTransaction: (id) =>
          set((state) => ({
            transactions: state.transactions.filter((t) => t.id !== id),
          })),

        setEditingTransaction: (transaction) =>
          set({ editingTransaction: transaction }),

        cancelEdit: () => set({ editingTransaction: null }),

        updateTransaction: (updated) =>
          set((state) => ({
            transactions: state.transactions.map((t) =>
              t.id === updated.id
                ? { ...t, ...updated, amount: Number(updated.amount) }
                : t
            ),
            editingTransaction: null,
          })),

        totalSummary: () => {
          const { transactions } = get();
          let totalIncome = 0;
          let totalExpense = 0;

          transactions.forEach((t) => {
            if (t.type === "income") totalIncome += Number(t.amount) || 0;
            else totalExpense += Number(t.amount) || 0;
          });

          return {
            totalIncome,
            totalExpense,
            totalBalance: totalIncome - totalExpense,
          };
        },
      }),
      {
        name: "ledger-flow-storage",
      }
    )
  )
);
