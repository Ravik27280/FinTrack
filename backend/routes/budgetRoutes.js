const express = require("express");
const auth = require("../middlewares/authMiddleware");
const {
  getAllBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
  getBudgetAnalytics,
  getAllGoals,
  createGoal,
  updateGoal,
  deleteGoal
} = require("../controllers/budgetController");

const router = express.Router();

router.use(auth);

// Budget routes
router.get("/", getAllBudgets);
router.post("/", createBudget);
router.put("/:id", updateBudget);
router.delete("/:id", deleteBudget);
router.get("/analytics", getBudgetAnalytics);

// Goal routes
router.get("/goals", getAllGoals);
router.post("/goals", createGoal);
router.put("/goals/:id", updateGoal);
router.delete("/goals/:id", deleteGoal);

module.exports = router;