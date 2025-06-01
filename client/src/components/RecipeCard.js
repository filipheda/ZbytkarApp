import React from 'react';
import { Clock, ChefHat, Star } from 'lucide-react';

export const RecipeCard = ({ 
  recipe, 
  onClick, 
  onStartCooking,
  showMatch = false,
  showTags = true,
  size = 'normal' // 'normal' | 'compact' | 'large'
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick && onClick(recipe);
  };

  const handleStartCooking = (e) => {
    e.stopPropagation();
    onStartCooking && onStartCooking(recipe);
  };

  return (
    <div 
      className={`bg-white border border-gray-200 rounded-xl hover:border-green-300 hover:shadow-md transition-all cursor-pointer ${
        size === 'compact' ? 'p-3' : 'p-4'
      }`}
      onClick={handleClick}
    >
      {/* Image placeholder */}
      <div className={`bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center mb-4 relative ${
        size === 'compact' ? 'h-24' : size === 'large' ? 'h-48' : 'h-32'
      }`}>
        <ChefHat className={`text-white ${size === 'compact' ? 'w-8 h-8' : 'w-12 h-12'}`} />
        
        {/* Match percentage */}
        {showMatch && recipe.match && (
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full">
            <span className="text-green-600 font-bold text-xs">
              {recipe.match}%
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className={`font-bold text-gray-900 ${
          size === 'compact' ? 'text-sm' : 'text-lg'
        }`}>
          {recipe.name}
        </h3>
        
        <p className={`text-gray-600 ${
          size === 'compact' ? 'text-xs' : 'text-sm'
        }`}>
          {recipe.description}
        </p>

        {/* Meta info */}
        <div className={`flex items-center justify-between text-gray-500 ${
          size === 'compact' ? 'text-xs' : 'text-sm'
        }`}>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{recipe.time} min</span>
            </span>
            <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">
              {recipe.difficulty}
            </span>
          </div>
          
          {recipe.rating && (
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs">{recipe.rating}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {showTags && recipe.tags && (
          <div className="flex flex-wrap gap-1">
            {recipe.tags.slice(0, 2).map(tag => (
              <span 
                key={tag} 
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
            {recipe.tags.length > 2 && (
              <span className="text-gray-400 text-xs">
                +{recipe.tags.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        {(onClick || onStartCooking) && (
          <div className="flex space-x-2 pt-2">
            {onClick && (
              <button
                onClick={handleClick}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm hover:bg-gray-200 transition-colors"
              >
                Detaily
              </button>
            )}
            {onStartCooking && (
              <button
                onClick={handleStartCooking}
                className="bg-green-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-green-700 transition-colors"
              >
                Vařit
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;