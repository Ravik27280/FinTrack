import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface DataPoint {
  date: string;
  income: number;
  expense: number;
  balance: number;
}

interface AdvancedLineChartProps {
  data: DataPoint[];
  height?: number;
  showBalance?: boolean;
  title?: string;
}

export const AdvancedLineChart: React.FC<AdvancedLineChartProps> = ({ 
  data, 
  height = 300, 
  showBalance = true,
  title = "Financial Trend"
}) => {
  if (!data || data.length === 0) return null;

  const maxIncome = Math.max(...data.map(d => d.income));
  const maxExpense = Math.max(...data.map(d => Math.abs(d.expense)));
  const maxBalance = Math.max(...data.map(d => Math.abs(d.balance)));
  const minBalance = Math.min(...data.map(d => d.balance));
  
  const maxValue = Math.max(maxIncome, maxExpense, maxBalance);
  const minValue = Math.min(0, minBalance);
  const range = maxValue - minValue;
  
  const width = 600;
  const padding = 60;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  
  const getY = (value: number) => {
    return padding + chartHeight - ((value - minValue) / range) * chartHeight;
  };
  
  const getX = (index: number) => {
    return padding + (index / (data.length - 1)) * chartWidth;
  };

  const incomePoints = data.map((item, index) => ({
    x: getX(index),
    y: getY(item.income),
    value: item.income,
    date: item.date
  }));

  const expensePoints = data.map((item, index) => ({
    x: getX(index),
    y: getY(Math.abs(item.expense)),
    value: Math.abs(item.expense),
    date: item.date
  }));

  const balancePoints = data.map((item, index) => ({
    x: getX(index),
    y: getY(item.balance),
    value: item.balance,
    date: item.date
  }));

  const createPath = (points: typeof incomePoints) => {
    return points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ');
  };

  const createArea = (points: typeof incomePoints) => {
    const pathData = createPath(points);
    const firstPoint = points[0];
    const lastPoint = points[points.length - 1];
    return `${pathData} L ${lastPoint.x} ${getY(0)} L ${firstPoint.x} ${getY(0)} Z`;
  };

  const latestData = data[data.length - 1];
  const previousData = data[data.length - 2];
  const balanceChange = latestData && previousData ? latestData.balance - previousData.balance : 0;
  const balanceChangePercent = previousData && previousData.balance !== 0 
    ? ((balanceChange / Math.abs(previousData.balance)) * 100).toFixed(1)
    : '0';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {latestData && (
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1 text-sm ${
              balanceChange >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'
            }`}>
              {balanceChange >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{balanceChangePercent}%</span>
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <svg width={width} height={height} className="overflow-visible">
          <defs>
            <linearGradient id="incomeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="expenseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="balanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
            </linearGradient>
            
            {/* Grid pattern */}
            <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 30" fill="none" stroke="rgba(156, 163, 175, 0.2)" strokeWidth="1"/>
            </pattern>
          </defs>

          {/* Grid background */}
          <rect width={width} height={height} fill="url(#grid)" />

          {/* Zero line */}
          <line
            x1={padding}
            y1={getY(0)}
            x2={width - padding}
            y2={getY(0)}
            stroke="rgba(107, 114, 128, 0.3)"
            strokeWidth="1"
            strokeDasharray="5,5"
          />

          {/* Income area */}
          <path
            d={createArea(incomePoints)}
            fill="url(#incomeGradient)"
          />

          {/* Expense area */}
          <path
            d={createArea(expensePoints)}
            fill="url(#expenseGradient)"
          />

          {/* Balance area (if enabled) */}
          {showBalance && (
            <path
              d={createArea(balancePoints)}
              fill="url(#balanceGradient)"
            />
          )}

          {/* Income line */}
          <path
            d={createPath(incomePoints)}
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Expense line */}
          <path
            d={createPath(expensePoints)}
            fill="none"
            stroke="#EF4444"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Balance line (if enabled) */}
          {showBalance && (
            <path
              d={createPath(balancePoints)}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Data points */}
          {incomePoints.map((point, index) => (
            <g key={`income-${index}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#10B981"
                className="hover:r-6 transition-all duration-300 cursor-pointer"
              />
              <circle
                cx={point.x}
                cy={point.y}
                r="2"
                fill="white"
              />
            </g>
          ))}

          {expensePoints.map((point, index) => (
            <g key={`expense-${index}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#EF4444"
                className="hover:r-6 transition-all duration-300 cursor-pointer"
              />
              <circle
                cx={point.x}
                cy={point.y}
                r="2"
                fill="white"
              />
            </g>
          ))}

          {showBalance && balancePoints.map((point, index) => (
            <g key={`balance-${index}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#3B82F6"
                className="hover:r-6 transition-all duration-300 cursor-pointer"
              />
              <circle
                cx={point.x}
                cy={point.y}
                r="2"
                fill="white"
              />
            </g>
          ))}

          {/* X-axis labels */}
          {data.map((item, index) => (
            <text
              key={index}
              x={getX(index)}
              y={height - 10}
              textAnchor="middle"
              className="text-xs fill-gray-600 dark:fill-gray-400"
            >
              {new Date(item.date).toLocaleDateString('en-US', { month: 'short' })}
            </text>
          ))}

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
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Income</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Expenses</span>
          </div>
          {showBalance && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Balance</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};