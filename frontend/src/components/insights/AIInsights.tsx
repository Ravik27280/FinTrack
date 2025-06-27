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
        return 'text-red-600 bg-red-50';
      case 'saving':
        return 'text-green-600 bg-green-50';
      case 'recommendation':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Insights</h1>
          <p className="text-gray-600">Personalized recommendations based on your spending patterns.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insights.map((insight) => (
          <Card key={insight.id} className="hover:shadow-md transition-shadow duration-200">
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconColor(insight.type)}`}>
                  {getIcon(insight.icon)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{insight.description}</p>
                </div>
              </div>
              
              {insight.actionText && (
                <Button 
                  variant="outline" 
                  className="w-full justify-between group hover:bg-blue-50 hover:border-blue-300"
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
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Want More Insights?</h3>
          <p className="text-gray-600 mb-4">
            Connect your bank accounts to get personalized AI-powered financial insights and recommendations.
          </p>
          <Button>Connect Bank Account</Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending Trends</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">This month vs last month</span>
              <span className="text-red-600 font-medium">+15.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Food & Dining</span>
              <span className="text-red-600 font-medium">+28.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Entertainment</span>
              <span className="text-green-600 font-medium">-12.3%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Transportation</span>
              <span className="text-green-600 font-medium">-5.8%</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Saving Goals</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-900 font-medium">Emergency Fund</span>
                <span className="text-sm font-medium">$2,400 / $5,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '48%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-900 font-medium">Vacation Fund</span>
                <span className="text-sm font-medium">$800 / $2,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-900 font-medium">New Car</span>
                <span className="text-sm font-medium">$1,200 / $15,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '8%' }} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};