import api from "./api";

export interface Budget {
  _id?: string;
  id?: string;
  name: string;
  category: string;
  budgetedAmount: number;
  spentAmount: number;
  period: "weekly" | "monthly" | "quarterly" | "yearly";
  startDate: Date | string;
  endDate: Date | string;
  alertThreshold: number;
  isActive: boolean;
  color: string;
  description?: string;
  tags?: string[];
  rollover?: boolean;
  userId?: string;
}

export interface BudgetGoal {
  _id?: string;
  id?: string;
  title: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date | string;
  category: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "active" | "completed" | "paused" | "cancelled";
  color: string;
  isRecurring: boolean;
  recurringPeriod?: "weekly" | "monthly" | "quarterly" | "yearly";
  userId?: string;
}

export interface BudgetAnalytics {
  totalBudgeted: number;
  totalSpent: number;
  budgetsOverLimit: number;
  budgetsNearLimit: number;
  categoryBreakdown: Record<string, {
    budgeted: number;
    spent: number;
    percentage: number;
  }>;
  monthlyTrend: Array<{
    month: string;
    budgeted: number;
    spent: number;
  }>;
}

export type NewBudget = Omit<Budget, "id" | "_id" | "userId" | "spentAmount">;
export type NewBudgetGoal = Omit<BudgetGoal, "id" | "_id" | "userId">;

// Budget CRUD operations
export const getBudgets = async (): Promise<Budget[]> => {
  try {
    console.log('Fetching budgets...');
    const res = await api.get<Budget[]>("/budgets");
    console.log('Budgets response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching budgets:', error);
    throw error;
  }
};

export const createBudget = async (data: NewBudget): Promise<Budget> => {
  try {
    console.log('Creating budget:', data);
    const res = await api.post<Budget>("/budgets", data);
    console.log('Create budget response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error creating budget:', error);
    throw error;
  }
};

export const updateBudget = async (id: string, data: Partial<NewBudget>): Promise<Budget> => {
  try {
    console.log('Updating budget:', id, data);
    const res = await api.put<Budget>(`/budgets/${id}`, data);
    console.log('Update budget response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error updating budget:', error);
    throw error;
  }
};

export const deleteBudget = async (id: string): Promise<{ message: string }> => {
  try {
    console.log('Deleting budget:', id);
    const res = await api.delete<{ message: string }>(`/budgets/${id}`);
    console.log('Delete budget response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error deleting budget:', error);
    throw error;
  }
};

export const getBudgetAnalytics = async (): Promise<BudgetAnalytics> => {
  try {
    console.log('Fetching budget analytics...');
    const res = await api.get<BudgetAnalytics>("/budgets/analytics");
    console.log('Budget analytics response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching budget analytics:', error);
    throw error;
  }
};

// Budget Goals CRUD operations
export const getBudgetGoals = async (): Promise<BudgetGoal[]> => {
  try {
    console.log('Fetching budget goals...');
    const res = await api.get<BudgetGoal[]>("/budgets/goals");
    console.log('Budget goals response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching budget goals:', error);
    throw error;
  }
};

export const createBudgetGoal = async (data: NewBudgetGoal): Promise<BudgetGoal> => {
  try {
    console.log('Creating budget goal:', data);
    const res = await api.post<BudgetGoal>("/budgets/goals", data);
    console.log('Create budget goal response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error creating budget goal:', error);
    throw error;
  }
};

export const updateBudgetGoal = async (id: string, data: Partial<NewBudgetGoal>): Promise<BudgetGoal> => {
  try {
    console.log('Updating budget goal:', id, data);
    const res = await api.put<BudgetGoal>(`/budgets/goals/${id}`, data);
    console.log('Update budget goal response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error updating budget goal:', error);
    throw error;
  }
};

export const deleteBudgetGoal = async (id: string): Promise<{ message: string }> => {
  try {
    console.log('Deleting budget goal:', id);
    const res = await api.delete<{ message: string }>(`/budgets/goals/${id}`);
    console.log('Delete budget goal response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error deleting budget goal:', error);
    throw error;
  }
};

// Force refresh budgets (useful after transaction changes)
export const refreshBudgets = async (): Promise<Budget[]> => {
  try {
    console.log('Force refreshing budgets...');
    // Add a timestamp to force cache refresh
    const res = await api.get<Budget[]>(`/budgets?refresh=${Date.now()}`);
    console.log('Refreshed budgets response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error refreshing budgets:', error);
    throw error;
  }
};