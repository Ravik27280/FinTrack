import React from 'react';

interface LineChartProps {
  data: { month: string; amount: number }[];
  height?: number;
}

export const LineChart: React.FC<LineChartProps> = ({ data, height = 200 }) => {
  const maxValue = Math.max(...data.map(d => d.amount));
  const minValue = Math.min(...data.map(d => d.amount));
  const range = maxValue - minValue;
  
  const width = 400;
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  
  const points = data.map((item, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth;
    const y = padding + chartHeight - ((item.amount - minValue) / range) * chartHeight;
    return { x, y, ...item };
  });
  
  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');
  
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">6-Month Spending Trend</h3>
      <svg width={width} height={height} className="overflow-visible">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#grid)" />
        
        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke="#2563EB"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Points */}
        {points.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#2563EB"
              className="hover:r-6 transition-all duration-200"
            />
            <text
              x={point.x}
              y={height - 10}
              textAnchor="middle"
              className="text-xs fill-gray-600"
            >
              {point.month}
            </text>
            <text
              x={point.x}
              y={point.y - 10}
              textAnchor="middle"
              className="text-xs fill-gray-700 font-medium"
            >
              ${point.amount.toLocaleString()}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};