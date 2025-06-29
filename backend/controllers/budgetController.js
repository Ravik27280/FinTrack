const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');

// GET /api/budgets
exports.getAllBudgets = async (req, res) => {
  const budgets = await Budget.find({ userId: req.userId });

  const enrichedBudgets = await Promise.all(budgets.map(async budget => {
    const spent = await Transaction.aggregate([
      {
        $match: {
          userId: req.userId,
          category: budget.category,
          date: { $gte: budget.startDate, $lte: budget.endDate }
        }
      },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    budget.spentAmount = spent[0]?.total || 0;
    return budget;
  }));

  res.json(enrichedBudgets);
};

// POST /api/budgets
exports.createBudget = async (req, res) => {
  const budget = await Budget.create({ ...req.body, userId: req.userId });
  res.status(201).json(budget);
};

// PUT /api/budgets/:id
exports.updateBudget = async (req, res) => {
  const budget = await Budget.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  res.json(budget);
};

// DELETE /api/budgets/:id
exports.deleteBudget = async (req, res) => {
  await Budget.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: 'Deleted' });
};


exports.getAnalytics = async (req, res) => {
  const budgets = await Budget.find({ userId: req.userId });
  const transactions = await Transaction.find({ userId: req.userId });

  let totalBudgeted = 0;
  let totalSpent = 0;
  let budgetsOverLimit = 0;
  let budgetsNearLimit = 0;
  let categoryBreakdown = {};

  budgets.forEach(b => {
    totalBudgeted += b.budgetedAmount;
    totalSpent += b.spentAmount;

    const percentage = (b.spentAmount / b.budgetedAmount) * 100;

    if (percentage >= 100) budgetsOverLimit++;
    else if (percentage >= b.alertThreshold) budgetsNearLimit++;

    if (!categoryBreakdown[b.category]) {
      categoryBreakdown[b.category] = { budgeted: 0, spent: 0, percentage: 0 };
    }

    categoryBreakdown[b.category].budgeted += b.budgetedAmount;
    categoryBreakdown[b.category].spent += b.spentAmount;
    categoryBreakdown[b.category].percentage = Math.round(
      (categoryBreakdown[b.category].spent / categoryBreakdown[b.category].budgeted) * 100
    );
  });

  // Monthly trend (optional: improve by grouping via moment/month.js)
  let monthlyTrend = [];

  res.json({
    totalBudgeted,
    totalSpent,
    budgetsOverLimit,
    budgetsNearLimit,
    categoryBreakdown,
    monthlyTrend
  });
};
