import React, { useState } from 'react';
import { X, Tag, Palette } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface AddCategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (category: { name: string; color: string; type: 'income' | 'expense' }) => void;
}

const predefinedColors = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', 
  '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
];

export const AddCategoryForm: React.FC<AddCategoryFormProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    name: '',
    color: predefinedColors[0],
    type: 'expense' as 'income' | 'expense'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Category name must be at least 2 characters';
    }

    if (!formData.color) {
      newErrors.color = 'Please select a color';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSuccess({
      name: formData.name.trim(),
      color: formData.color,
      type: formData.type
    });

    // Reset form
    setFormData({
      name: '',
      color: predefinedColors[0],
      type: 'expense'
    });

    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <div className="w-full max-w-md transform transition-all duration-300 animate-in slide-in-from-bottom-4">
        <Card className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Add Category</h2>
            <p className="text-gray-600 dark:text-gray-300">Create a new category for your transactions</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Category Name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter category name"
              icon={<Tag className="w-5 h-5 text-gray-400" />}
              error={errors.name}
            />

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleInputChange('type', 'expense')}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    formData.type === 'expense'
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                      : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('type', 'income')}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    formData.type === 'income'
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                      : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Income
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                <Palette className="w-4 h-4 inline mr-2" />
                Color
              </label>
              <div className="grid grid-cols-5 gap-3">
                {predefinedColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleInputChange('color', color)}
                    className={`w-12 h-12 rounded-xl transition-all duration-300 hover:scale-110 ${
                      formData.color === color 
                        ? 'ring-4 ring-blue-500/50 ring-offset-2 ring-offset-white dark:ring-offset-slate-800 scale-110' 
                        : 'hover:ring-2 hover:ring-gray-300 dark:hover:ring-slate-600'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              {errors.color && (
                <p className="text-sm text-red-500 dark:text-red-400">{errors.color}</p>
              )}
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
              <div 
                className="w-8 h-8 rounded-xl shadow-lg" 
                style={{ backgroundColor: formData.color }}
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formData.name || 'Category Name'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                  {formData.type}
                </p>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
              >
                Add Category
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};