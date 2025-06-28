import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { Sidebar } from './components/navigation/Sidebar';
import { BottomNav } from './components/navigation/BottomNav';
import { Dashboard } from './components/dashboard/Dashboard';
import { TransactionTable } from './components/transactions/TransactionTable';
import { BudgetOverview } from './components/budget/BudgetOverview';
import { AIInsights } from './components/insights/AIInsights';
import { ThemeProvider } from './contexts/ThemeContext';
import { User } from './types';
import { mockTransactions, mockBudgetItems, aiInsights } from './data/mockData';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLogin = (email: string, password: string) => {
    // Simulate login
    setUser({ name: 'John Doe', email });
  };

  const handleRegister = (name: string, email: string, password: string) => {
    // Simulate registration
    setUser({ name, email });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 transition-all duration-500">
          {/* Animated background elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>

          {!user ? (
            <div className="relative z-10">
              <Routes>
                <Route 
                  path="/login" 
                  element={
                    <LoginForm 
                      onLogin={handleLogin}
                      onSwitchToRegister={() => window.location.href = '/register'}
                    />
                  } 
                />
                <Route 
                  path="/register" 
                  element={
                    <RegisterForm 
                      onRegister={handleRegister}
                      onSwitchToLogin={() => window.location.href = '/login'}
                    />
                  } 
                />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </div>
          ) : (
            <>
              {/* Fixed Sidebar */}
              <Sidebar
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                onLogout={handleLogout}
              />
              
              {/* Main Content Area */}
              <div className={`transition-all duration-300 relative z-10 ${
                isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
              }`}>
                <main className="min-h-screen p-6 pb-20 md:pb-6">
                  <Routes>
                    <Route 
                      path="/dashboard" 
                      element={<Dashboard transactions={mockTransactions} />} 
                    />
                    <Route 
                      path="/transactions" 
                      element={<TransactionTable transactions={mockTransactions} />} 
                    />
                    <Route 
                      path="/budget" 
                      element={<BudgetOverview budgetItems={mockBudgetItems} />} 
                    />
                    <Route 
                      path="/insights" 
                      element={<AIInsights insights={aiInsights} />} 
                    />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </main>
              </div>
              
              {/* Mobile Bottom Navigation */}
              <BottomNav />
            </>
          )}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;