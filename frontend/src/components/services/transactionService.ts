import api from "./api";

// Define the shape of a transaction
export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  type: "income" | "expense";
  // Add any other relevant fields
}

// For adding a transaction (might not include `id`)
export type NewTransaction = Omit<Transaction, "id">;

export const getTransactions = async (): Promise<Transaction[]> => {
  const res = await api.get<Transaction[]>("/transactions");
  return res.data;
};

export const addTransaction = async (data: NewTransaction): Promise<Transaction> => {
  const res = await api.post<Transaction>("/transactions", data);
  return res.data;
};

export const deleteTransaction = async (id: string): Promise<{ success: boolean; message?: string }> => {
  const res = await api.delete<{ success: boolean; message?: string }>(`/transactions/${id}`);
  return res.data;
};
