import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { RecipeCard } from '../components/RecipeCard';
import { mockData } from '../utils/mockData';

export const RecipeFiltering = ({ currentRoute, navigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState(['Snídaně', 'Vegan']);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const allRecipes = [...mockData.generatedRecipes, ...mockData.allRecipes];
  const availableTags = mockData.tags;

  const filteredRecipes = allRecipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilters = activeFilters.length === 0 || 
                          (recipe.tags && activeFilters.some(filter => recipe.tags.includes(filter)));
    
    return matchesSearch && matchesFilters;
  });

  const handleToggleFilter = (tag) => {
    setActiveFilters(prev => {
      if (prev.includes(tag)) {
        return prev.filter(f => f !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const handleRemoveFilter = (tag) => {
    setActiveFilters(activeFilters.filter(f => f !== tag));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  const handleRecipeClick = (recipe) => {
    navigate(`/recipe/${recipe.id}`, recipe);
  };

  const handleStartCooking = (recipe) => {
    navigate(`/cooking/${recipe.id}`, recipe);
  };

  const groupedTags = availableTags.reduce((acc, tag) => {
    if (!acc[tag.type]) {
      acc[tag.type] = [];
    }
    acc[tag.type].push(tag);
    return acc;
  }, {});

  const tagTypeNames = {
    meal: 'Typ jídla',
    diet: 'Dietní preference',
    time: 'Doba přípravy',
    style: 'Styl vaření'
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Header 
        title="Filtrování receptů" 
        showBack={true} 
        onBack={() => navigate('/')}
      />
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* Search and Filter Header */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Hledat recepty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setShowFilterModal(true)}
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-xl hover:border-green-300 transition-colors"
              >
                <Filter className="w-5 h-5" />
                <span>Filtry ({activeFilters.length})</span>
              </button>
            </div>
            
            {/* Active Filters */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {activeFilters.map(filter => (
                  <span
                    key={filter}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                  >
                    <span>{filter}</span>
                    <button
                      onClick={() => handleRemoveFilter(filter)}
                      className="hover:bg-green-200 rounded-full p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              
              {activeFilters.length > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  Vymazat vše
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Nalezeno {filteredRecipes.length} receptů
            </h3>
          </div>

          {filteredRecipes.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={handleRecipeClick}
                  onStartCooking={handleStartCooking}
                  showMatch={recipe.match !== undefined}
                  showTags={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-500 mb-2">Žádné recepty</h3>
              <p className="text-gray-400 mb-6">
                Nenašli jsme žádné recepty podle vašich kritérií
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Vymazat filtry
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Filtry receptů</h3>
                <button 
                  onClick={() => setShowFilterModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-96">
              {Object.entries(groupedTags).map(([type, tags]) => (
                <div key={type} className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {tagTypeNames[type] || type}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <button
                        key={tag.name}
                        onClick={() => handleToggleFilter(tag.name)}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                          activeFilters.includes(tag.name)
                            ? 'bg-green-100 text-green-800 border border-green-300'
                            : 'bg-gray-100 text-gray-700 border border-transparent hover:bg-gray-200'
                        }`}
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-gray-200">
              <div className="flex space-x-3">
                <button
                  onClick={clearAllFilters}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Vymazat vše
                </button>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Použít filtry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav currentRoute={currentRoute} navigate={navigate} />
    </div>
  );
};

export default RecipeFiltering;