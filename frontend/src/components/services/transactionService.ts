import api from "./api";

// Define the shape of a transaction
export interface Transaction {
  _id?: string;
  id?: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: Date | string;
  note?: string;
  userId?: string;
}

// For adding a transaction (might not include `id`)
export type NewTransaction = Omit<Transaction, "id" | "_id" | "userId">;

export const getTransactions = async (): Promise<Transaction[]> => {
  const res = await api.get<Transaction[]>("/transactions");
  return res.data;
};

export const addTransaction = async (data: NewTransaction): Promise<Transaction> => {
  const res = await api.post<Transaction>("/transactions", data);
  return res.data;
};

export const updateTransaction = async (id: string, data: Partial<NewTransaction>): Promise<Transaction> => {
  const res = await api.put<Transaction>(`/transactions/${id}`, data);
  return res.data;
};

export const deleteTransaction = async (id: string): Promise<{ message: string }> => {
  const res = await api.delete<{ message: string }>(`/transactions/${id}`);
  return res.data;
};