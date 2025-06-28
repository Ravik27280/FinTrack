import React, { useState, useEffect } from 'react';
import { Plus, Target, AlertTriangle, CheckCircle, TrendingUp, Settings, Calendar, Filter } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { BudgetCard } from './BudgetCard';
import { BudgetGoalCard } from './BudgetGoalCard';
import { BudgetAnalyticsChart } from './BudgetAnalyticsChart';
import { CreateBudgetForm } from '../forms/CreateBudgetForm';
import { CreateBudgetGoalForm } from '../forms/CreateBudgetGoalForm';
import { EditBudgetForm } from '../forms/EditBudgetForm';
import { EditBudgetGoalForm } from '../forms/EditBudgetGoalForm';
import { BudgetAlerts } from './BudgetAlerts';
import { useCurrency } from '../settings/CurrencySelector';
import { 
  Budget, 
  BudgetGoal, 
  BudgetAnalytics,
  getBudgets, 
  getBudgetGoals, 
  getBudgetAnalytics,
  deleteBudget,
  deleteBudgetGoal
} from '../services/budgetService';

export const BudgetOverview: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [goals, setGoals] = useState<BudgetGoal[]>([]);
  const [analytics, setAnalytics] = useState<BudgetAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'budgets' | 'goals' | 'analytics'>('budgets');
  const [isCreateBudgetOpen, setIsCreateBudgetOpen] = useState(false);
  const [isCreateGoalOpen, setIsCreateGoalOpen] = useState(false);
  const [isEditBudgetOpen, setIsEditBudgetOpen] = useState(false);
  const [isEditGoalOpen, setIsEditGoalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [editingGoal, setEditingGoal] = useState<BudgetGoal | null>(null);
  const [filterPeriod, setFilterPeriod] = useState<'all' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'paused'>('all');
  
  const { formatAmount } = useCurrency();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [budgetsData, goalsData, analyticsData] = await Promise.all([
        getBudgets(),
        getBudgetGoals(),
        getBudgetAnalytics()
      ]);
      
      setBudgets(budgetsData);
      setGoals(goalsData);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error fetching budget data:', error);
      // Set mock data if API fails
      setBudgets([]);
      setGoals([]);
      setAnalytics({
        totalBudgeted: 2000,
        totalSpent: 1200,
        budgetsOverLimit: 1,
        budgetsNearLimit: 2,
        categoryBreakdown: {
          'Food & Dining': { budgeted: 500, spent: 320, percentage: 64 },
          'Transportation': { budgeted: 300, spent: 180, percentage: 60 },
          'Entertainment': { budgeted: 200, spent: 150, percentage: 75 }
        },
        monthlyTrend: [
          { month: 'Aug', budgeted: 1800, spent: 1600 },
          { month: 'Sep', budgeted: 1900, spent: 1700 },
          { month: 'Oct', budgeted: 2000, spent: 1800 },
          { month: 'Nov', budgeted: 2100, spent: 1900 },
          { month: 'Dec', budgeted: 2000, spent: 1500 },
          { month: 'Jan', budgeted: 2000, spent: 1200 }
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteBudget = async (id: string) => {
    try {
      await deleteBudget(id);
      fetchData();
    } catch (error) {
      console.error('Error deleting budget:', error);
    }
  };

  const handleDeleteGoal = async (id: string) => {
    try {
      await deleteBudgetGoal(id);
      fetchData();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const handleEditBudget = (budget: Budget) => {
    setEditingBudget(budget);
    setIsEditBudgetOpen(true);
  };

  const handleEditGoal = (goal: BudgetGoal) => {
    setEditingGoal(goal);
    setIsEditGoalOpen(true);
  };

  const filteredBudgets = budgets.filter(budget => {
    if (filterPeriod !== 'all' && budget.period !== filterPeriod) return false;
    return true;
  });

  const filteredGoals = goals.filter(goal => {
    if (filterStatus !== 'all' && goal.status !== filterStatus) return false;
    return true;
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Budget Management</h1>
            <p className="text-gray-600 dark:text-gray-300">Loading your budget overview...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-slate-700/50 rounded-2xl p-6 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Budget Management</h1>
          <p className="text-gray-600 dark:text-gray-300 truncate">
            Track your spending, set goals, and manage your financial health.
          </p>
        </div>
        <div className="flex items-center space-x-3 flex-shrink-0">
          <Button 
            variant="glass" 
            size="sm"
            onClick={() => setIsCreateGoalOpen(true)}
          >
            <Target className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Add Goal</span>
          </Button>
          <Button onClick={() => setIsCreateBudgetOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Create Budget</span>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Budgeted</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatAmount(analytics.totalBudgeted)}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Spent</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatAmount(analytics.totalSpent)}
                </p>
              </div>
              <div className="w-10 h-10 bg-red-50 dark:bg-red-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-red-500 dark:text-red-400" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Over Budget</p>
                <p className="text-xl font-bold text-red-600 dark:text-red-400">
                  {analytics.budgetsOverLimit}
                </p>
              </div>
              <div className="w-10 h-10 bg-red-50 dark:bg-red-500/20 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500 dark:text-red-400" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Near Limit</p>
                <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                  {analytics.budgetsNearLimit}
                </p>
              </div>
              <div className="w-10 h-10 bg-yellow-50 dark:bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Budget Alerts */}
      <BudgetAlerts budgets={budgets} formatAmount={formatAmount} />

      {/* Tab Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 bg-gray-100 dark:bg-slate-800 rounded-xl p-1">
          {[
            { id: 'budgets', label: 'Budgets', icon: Target },
            { id: 'goals', label: 'Goals', icon: CheckCircle },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2">
          {activeTab === 'budgets' && (
            <select
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value as any)}
              className="px-3 py-2 border border-gray-300/50 dark:border-slate-600/50 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-md text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            >
              <option value="all">All Periods</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          )}

          {activeTab === 'goals' && (
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 border border-gray-300/50 dark:border-slate-600/50 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-md text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="paused">Paused</option>
            </select>
          )}

          <Button variant="glass" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'budgets' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBudgets.map((budget) => (
            <BudgetCard
              key={budget._id || budget.id}
              budget={budget}
              onEdit={() => handleEditBudget(budget)}
              onDelete={() => handleDeleteBudget(budget._id || budget.id || '')}
              formatAmount={formatAmount}
            />
          ))}
          
          {filteredBudgets.length === 0 && (
            <div className="col-span-full">
              <Card className="text-center py-12">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No budgets found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Create your first budget to start tracking your spending.
                </p>
                <Button onClick={() => setIsCreateBudgetOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Budget
                </Button>
              </Card>
            </div>
          )}
        </div>
      )}

      {activeTab === 'goals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredGoals.map((goal) => (
            <BudgetGoalCard
              key={goal._id || goal.id}
              goal={goal}
              onEdit={() => handleEditGoal(goal)}
              onDelete={() => handleDeleteGoal(goal._id || goal.id || '')}
              formatAmount={formatAmount}
            />
          ))}
          
          {filteredGoals.length === 0 && (
            <div className="col-span-full">
              <Card className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No goals found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Set your first financial goal to start saving.
                </p>
                <Button onClick={() => setIsCreateGoalOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Goal
                </Button>
              </Card>
            </div>
          )}
        </div>
      )}

      {activeTab === 'analytics' && analytics && (
        <BudgetAnalyticsChart analytics={analytics} formatAmount={formatAmount} />
      )}

      {/* Forms */}
      <CreateBudgetForm
        isOpen={isCreateBudgetOpen}
        onClose={() => setIsCreateBudgetOpen(false)}
        onSuccess={fetchData}
      />

      <CreateBudgetGoalForm
        isOpen={isCreateGoalOpen}
        onClose={() => setIsCreateGoalOpen(false)}
        onSuccess={fetchData}
      />

      <EditBudgetForm
        isOpen={isEditBudgetOpen}
        onClose={() => {
          setIsEditBudgetOpen(false);
          setEditingBudget(null);
        }}
        onSuccess={fetchData}
        budget={editingBudget}
      />

      <EditBudgetGoalForm
        isOpen={isEditGoalOpen}
        onClose={() => {
          setIsEditGoalOpen(false);
          setEditingGoal(null);
        }}
        onSuccess={fetchData}
        goal={editingGoal}
      />
    </div>
  );
};