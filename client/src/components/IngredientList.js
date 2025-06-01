import React from 'react';
import { Check, X, Plus, Minus } from 'lucide-react';

export const IngredientList = ({ 
  ingredients, 
  onToggle,
  onAmountChange,
  onRemove,
  showAmount = false,
  showStatus = false,
  editable = false
}) => {
  if (!ingredients || ingredients.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Žádné ingredience</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {ingredients.map(ingredient => (
        <IngredientItem
          key={ingredient.id}
          ingredient={ingredient}
          onToggle={onToggle}
          onAmountChange={onAmountChange}
          onRemove={onRemove}
          showAmount={showAmount}
          showStatus={showStatus}
          editable={editable}
        />
      ))}
    </div>
  );
};

const IngredientItem = ({ 
  ingredient, 
  onToggle,
  onAmountChange,
  onRemove,
  showAmount,
  showStatus,
  editable
}) => {
  const handleToggle = () => {
    onToggle && onToggle(ingredient.id, !ingredient.checked);
  };

  const handleAmountChange = (delta) => {
    const newAmount = Math.max(0, ingredient.amount + delta);
    onAmountChange && onAmountChange(ingredient.id, newAmount);
  };

  const handleRemove = () => {
    onRemove && onRemove(ingredient.id);
  };

  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
      {/* Left side - checkbox and info */}
      <div className="flex items-center space-x-3 flex-1">
        {onToggle && (
          <button
            onClick={handleToggle}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              ingredient.checked
                ? 'bg-green-600 border-green-600 text-white'
                : 'border-gray-300 hover:border-green-400'
            }`}
          >
            {ingredient.checked && <Check className="w-3 h-3" />}
          </button>
        )}

        <div className="flex-1">
          <h4 className={`font-medium ${
            ingredient.checked ? 'text-green-700' : 'text-gray-900'
          }`}>
            {ingredient.name}
          </h4>
          {ingredient.category && (
            <p className="text-sm text-gray-500">{ingredient.category}</p>
          )}
        </div>

        {/* Status indicator */}
        {showStatus && (
          <div className="flex items-center space-x-2">
            {ingredient.available ? (
              <div className="flex items-center space-x-1 text-green-600">
                <Check className="w-4 h-4" />
                <span className="text-sm">Máte</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-red-600">
                <X className="w-4 h-4" />
                <span className="text-sm">Chybí</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right side - amount controls or remove */}
      <div className="flex items-center space-x-2">
        {showAmount && ingredient.amount !== undefined && (
          <>
            {editable && onAmountChange && (
              <button
                onClick={() => handleAmountChange(-1)}
                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                disabled={ingredient.amount <= 0}
              >
                <Minus className="w-4 h-4" />
              </button>
            )}
            
            <span className="w-16 text-center font-semibold text-sm">
              {ingredient.amount} {ingredient.unit || 'ks'}
            </span>
            
            {editable && onAmountChange && (
              <button
                onClick={() => handleAmountChange(1)}
                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </>
        )}

        {editable && onRemove && (
          <button
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 p-1 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default IngredientList;