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
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <TrendingUp className="w-5 h-5 text-yellow-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const totalBudgeted = budgetItems.reduce((sum, item) => sum + item.budgeted, 0);
  const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Budget Overview</h1>
          <p className="text-gray-600">Track your spending against your budget goals.</p>
        </div>
        <Button>Add Category</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 mb-2">Total Budgeted</p>
            <p className="text-2xl font-bold text-gray-900">${totalBudgeted.toLocaleString()}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 mb-2">Total Spent</p>
            <p className="text-2xl font-bold text-gray-900">${totalSpent.toLocaleString()}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 mb-2">Remaining</p>
            <p className={`text-2xl font-bold ${
              totalBudgeted - totalSpent >= 0 ? 'text-green-600' : 'text-red-600'
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
            <Card key={item.id}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <h3 className="font-semibold text-gray-900">{item.category}</h3>
                </div>
                {getStatusIcon(status)}
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Spent</span>
                  <span className="font-medium">${item.spent.toLocaleString()}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      status === 'over' ? 'bg-red-500' :
                      status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Budget</span>
                  <span className="font-medium">${item.budgeted.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className={`text-sm font-medium ${
                    status === 'over' ? 'text-red-600' :
                    status === 'warning' ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {percentage.toFixed(1)}% used
                  </span>
                  <span className="text-sm text-gray-600">
                    ${(item.budgeted - item.spent).toLocaleString()} remaining
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
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