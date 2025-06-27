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
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-gray-200/50 dark:border-slate-700/50 px-4 py-2 shadow-2xl">
      <div className="flex items-center justify-around">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-500/30' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
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