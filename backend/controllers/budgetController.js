const Budget = require("../models/Budget");
const BudgetGoal = require("../models/BudgetGoal");
const Transaction = require("../models/Transaction");

// Get all budgets for user
exports.getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.userId }).sort({ createdAt: -1 });
    
    // Calculate spent amounts from transactions
    for (let budget of budgets) {
      const transactions = await Transaction.find({
        userId: req.userId,
        category: budget.category,
        type: "expense",
        date: { $gte: budget.startDate, $lte: budget.endDate }
      });
      
      budget.spentAmount = transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
      await budget.save();
    }
    
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new budget
exports.createBudget = async (req, res) => {
  try {
    const budgetData = { ...req.body, userId: req.userId };
    const budget = await Budget.create(budgetData);
    res.status(201).json(budget);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update budget
exports.updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const budget = await Budget.findOneAndUpdate(
      { _id: id, userId: req.userId },
      req.body,
      { new: true }
    );
    
    if (!budget) {
      return res.status(404).json({ error: "Budget not found" });
    }
    
    res.json(budget);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete budget
exports.deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const budget = await Budget.findOneAndDelete({ _id: id, userId: req.userId });
    
    if (!budget) {
      return res.status(404).json({ error: "Budget not found" });
    }
    
    res.json({ message: "Budget deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get budget analytics
exports.getBudgetAnalytics = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.userId, isActive: true });
    
    const analytics = {
      totalBudgeted: 0,
      totalSpent: 0,
      budgetsOverLimit: 0,
      budgetsNearLimit: 0,
      categoryBreakdown: {},
      monthlyTrend: []
    };
    
    for (let budget of budgets) {
      analytics.totalBudgeted += budget.budgetedAmount;
      analytics.totalSpent += budget.spentAmount;
      
      const percentage = (budget.spentAmount / budget.budgetedAmount) * 100;
      if (percentage >= 100) analytics.budgetsOverLimit++;
      else if (percentage >= budget.alertThreshold) analytics.budgetsNearLimit++;
      
      analytics.categoryBreakdown[budget.category] = {
        budgeted: budget.budgetedAmount,
        spent: budget.spentAmount,
        percentage: percentage
      };
    }
    
    // Calculate monthly trend for last 6 months
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);
      
      const monthBudgets = await Budget.find({
        userId: req.userId,
        startDate: { $lte: date },
        endDate: { $gte: date }
      });
      
      const monthData = {
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        budgeted: monthBudgets.reduce((sum, b) => sum + b.budgetedAmount, 0),
        spent: monthBudgets.reduce((sum, b) => sum + b.spentAmount, 0)
      };
      
      analytics.monthlyTrend.push(monthData);
    }
    
    res.json(analytics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Budget Goals CRUD
exports.getAllGoals = async (req, res) => {
  try {
    const goals = await BudgetGoal.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createGoal = async (req, res) => {
  try {
    const goalData = { ...req.body, userId: req.userId };
    const goal = await BudgetGoal.create(goalData);
    res.status(201).json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await BudgetGoal.findOneAndUpdate(
      { _id: id, userId: req.userId },
      req.body,
      { new: true }
    );
    
    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }
    
    res.json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await BudgetGoal.findOneAndDelete({ _id: id, userId: req.userId });
    
    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }
    
    res.json({ message: "Goal deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};