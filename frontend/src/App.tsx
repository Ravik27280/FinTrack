import React, { useState } from 'react';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { Sidebar } from './components/navigation/Sidebar';
import { BottomNav } from './components/navigation/BottomNav';
import { Dashboard } from './components/dashboard/Dashboard';
import { TransactionTable } from './components/transactions/TransactionTable';
import { BudgetOverview } from './components/budget/BudgetOverview';
import { AIInsights } from './components/insights/AIInsights';
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

  if (!user) {
    return renderScreen();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
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
  );
}

export default App;