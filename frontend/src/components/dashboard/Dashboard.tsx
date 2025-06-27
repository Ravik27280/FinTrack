import React from 'react';
import { Plus } from 'lucide-react';
import { StatsCards } from './StatsCards';
import { RecentTransactions } from './RecentTransactions';
import { DonutChart } from '../charts/DonutChart';
import { LineChart } from '../charts/LineChart';
import { Card } from '../ui/Card';
import { Transaction } from '../../types';
import { expenseChartData, monthlySpendingData } from '../../data/mockData';

interface DashboardProps {
  transactions: Transaction[];
}

export const Dashboard: React.FC<DashboardProps> = ({ transactions }) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  const totalBalance = totalIncome - totalExpenses;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Welcome back! Here's your financial overview.</p>
        </div>
        <button className="md:hidden fixed bottom-20 right-4 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 z-10 backdrop-blur-md border border-white/20">
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>

      <StatsCards 
        totalBalance={totalBalance}
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Expense Breakdown</h3>
          <DonutChart data={expenseChartData} />
        </Card>

        <Card>
          <LineChart data={monthlySpendingData} />
        </Card>
      </div>

      <RecentTransactions transactions={transactions} />
    </div>
  );
};