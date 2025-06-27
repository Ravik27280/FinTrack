import React from 'react';
import { LayoutDashboard, CreditCard, Target, Brain } from 'lucide-react';
import { Screen } from '../../types';

interface BottomNavProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onScreenChange }) => {
  const menuItems = [
    { id: 'dashboard' as Screen, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions' as Screen, label: 'Transactions', icon: CreditCard },
    { id: 'budget' as Screen, label: 'Budget', icon: Target },
    { id: 'insights' as Screen, label: 'Insights', icon: Brain }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex items-center justify-around">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-blue-700' 
                  : 'text-gray-500'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};