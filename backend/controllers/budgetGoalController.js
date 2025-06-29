const BudgetGoal = require('../models/BudgetGoal');

// GET all goals
exports.getAllGoals = async (req, res) => {
  const goals = await BudgetGoal.find({ userId: req.userId });
  res.json(goals);
};

// POST create new goal
exports.createGoal = async (req, res) => {
  const data = { ...req.body, userId: req.userId };
  const newGoal = await BudgetGoal.create(data);
  res.status(201).json(newGoal);
};

// PUT update goal
exports.updateGoal = async (req, res) => {
  const updated = await BudgetGoal.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  res.json(updated);
};

// DELETE goal
exports.deleteGoal = async (req, res) => {
  await BudgetGoal.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: 'Deleted' });
};

// PUT update progress
exports.updateProgress = async (req, res) => {
  const { amount } = req.body;
  const goal = await BudgetGoal.findOne({ _id: req.params.id, userId: req.userId });
  if (!goal) return res.status(404).json({ message: 'Goal not found' });

  goal.currentAmount += amount;
  await goal.save();
  res.json(goal);
};
