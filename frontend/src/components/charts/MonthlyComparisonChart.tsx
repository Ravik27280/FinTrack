import React from 'react';
import { Transaction } from '../services/transactionService';

interface MonthlyComparisonChartProps {
  transactions: Transaction[];
  title?: string;
}

interface MonthData {
  month: string;
  income: number;
  expense: number;
  net: number;
  date: Date;
}

export const MonthlyComparisonChart: React.FC<MonthlyComparisonChartProps> = ({
  transactions,
  title = "Monthly Income vs Expenses"
}) => {
  const generateMonthlyData = (): MonthData[] => {
    const now = new Date();
    const data: MonthData[] = [];
    
    // Last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);
      
      const monthTransactions = transactions.filter(t => {
        const tDate = new Date(t.date);
        return tDate.getMonth() === date.getMonth() && 
               tDate.getFullYear() === date.getFullYear();
      });
      
      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
      const expense = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
      data.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        income,
        expense,
        net: income - expense,
        date
      });
    }
    
    return data;
  };

  const monthlyData = generateMonthlyData();
  const maxValue = Math.max(
    ...monthlyData.map(d => Math.max(d.income, d.expense))
  );
  
  const width = 600;
  const height = 300;
  const padding = 60;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const barWidth = chartWidth / (monthlyData.length * 3);
  
  const getY = (value: number) => {
    return padding + chartHeight - (value / maxValue) * chartHeight;
  };
  
  const getX = (index: number, barIndex: number) => {
    return padding + (index * chartWidth / monthlyData.length) + (barIndex * barWidth) + barWidth / 2;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      
      <div className="relative">
        <svg width={width} height={height} className="overflow-visible">
          <defs>
            <linearGradient id="incomeBarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="expenseBarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
            
            <pattern id="comparisonGrid" width="40" height="30" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 30" fill="none" stroke="rgba(156, 163, 175, 0.2)" strokeWidth="1"/>
            </pattern>
          </defs>

          {/* Grid background */}
          <rect width={width} height={height} fill="url(#comparisonGrid)" />

          {/* Bars */}
          {monthlyData.map((data, index) => {
            const incomeHeight = (data.income / maxValue) * chartHeight;
            const expenseHeight = (data.expense / maxValue) * chartHeight;
            
            return (
              <g key={index}>
                {/* Income bar */}
                <rect
                  x={getX(index, 0)}
                  y={getY(data.income)}
                  width={barWidth * 0.8}
                  height={incomeHeight}
                  fill="url(#incomeBarGradient)"
                  rx="4"
                  className="hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                />
                
                {/* Expense bar */}
                <rect
                  x={getX(index, 1)}
                  y={getY(data.expense)}
                  width={barWidth * 0.8}
                  height={expenseHeight}
                  fill="url(#expenseBarGradient)"
                  rx="4"
                  className="hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                />
                
                {/* Income value label */}
                <text
                  x={getX(index, 0) + (barWidth * 0.4)}
                  y={getY(data.income) - 5}
                  textAnchor="middle"
                  className="text-xs fill-gray-600 dark:fill-gray-400"
                >
                  ${(data.income / 1000).toFixed(0)}k
                </text>
                
                {/* Expense value label */}
                <text
                  x={getX(index, 1) + (barWidth * 0.4)}
                  y={getY(data.expense) - 5}
                  textAnchor="middle"
                  className="text-xs fill-gray-600 dark:fill-gray-400"
                >
                  ${(data.expense / 1000).toFixed(0)}k
                </text>
                
                {/* Month label */}
                <text
                  x={getX(index, 0.5) + (barWidth * 0.4)}
                  y={height - 10}
                  textAnchor="middle"
                  className="text-sm fill-gray-700 dark:fill-gray-300 font-medium"
                >
                  {data.month}
                </text>
                
                {/* Net value */}
                <text
                  x={getX(index, 0.5) + (barWidth * 0.4)}
                  y={height - 25}
                  textAnchor="middle"
                  className={`text-xs font-medium ${
                    data.net >= 0 
                      ? 'fill-green-600 dark:fill-green-400' 
                      : 'fill-red-600 dark:fill-red-400'
                  }`}
                >
                  {data.net >= 0 ? '+' : ''}${(data.net / 1000).toFixed(1)}k
                </text>
              </g>
            );
          })}

          {/* Y-axis labels */}
          {[0, maxValue * 0.25, maxValue * 0.5, maxValue * 0.75, maxValue].map((value, index) => (
            <text
              key={index}
              x={padding - 10}
              y={getY(value)}
              textAnchor="end"
              className="text-xs fill-gray-600 dark:fill-gray-400"
              dominantBaseline="middle"
            >
              ${(value / 1000).toFixed(0)}k
            </text>
          ))}
        </svg>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Income</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Expenses</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-2 bg-gray-400 rounded"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Net</span>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="text-center p-3 bg-green-50 dark:bg-green-500/20 rounded-xl">
          <p className="text-sm text-green-600 dark:text-green-400">Avg Income</p>
          <p className="text-lg font-semibold text-green-700 dark:text-green-300">
            ${(monthlyData.reduce((sum, d) => sum + d.income, 0) / monthlyData.length).toLocaleString()}
          </p>
        </div>
        <div className="text-center p-3 bg-red-50 dark:bg-red-500/20 rounded-xl">
          <p className="text-sm text-red-600 dark:text-red-400">Avg Expenses</p>
          <p className="text-lg font-semibold text-red-700 dark:text-red-300">
            ${(monthlyData.reduce((sum, d) => sum + d.expense, 0) / monthlyData.length).toLocaleString()}
          </p>
        </div>
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-500/20 rounded-xl">
          <p className="text-sm text-blue-600 dark:text-blue-400">Best Month</p>
          <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
            {monthlyData.reduce((best, current) => current.net > best.net ? current : best).month}
          </p>
        </div>
        <div className="text-center p-3 bg-purple-50 dark:bg-purple-500/20 rounded-xl">
          <p className="text-sm text-purple-600 dark:text-purple-400">Total Net</p>
          <p className={`text-lg font-semibold ${
            monthlyData.reduce((sum, d) => sum + d.net, 0) >= 0
              ? 'text-green-700 dark:text-green-300'
              : 'text-red-700 dark:text-red-300'
          }`}>
            ${monthlyData.reduce((sum, d) => sum + d.net, 0).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};