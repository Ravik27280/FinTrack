const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    budgetedAmount: { type: Number, required: true },
    spentAmount: { type: Number, default: 0 },
    period: { 
      type: String, 
      enum: ["weekly", "monthly", "quarterly", "yearly"], 
      default: "monthly" 
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    alertThreshold: { type: Number, default: 80 }, // Alert when 80% spent
    isActive: { type: Boolean, default: true },
    color: { type: String, default: "#3B82F6" },
    description: { type: String },
    tags: [{ type: String }],
    rollover: { type: Boolean, default: false }, // Rollover unused budget
  },
  { timestamps: true }
);

// Index for efficient queries
budgetSchema.index({ userId: 1, category: 1, period: 1 });
budgetSchema.index({ userId: 1, isActive: 1 });

module.exports = mongoose.model("Budget", budgetSchema);