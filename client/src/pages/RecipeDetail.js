import React from 'react';
import { Clock, Users, ChefHat, Check, X, ShoppingCart } from 'lucide-react';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';

export const RecipeDetail = ({ 
  currentRoute, 
  navigate, 
  selectedRecipe, 
  shoppingList, 
  setShoppingList 
}) => {
  if (!selectedRecipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Recept nenalezen</p>
      </div>
    );
  }

  const handleAddToShoppingList = () => {
    if (selectedRecipe.missingIngredients) {
      const newItems = [...new Set([...shoppingList, ...selectedRecipe.missingIngredients])];
      setShoppingList(newItems);
      alert('Ingredience přidány na nákupní seznam!');
    }
  };

  const handleStartCooking = () => {
    navigate(`/cooking/${selectedRecipe.id}`, selectedRecipe);
  };

  const availableIngredients = [
    'Rajčata', 'Cibule', 'Česnek', 'Těstoviny', 'Olivový olej'
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Header 
        title={selectedRecipe.name} 
        showBack={true} 
        onBack={() => navigate('/')}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Recipe Image */}
          <div className="h-48 md:h-64 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center relative">
            <ChefHat className="w-16 h-16 md:w-20 md:h-20 text-white" />
            {selectedRecipe.match && (
              <div className="absolute top-4 right-4 bg-white px-3 py-2 rounded-full">
                <span className="text-green-600 font-bold text-sm">
                  {selectedRecipe.match}% shoda
                </span>
              </div>
            )}
          </div>

          <div className="p-6">
            {/* Recipe Info */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {selectedRecipe.name}
              </h1>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {selectedRecipe.description}
              </p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{selectedRecipe.time} minut</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>4 porce</span>
                </div>
                <span className="bg-gray-200 px-3 py-1 rounded-full">
                  {selectedRecipe.difficulty}
                </span>
              </div>
            </div>

            {/* Tags */}
            {selectedRecipe.tags && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedRecipe.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Ingredients Status */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Available Ingredients */}
              <div className="bg-green-50 p-4 rounded-xl">
                <h3 className="flex items-center space-x-2 font-semibold text-green-800 mb-3">
                  <Check className="w-5 h-5" />
                  <span>Máte k dispozici</span>
                </h3>
                <div className="space-y-2">
                  {availableIngredients.map(ingredient => (
                    <div key={ingredient} className="flex items-center space-x-2 text-green-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Missing Ingredients */}
              {selectedRecipe.missingIngredients && selectedRecipe.missingIngredients.length > 0 && (
                <div className="bg-red-50 p-4 rounded-xl">
                  <h3 className="flex items-center space-x-2 font-semibold text-red-800 mb-3">
                    <X className="w-5 h-5" />
                    <span>Chybějící ingredience</span>
                  </h3>
                  <div className="space-y-2 mb-4">
                    {selectedRecipe.missingIngredients.map(ingredient => (
                      <div key={ingredient} className="flex items-center space-x-2 text-red-700">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm">{ingredient}</span>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={handleAddToShoppingList}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Přidat na nákupní seznam</span>
                  </button>
                </div>
              )}
            </div>

            {/* Instructions Preview */}
            {selectedRecipe.instructions && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Postup přípravy</h3>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-gray-600 text-sm mb-3">
                    {selectedRecipe.instructions[0]}
                  </p>
                  <p className="text-gray-500 text-sm">
                    ... a další {selectedRecipe.instructions.length - 1} kroků
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleStartCooking}
                className="flex-1 bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <ChefHat className="w-5 h-5" />
                <span>Začít vařit</span>
              </button>
              
              <button
                onClick={() => navigate('/shopping')}
                className="sm:w-auto bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Nákupní seznam</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomNav currentRoute={currentRoute} navigate={navigate} />
    </div>
  );
};

export default RecipeDetail;