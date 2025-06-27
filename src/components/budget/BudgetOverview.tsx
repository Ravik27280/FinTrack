import React from 'react';
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { BudgetItem } from '../../types';

interface BudgetOverviewProps {
  budgetItems: BudgetItem[];
}

export const BudgetOverview: React.FC<BudgetOverviewProps> = ({ budgetItems }) => {
  const getBudgetStatus = (spent: number, budgeted: number) => {
    const percentage = (spent / budgeted) * 100;
    if (percentage >= 100) return 'over';
    if (percentage >= 80) return 'warning';
    return 'good';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'over':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <TrendingUp className="w-5 h-5 text-yellow-400" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-400" />;
    }
  };

  const totalBudgeted = budgetItems.reduce((sum, item) => sum + item.budgeted, 0);
  const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Budget Overview</h1>
          <p className="text-gray-600 dark:text-gray-300">Track your spending against your budget goals.</p>
        </div>
        <Button>Add Category</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Total Budgeted</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalBudgeted.toLocaleString()}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Total Spent</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalSpent.toLocaleString()}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Remaining</p>
            <p className={`text-2xl font-bold ${
              totalBudgeted - totalSpent >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              ${Math.abs(totalBudgeted - totalSpent).toLocaleString()}
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgetItems.map((item) => {
          const percentage = Math.min((item.spent / item.budgeted) * 100, 100);
          const status = getBudgetStatus(item.spent, item.budgeted);
          
          return (
            <Card key={item.id} className="hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full shadow-lg" 
                    style={{ backgroundColor: item.color }}
                  />
                  <h3 className="font-semibold text-gray-900 dark:text-white">{item.category}</h3>
                </div>
                {getStatusIcon(status)}
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Spent</span>
                  <span className="font-medium text-gray-900 dark:text-white">${item.spent.toLocaleString()}</span>
                </div>
                
                <div className="w-full bg-white/20 dark:bg-white/10 rounded-full h-2 backdrop-blur-md">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      status === 'over' ? 'bg-red-500' :
                      status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Budget</span>
                  <span className="font-medium text-gray-900 dark:text-white">${item.budgeted.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className={`text-sm font-medium ${
                    status === 'over' ? 'text-red-400' :
                    status === 'warning' ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    {percentage.toFixed(1)}% used
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ${(item.budgeted - item.spent).toLocaleString()} remaining
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <Button variant="glass" size="sm" className="flex-1">
                  Adjust Budget
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  View Details
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};