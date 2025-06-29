import api from "./api";
import { refreshBudgets } from "./budgetService";

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
  try {
    console.log('Fetching transactions...');
    const res = await api.get<Transaction[]>("/transactions");
    console.log('Transactions response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const addTransaction = async (data: NewTransaction): Promise<Transaction> => {
  try {
    console.log('Adding transaction:', data);
    const res = await api.post<Transaction>("/transactions", data);
    console.log('Add transaction response:', res.data);
    
    // Refresh budgets after adding transaction to update spending
    try {
      await refreshBudgets();
      console.log('Budgets refreshed after transaction addition');
    } catch (refreshError) {
      console.warn('Failed to refresh budgets after transaction addition:', refreshError);
    }
    
    return res.data;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};

export const updateTransaction = async (id: string, data: Partial<NewTransaction>): Promise<Transaction> => {
  try {
    console.log('Updating transaction:', id, data);
    const res = await api.put<Transaction>(`/transactions/${id}`, data);
    console.log('Update transaction response:', res.data);
    
    // Refresh budgets after updating transaction to update spending
    try {
      await refreshBudgets();
      console.log('Budgets refreshed after transaction update');
    } catch (refreshError) {
      console.warn('Failed to refresh budgets after transaction update:', refreshError);
    }
    
    return res.data;
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};

export const deleteTransaction = async (id: string): Promise<{ message: string }> => {
  try {
    console.log('Deleting transaction:', id);
    const res = await api.delete<{ message: string }>(`/transactions/${id}`);
    console.log('Delete transaction response:', res.data);
    
    // Refresh budgets after deleting transaction to update spending
    try {
      await refreshBudgets();
      console.log('Budgets refreshed after transaction deletion');
    } catch (refreshError) {
      console.warn('Failed to refresh budgets after transaction deletion:', refreshError);
    }
    
    return res.data;
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};