// controllers/categoryController.js
const Category = require('../models/Category');

exports.getAllCategories = async (req, res) => {
  const categories = await Category.find({
    $or: [{ userId: req.userId }, { isDefault: true }],
    isActive: true
  });
  res.json(categories);
};

exports.createCategory = async (req, res) => {
  const data = { ...req.body, userId: req.userId };
  const newCategory = await Category.create(data);
  res.status(201).json(newCategory);
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const updatedCategory = await Category.findOneAndUpdate(
    { _id: id, userId: req.userId },
    req.body,
    { new: true }
  );
  res.json(updatedCategory);
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  await Category.findOneAndUpdate(
    { _id: id, userId: req.userId },
    { isActive: false }
  );
  res.json({ message: 'Category deleted' });
};

exports.bulkAddCategories = async (req, res) => {
  try {
    const userId = req.userId;
    const categories = req.body.map((cat) => ({
      ...cat,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    const inserted = await Category.insertMany(categories);
    res.status(201).json(inserted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error inserting categories' });
  }
};
