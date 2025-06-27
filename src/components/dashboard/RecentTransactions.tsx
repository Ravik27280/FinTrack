import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Card } from '../ui/Card';
import { Transaction } from '../../types';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View all
        </button>
      </div>
      
      <div className="space-y-4">
        {transactions.slice(0, 5).map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {transaction.type === 'income' ? (
                  <ArrowUpRight className="w-5 h-5 text-green-600" />
                ) : (
                  <ArrowDownLeft className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.category}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className={`font-semibold ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(transaction.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};