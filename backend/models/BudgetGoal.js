const mongoose = require("mongoose");

const budgetGoalSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    targetAmount: { type: Number, required: true },
    currentAmount: { type: Number, default: 0 },
    targetDate: { type: Date, required: true },
    category: { type: String, required: true },
    priority: { 
      type: String, 
      enum: ["low", "medium", "high", "critical"], 
      default: "medium" 
    },
    status: { 
      type: String, 
      enum: ["active", "completed", "paused", "cancelled"], 
      default: "active" 
    },
    color: { type: String, default: "#10B981" },
    isRecurring: { type: Boolean, default: false },
    recurringPeriod: { 
      type: String, 
      enum: ["weekly", "monthly", "quarterly", "yearly"] 
    },
  },
  { timestamps: true }
);

budgetGoalSchema.index({ userId: 1, status: 1 });

module.exports = mongoose.model("BudgetGoal", budgetGoalSchema);