import React from 'react';
import { TrendingUp, PiggyBank, Target, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { AIInsight } from '../../types';

interface AIInsightsProps {
  insights: AIInsight[];
}

export const AIInsights: React.FC<AIInsightsProps> = ({ insights }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp':
        return <TrendingUp className="w-8 h-8" />;
      case 'PiggyBank':
        return <PiggyBank className="w-8 h-8" />;
      case 'Target':
        return <Target className="w-8 h-8" />;
      default:
        return <TrendingUp className="w-8 h-8" />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'spending':
        return 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-500/20';
      case 'saving':
        return 'text-green-500 dark:text-green-400 bg-green-50 dark:bg-green-500/20';
      case 'recommendation':
        return 'text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/20';
      default:
        return 'text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Insights</h1>
          <p className="text-gray-600 dark:text-gray-300">Personalized recommendations based on your spending patterns.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insights.map((insight) => (
          <Card key={insight.id} className="hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:scale-105">
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 dark:border-slate-600/30 ${getIconColor(insight.type)}`}>
                  {getIcon(insight.icon)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{insight.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{insight.description}</p>
                </div>
              </div>
              
              {insight.actionText && (
                <Button 
                  variant="glass" 
                  className="w-full justify-between group hover:bg-blue-50 dark:hover:bg-blue-500/20 hover:border-blue-300 dark:hover:border-blue-500/30"
                >
                  <span>{insight.actionText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/20 dark:border-slate-600/30">
            <Target className="w-8 h-8 text-blue-500 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Want More Insights?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Connect your bank accounts to get personalized AI-powered financial insights and recommendations.
          </p>
          <Button>Connect Bank Account</Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Spending Trends</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">This month vs last month</span>
              <span className="text-red-500 dark:text-red-400 font-medium">+15.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Food & Dining</span>
              <span className="text-red-500 dark:text-red-400 font-medium">+28.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Entertainment</span>
              <span className="text-green-500 dark:text-green-400 font-medium">-12.3%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Transportation</span>
              <span className="text-green-500 dark:text-green-400 font-medium">-5.8%</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Saving Goals</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-900 dark:text-white font-medium">Emergency Fund</span>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">$2,400 / $5,000</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 backdrop-blur-md">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '48%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-900 dark:text-white font-medium">Vacation Fund</span>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">$800 / $2,000</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 backdrop-blur-md">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-900 dark:text-white font-medium">New Car</span>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">$1,200 / $15,000</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 backdrop-blur-md">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '8%' }} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};