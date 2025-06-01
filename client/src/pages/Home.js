import React, { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { RecipeCard } from '../components/RecipeCard';
import { IngredientList } from '../components/IngredientList';
import { mockData } from '../utils/mockData';

export const Home = ({ currentRoute, navigate, shoppingList, setShoppingList }) => {
  const [selectedIngredients, setSelectedIngredients] = useState(
    mockData.availableIngredients.filter(ing => ing.checked).map(ing => ing.id)
  );
  const [showIngredientModal, setShowIngredientModal] = useState(false);
  const [ingredients, setIngredients] = useState(mockData.availableIngredients);

  const handleIngredientToggle = (id, checked) => {
    setIngredients(ingredients.map(ing => 
      ing.id === id ? { ...ing, checked } : ing
    ));

    if (checked) {
      setSelectedIngredients([...selectedIngredients, id]);
    } else {
      setSelectedIngredients(selectedIngredients.filter(ingId => ingId !== id));
    }
  };

  const handleRecipeDetail = (recipe) => {
    navigate(`/recipe/${recipe.id}`, recipe);
  };

  const handleStartCooking = (recipe) => {
    navigate(`/cooking/${recipe.id}`, recipe);
  };

  const handleGenerateRecipes = () => {
    // Simulace generování receptů
    alert(`Generuji recepty z ${selectedIngredients.length} ingrediencí...`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Header title="Zbytkář" />
      
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* Header section */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Generátor receptů</h2>
            <button 
              onClick={() => setShowIngredientModal(true)}
              className="bg-green-100 text-green-800 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors"
            >
              Ingredience ({selectedIngredients.length})
            </button>
          </div>

          {/* Selected ingredients preview */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <h3 className="font-semibold mb-3">Dostupné ingredience</h3>
            
            {selectedIngredients.length > 0 ? (
              <div className="space-y-2 mb-4">
                {ingredients
                  .filter(ing => ing.checked)
                  .map(ingredient => (
                    <div key={ingredient.id} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{ingredient.name}</span>
                    </div>
                  ))
                }
              </div>
            ) : (
              <p className="text-gray-500 text-sm mb-4">
                Zatím nemáte vybrané žádné ingredience
              </p>
            )}

            <button 
              onClick={handleGenerateRecipes}
              disabled={selectedIngredients.length === 0}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Generovat recepty
            </button>
          </div>

          {/* Generated recipes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Doporučené recepty</h3>
            
            {mockData.generatedRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onClick={handleRecipeDetail}
                onStartCooking={handleStartCooking}
                showMatch={true}
                showTags={true}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Ingredient Selection Modal */}
      {showIngredientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Dostupné ingredience</h3>
                <button 
                  onClick={() => setShowIngredientModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="relative mb-4">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Hledat ingredience..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full text-sm"
                />
              </div>

              <div className="max-h-60 overflow-y-auto">
                <IngredientList
                  ingredients={ingredients}
                  onToggle={handleIngredientToggle}
                  showAmount={false}
                  editable={false}
                />
              </div>
            </div>

            <div className="p-4 border-t border-gray-200">
              <button 
                onClick={() => setShowIngredientModal(false)}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Generovat recepty
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav currentRoute={currentRoute} navigate={navigate} />
    </div>
  );
};

export default Home;