import React, { useState } from 'react';
import { ShoppingCart, Plus, X, Check, Package } from 'lucide-react';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';

export const ShoppingList = ({ currentRoute, navigate, shoppingList, setShoppingList }) => {
  const [newItem, setNewItem] = useState('');
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [viewMode, setViewMode] = useState('all'); // 'all' | 'missing'

  const handleAddItem = () => {
    if (newItem.trim()) {
      setShoppingList([...shoppingList, newItem.trim()]);
      setNewItem('');
    }
  };

  const handleRemoveItem = (index) => {
    const newList = shoppingList.filter((_, i) => i !== index);
    setShoppingList(newList);
    
    // Remove from checked items if it was checked
    const newChecked = new Set(checkedItems);
    newChecked.delete(index);
    // Update indices for remaining items
    const updatedChecked = new Set();
    newChecked.forEach(checkedIndex => {
      if (checkedIndex < index) {
        updatedChecked.add(checkedIndex);
      } else if (checkedIndex > index) {
        updatedChecked.add(checkedIndex - 1);
      }
    });
    setCheckedItems(updatedChecked);
  };

  const handleToggleCheck = (index) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedItems(newChecked);
  };

  const handleClearCompleted = () => {
    const newList = shoppingList.filter((_, index) => !checkedItems.has(index));
    setShoppingList(newList);
    setCheckedItems(new Set());
  };

  const missingIngredients = [
    { name: 'Sýr', amount: '100g', forRecipe: 'Těstovinový salát' },
    { name: 'Bazalka', amount: '1 svazek', forRecipe: 'Těstovinový salát' }
  ];

  const displayedItems = viewMode === 'missing' ? missingIngredients : 
    shoppingList.map((item, index) => ({
      name: item,
      index,
      checked: checkedItems.has(index)
    }));

  const completedCount = checkedItems.size;
  const totalCount = shoppingList.length;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Header 
        title="Nákupní seznam" 
        showBack={true} 
        onBack={() => navigate('/')}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* Header with add item */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 flex space-x-2">
              <input
                type="text"
                placeholder="Přidat položku..."
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button 
                onClick={handleAddItem}
                disabled={!newItem.trim()}
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Přidat</span>
              </button>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => setViewMode('all')}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  viewMode === 'all'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Seznam ({totalCount})
              </button>
              <button 
                onClick={() => setViewMode('missing')}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  viewMode === 'missing'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                }`}
              >
                Chybějící ({missingIngredients.length})
              </button>
            </div>
          </div>

          {/* Missing ingredients view */}
          {viewMode === 'missing' && (
            <div className="mb-6">
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <Package className="w-5 h-5" />
                <span>Chybějící ingredience</span>
              </h3>
              
              <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center text-gray-500">
                  <ShoppingCart className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Ilustrace ingrediencí</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                {missingIngredients.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        {item.amount} • Pro {item.forRecipe}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const itemText = `${item.name} (${item.amount})`;
                        if (!shoppingList.includes(itemText)) {
                          setShoppingList([...shoppingList, itemText]);
                        }
                      }}
                      className="text-blue-600 text-sm font-semibold hover:text-blue-700"
                    >
                      + Přidat
                    </button>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => {
                  const newItems = missingIngredients.map(item => `${item.name} (${item.amount})`);
                  const uniqueItems = [...new Set([...shoppingList, ...newItems])];
                  setShoppingList(uniqueItems);
                }}
                className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Přidat vše na seznam</span>
              </button>
            </div>
          )}

          {/* Shopping list view */}
          {viewMode === 'all' && (
            <div className="mb-6">
              {shoppingList.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Váš nákupní seznam</h3>
                    {completedCount > 0 && (
                      <button
                        onClick={handleClearCompleted}
                        className="text-red-600 text-sm hover:text-red-700"
                      >
                        Smazat dokončené ({completedCount})
                      </button>
                    )}
                  </div>

                  <div className="space-y-2">
                    {shoppingList.map((item, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center justify-between p-3 border rounded-lg transition-all ${
                          checkedItems.has(index)
                            ? 'border-green-300 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <button
                            onClick={() => handleToggleCheck(index)}
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                              checkedItems.has(index)
                                ? 'bg-green-600 border-green-600 text-white'
                                : 'border-gray-300 hover:border-green-400'
                            }`}
                          >
                            {checkedItems.has(index) && <Check className="w-3 h-3" />}
                          </button>
                          <span className={`text-sm ${
                            checkedItems.has(index) 
                              ? 'line-through text-gray-500' 
                              : 'text-gray-900'
                          }`}>
                            {item}
                          </span>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-500 mb-2">Nákupní seznam je prázdný</h3>
                  <p className="text-gray-400 mb-6">Přidejte ingredience z receptů nebo ručně</p>
                  <button
                    onClick={() => navigate('/')}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Najít recepty
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Statistics */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-semibold mb-3">Statistika</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
                <p className="text-sm text-gray-500">Celkem položek</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{completedCount}/{totalCount}</p>
                <p className="text-sm text-gray-500">Koupeno</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{missingIngredients.length} položky</p>
                <p className="text-sm text-gray-500">Pro recepty</p>
              </div>
            </div>
            
            {totalCount > 0 && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${(completedCount / totalCount) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  {Math.round((completedCount / totalCount) * 100)}% dokončeno
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNav currentRoute={currentRoute} navigate={navigate} />
    </div>
  );
};

export default ShoppingList;