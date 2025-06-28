const Transaction = require("../models/Transaction");

exports.getAll = async (req, res) => {
  const transactions = await Transaction.find({ userId: req.userId }).sort({ date: -1 });
  res.json(transactions);
};

exports.add = async (req, res) => {
  const data = { ...req.body, userId: req.userId };
  const newTransaction = await Transaction.create(data);
  res.status(201).json(newTransaction);
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await Transaction.findOneAndDelete({ _id: id, userId: req.userId });
  res.json({ message: "Deleted" });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const updated = await Transaction.findOneAndUpdate(
    { _id: id, userId: req.userId },  // Ensure the user owns it
    updateData,
    { new: true }  // Return the updated document
  );

  if (!updated) {
    return res.status(404).json({ message: "Transaction not found or not authorized" });
  }

  res.json(updated);
};
