import React from 'react';
import { 
  LayoutDashboard, 
  CreditCard, 
  Target, 
  Brain, 
  Settings, 
  LogOut
} from 'lucide-react';
import { Screen } from '../../types';
import { ThemeToggle } from '../ui/ThemeToggle';

interface SidebarProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentScreen, 
  onScreenChange, 
  onLogout 
}) => {
  const menuItems = [
    { id: 'dashboard' as Screen, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions' as Screen, label: 'Transactions', icon: CreditCard },
    { id: 'budget' as Screen, label: 'Budget', icon: Target },
    { id: 'insights' as Screen, label: 'AI Insights', icon: Brain }
  ];

  return (
    <div className="
      fixed left-0 top-0 h-screen w-64 z-50
      bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl 
      border-r border-gray-200/30 dark:border-slate-700/30 
      shadow-2xl shadow-black/10 dark:shadow-black/30
      hidden md:flex flex-col
    ">
      {/* Header - Fixed height with better spacing */}
      <div className="h-16 px-6 py-4 border-b border-gray-200/30 dark:border-slate-700/30 flex items-center flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">FinTrack</h1>
          </div>
        </div>
      </div>

      {/* Navigation - Takes available space with better padding */}
      <nav className="flex-1 px-4 py-6 min-h-0">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onScreenChange(item.id)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-500/30 dark:to-purple-500/30 text-blue-600 dark:text-blue-400 border border-blue-500/30 dark:border-blue-500/40 shadow-lg shadow-blue-500/20' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-slate-800/80 hover:text-gray-900 dark:hover:text-white'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                    isActive 
                      ? 'text-blue-600 dark:text-blue-400 scale-110' 
                      : 'text-gray-500 dark:text-gray-400 group-hover:scale-105'
                  }`} />
                  <span className="font-medium truncate">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer - Fixed height with better organization */}
      <div className="px-4 pb-4 flex-shrink-0">
        {/* Theme Toggle */}
        <div className="mb-4 px-2">
          <ThemeToggle />
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-1 mb-4">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-slate-800/80 hover:text-gray-900 dark:hover:text-white transition-all duration-300 group">
            <Settings className="w-5 h-5 flex-shrink-0 group-hover:rotate-90 transition-transform duration-300" />
            <span className="truncate">Settings</span>
          </button>
          
          <button 
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 dark:text-red-400 hover:bg-red-50/80 dark:hover:bg-red-500/10 transition-all duration-300 group"
          >
            <LogOut className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
            <span className="truncate">Logout</span>
          </button>
        </div>

        {/* User Profile */}
        <div className="p-3 rounded-xl bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200/50 dark:border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-sm font-bold text-white">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">john@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};