import React, { useState } from 'react';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { Sidebar } from './components/navigation/Sidebar';
import { BottomNav } from './components/navigation/BottomNav';
import { Dashboard } from './components/dashboard/Dashboard';
import { TransactionTable } from './components/transactions/TransactionTable';
import { BudgetOverview } from './components/budget/BudgetOverview';
import { AIInsights } from './components/insights/AIInsights';
import { ThemeProvider } from './contexts/ThemeContext';
import { Screen, User } from './types';
import { mockTransactions, mockBudgetItems, aiInsights } from './data/mockData';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLogin = (email: string, password: string) => {
    // Simulate login
    setUser({ name: 'John Doe', email });
    setCurrentScreen('dashboard');
  };

  const handleRegister = (name: string, email: string, password: string) => {
    // Simulate registration
    setUser({ name, email });
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('login');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginForm 
            onLogin={handleLogin}
            onSwitchToRegister={() => setCurrentScreen('register')}
          />
        );
      case 'register':
        return (
          <RegisterForm 
            onRegister={handleRegister}
            onSwitchToLogin={() => setCurrentScreen('login')}
          />
        );
      case 'dashboard':
        return <Dashboard transactions={mockTransactions} />;
      case 'transactions':
        return <TransactionTable transactions={mockTransactions} />;
      case 'budget':
        return <BudgetOverview budgetItems={mockBudgetItems} />;
      case 'insights':
        return <AIInsights insights={aiInsights} />;
      default:
        return <Dashboard transactions={mockTransactions} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 transition-all duration-500">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {!user ? (
          renderScreen()
        ) : (
          <div className="flex relative z-10">
            <Sidebar
              currentScreen={currentScreen}
              onScreenChange={setCurrentScreen}
              isCollapsed={isSidebarCollapsed}
              onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              onLogout={handleLogout}
            />
            
            <div className="flex-1 flex flex-col">
              <main className="flex-1 p-6 pb-20 md:pb-6">
                {renderScreen()}
              </main>
            </div>
            
            <BottomNav
              currentScreen={currentScreen}
              onScreenChange={setCurrentScreen}
            />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;