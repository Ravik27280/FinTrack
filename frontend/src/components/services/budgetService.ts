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
  const res = await api.get<Budget[]>("/budgets");
  return res.data;
};

export const createBudget = async (data: NewBudget): Promise<Budget> => {
  const res = await api.post<Budget>("/budgets", data);
  return res.data;
};

export const updateBudget = async (id: string, data: Partial<NewBudget>): Promise<Budget> => {
  const res = await api.put<Budget>(`/budgets/${id}`, data);
  return res.data;
};

export const deleteBudget = async (id: string): Promise<{ message: string }> => {
  const res = await api.delete<{ message: string }>(`/budgets/${id}`);
  return res.data;
};

export const getBudgetAnalytics = async (): Promise<BudgetAnalytics> => {
  const res = await api.get<BudgetAnalytics>("/budgets/analytics");
  return res.data;
};

// Budget Goals CRUD operations
export const getBudgetGoals = async (): Promise<BudgetGoal[]> => {
  const res = await api.get<BudgetGoal[]>("/budgets/goals");
  return res.data;
};

export const createBudgetGoal = async (data: NewBudgetGoal): Promise<BudgetGoal> => {
  const res = await api.post<BudgetGoal>("/budgets/goals", data);
  return res.data;
};

export const updateBudgetGoal = async (id: string, data: Partial<NewBudgetGoal>): Promise<BudgetGoal> => {
  const res = await api.put<BudgetGoal>(`/budgets/goals/${id}`, data);
  return res.data;
};

export const deleteBudgetGoal = async (id: string): Promise<{ message: string }> => {
  const res = await api.delete<{ message: string }>(`/budgets/goals/${id}`);
  return res.data;
};