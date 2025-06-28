import React from 'react';
import { Transaction } from '../services/transactionService';

interface SpendingTrendChartProps {
  transactions: Transaction[];
  period: 'week' | 'month' | 'year';
  title?: string;
}

interface TrendData {
  period: string;
  amount: number;
  date: Date;
}

export const SpendingTrendChart: React.FC<SpendingTrendChartProps> = ({
  transactions,
  period,
  title = "Spending Trend"
}) => {
  const generateTrendData = (): TrendData[] => {
    const now = new Date();
    const data: TrendData[] = [];
    
    if (period === 'week') {
      // Last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dayTransactions = transactions.filter(t => {
          const tDate = new Date(t.date);
          return tDate.toDateString() === date.toDateString() && t.type === 'expense';
        });
        const amount = dayTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
        
        data.push({
          period: date.toLocaleDateString('en-US', { weekday: 'short' }),
          amount,
          date
        });
      }
    } else if (period === 'month') {
      // Last 30 days grouped by week
      for (let i = 3; i >= 0; i--) {
        const endDate = new Date(now);
        endDate.setDate(endDate.getDate() - (i * 7));
        const startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - 6);
        
        const weekTransactions = transactions.filter(t => {
          const tDate = new Date(t.date);
          return tDate >= startDate && tDate <= endDate && t.type === 'expense';
        });
        const amount = weekTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
        
        data.push({
          period: `Week ${4 - i}`,
          amount,
          date: endDate
        });
      }
    } else {
      // Last 12 months
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now);
        date.setMonth(date.getMonth() - i);
        const monthTransactions = transactions.filter(t => {
          const tDate = new Date(t.date);
          return tDate.getMonth() === date.getMonth() && 
                 tDate.getFullYear() === date.getFullYear() && 
                 t.type === 'expense';
        });
        const amount = monthTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
        
        data.push({
          period: date.toLocaleDateString('en-US', { month: 'short' }),
          amount,
          date
        });
      }
    }
    
    return data;
  };

  const trendData = generateTrendData();
  const maxAmount = Math.max(...trendData.map(d => d.amount));
  const avgAmount = trendData.reduce((sum, d) => sum + d.amount, 0) / trendData.length;
  
  const height = 200;
  const padding = 40;
  const chartHeight = height - padding * 2;
  
  const getX = (index: number, totalWidth: number) => {
    const usableWidth = totalWidth - padding * 2;
    return padding + (index / (trendData.length - 1)) * usableWidth;
  };
  
  const getY = (amount: number) => padding + chartHeight - (amount / maxAmount) * chartHeight;

  // Calculate trend
  const firstHalf = trendData.slice(0, Math.floor(trendData.length / 2));
  const secondHalf = trendData.slice(Math.floor(trendData.length / 2));
  const firstHalfAvg = firstHalf.reduce((sum, d) => sum + d.amount, 0) / firstHalf.length;
  const secondHalfAvg = secondHalf.reduce((sum, d) => sum + d.amount, 0) / secondHalf.length;
  const trendDirection = secondHalfAvg > firstHalfAvg ? 'up' : 'down';
  const trendPercentage = firstHalfAvg > 0 ? Math.abs((secondHalfAvg - firstHalfAvg) / firstHalfAvg * 100) : 0;

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{title}</h3>
        <div className="flex items-center space-x-4 flex-shrink-0">
          <div className={`flex items-center space-x-1 text-sm ${
            trendDirection === 'up' ? 'text-red-500 dark:text-red-400' : 'text-green-500 dark:text-green-400'
          }`}>
            <span>{trendDirection === 'up' ? '↗' : '↘'}</span>
            <span className="whitespace-nowrap">{trendPercentage.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center p-2 bg-gray-50 dark:bg-slate-800/50 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-300">Average</p>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            ${avgAmount.toLocaleString()}
          </p>
        </div>
        <div className="text-center p-2 bg-gray-50 dark:bg-slate-800/50 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-300">Highest</p>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            ${maxAmount.toLocaleString()}
          </p>
        </div>
        <div className="text-center p-2 bg-gray-50 dark:bg-slate-800/50 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-300">Total</p>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            ${trendData.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="w-full overflow-hidden">
        <div className="w-full" style={{ minWidth: '300px' }}>
          <svg 
            width="100%" 
            height={height} 
            viewBox={`0 0 400 ${height}`}
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-auto"
          >
            <defs>
              <linearGradient id="spendingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#EF4444" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#EF4444" stopOpacity="0.05" />
              </linearGradient>
              
              <pattern id="spendingGrid" width="30" height="20" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 20" fill="none" stroke="rgba(156, 163, 175, 0.2)" strokeWidth="1"/>
              </pattern>
            </defs>

            {/* Grid background */}
            <rect width="400" height={height} fill="url(#spendingGrid)" />

            {/* Average line */}
            <line
              x1={padding}
              y1={getY(avgAmount)}
              x2={400 - padding}
              y2={getY(avgAmount)}
              stroke="#F59E0B"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.7"
            />

            {/* Generate paths */}
            {(() => {
              const points = trendData.map((item, index) => ({
                x: getX(index, 400),
                y: getY(item.amount),
                ...item
              }));
              
              const pathData = points.map((point, index) => 
                `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
              ).join(' ');
              
              const areaData = `${pathData} L ${points[points.length - 1].x} ${getY(0)} L ${points[0].x} ${getY(0)} Z`;

              return (
                <>
                  {/* Area */}
                  <path d={areaData} fill="url(#spendingGradient)" />

                  {/* Line */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data points */}
                  {points.map((point, index) => (
                    <circle
                      key={index}
                      cx={point.x}
                      cy={point.y}
                      r="3"
                      fill="#EF4444"
                      className="hover:r-5 transition-all duration-300 cursor-pointer"
                    />
                  ))}

                  {/* X-axis labels */}
                  {trendData.map((item, index) => (
                    <text
                      key={index}
                      x={getX(index, 400)}
                      y={height - 5}
                      textAnchor="middle"
                      className="text-xs fill-gray-600 dark:fill-gray-400"
                    >
                      {item.period}
                    </text>
                  ))}

                  {/* Y-axis labels */}
                  {[0, maxAmount * 0.5, maxAmount].map((value, index) => (
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
                </>
              );
            })()}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-4 mt-4 flex-wrap">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Spending</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-yellow-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Average</span>
          </div>
        </div>
      </div>
    </div>
  );
};