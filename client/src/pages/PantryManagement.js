import React, { useState } from 'react';
import { Search, Plus, Package } from 'lucide-react';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { IngredientList } from '../components/IngredientList';
import { mockData } from '../utils/mockData';

export const PantryManagement = ({ currentRoute, navigate, pantryItems, setPantryItems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Vše');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    amount: 1,
    unit: 'ks',
    category: 'Zelenina'
  });

  const categories = mockData.categories;
  const units = ['ks', 'g', 'ml', 'lžíce', 'lžička', 'šálek', 'svazek', 'stroužek'];

  const filteredItems = pantryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Vše' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAmountChange = (id, newAmount) => {
    setPantryItems(pantryItems.map(item =>
      item.id === id ? { ...item, amount: newAmount } : item
    ));
  };

  const handleRemoveItem = (id) => {
    setPantryItems(pantryItems.filter(item => item.id !== id));
  };

  const handleAddIngredient = () => {
    if (newIngredient.name.trim()) {
      const ingredient = {
        id: newIngredient.name.toLowerCase().replace(/\s+/g, '-'),
        ...newIngredient,
        name: newIngredient.name.trim()
      };
      setPantryItems([...pantryItems, ingredient]);
      setNewIngredient({
        name: '',
        amount: 1,
        unit: 'ks',
        category: 'Zelenina'
      });
      setShowAddForm(false);
    }
  };

  const handleQuickAdd = (name, unit = 'ks', category = 'Zelenina') => {
    const ingredient = {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      amount: 1,
      unit,
      category
    };
    setPantryItems([...pantryItems, ingredient]);
  };

  const recommendedItems = [
    { name: 'Bazalka', unit: 'svazek', category: 'Zelenina' },
    { name: 'Sýr', unit: 'g', category: 'Mléčné výrobky' },
    { name: 'Paprika', unit: 'ks', category: 'Zelenina' },
    { name: 'Mozzarella', unit: 'g', category: 'Mléčné výrobky' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Header 
        title="Správa spíže" 
        showBack={true} 
        onBack={() => navigate('/')}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* Header with stats */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Vaše spíž</h2>
              <p className="text-gray-500">{pantryItems.length} ingrediencí</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Přidat</span>
            </button>
          </div>

          {/* Search and filters */}
          <div className="mb-6">
            <div className="relative mb-4">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Hledat v spíži..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Pantry items */}
          <div className="mb-8">
            {filteredItems.length > 0 ? (
              <IngredientList
                ingredients={filteredItems}
                onAmountChange={handleAmountChange}
                onRemove={handleRemoveItem}
                showAmount={true}
                editable={true}
              />
            ) : (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-500 mb-2">Žádné ingredience</h3>
                <p className="text-gray-400 mb-6">
                  {searchTerm || selectedCategory !== 'Vše' 
                    ? 'Nenalezeny žádné ingredience podle zadaných kritérií'
                    : 'Přidejte své první ingredience do spíže'
                  }
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Přidat ingredienci
                </button>
              </div>
            )}
          </div>

          {/* Recommended additions */}
          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="font-semibold text-blue-900 mb-4">Doporučený nákup</h3>
            <p className="text-blue-700 text-sm mb-4">
              Na základě vašich receptů doporučujeme přidat:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recommendedItems.map(item => (
                <div key={item.name} className="flex items-center justify-between bg-white p-3 rounded-lg">
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <button 
                    onClick={() => handleQuickAdd(item.name, item.unit, item.category)}
                    className="text-blue-600 text-sm font-semibold hover:text-blue-700"
                  >
                    + Přidat
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Ingredient Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Přidat ingredienci</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Název
                </label>
                <input
                  type="text"
                  value={newIngredient.name}
                  onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
                  placeholder="Např. Rajčata"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Množství
                  </label>
                  <input
                    type="number"
                    value={newIngredient.amount}
                    onChange={(e) => setNewIngredient({...newIngredient, amount: parseInt(e.target.value) || 1})}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jednotka
                  </label>
                  <select
                    value={newIngredient.unit}
                    onChange={(e) => setNewIngredient({...newIngredient, unit: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategorie
                </label>
                <select
                  value={newIngredient.category}
                  onChange={(e) => setNewIngredient({...newIngredient, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {categories.filter(cat => cat !== 'Vše').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Zrušit
              </button>
              <button
                onClick={handleAddIngredient}
                disabled={!newIngredient.name.trim()}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Přidat
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav currentRoute={currentRoute} navigate={navigate} />
    </div>
  );
};

export default PantryManagement;