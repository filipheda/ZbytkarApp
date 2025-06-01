import React, { useState } from 'react';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import CookingMode from './pages/CookingMode';
import PantryManagement from './pages/PantryManagement';
import RecipeFiltering from './pages/RecipeFiltering';
import ShoppingList from './pages/ShoppingList';
import { mockData } from './utils/mockData';

function App() {
  const [currentRoute, setCurrentRoute] = useState('/');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [pantryItems, setPantryItems] = useState(mockData.pantryItems);
  const [shoppingList, setShoppingList] = useState(mockData.shoppingList);

  const navigate = (path, data = null) => {
    setCurrentRoute(path);
    if (data) {
      setSelectedRecipe(data);
    }
  };

  const renderCurrentRoute = () => {
    const commonProps = {
      currentRoute,
      navigate,
      selectedRecipe,
      pantryItems,
      setPantryItems,
      shoppingList,
      setShoppingList
    };

    switch (currentRoute) {
      case '/':
        return <Home {...commonProps} />;
      
      case `/recipe/${selectedRecipe?.id}`:
        return <RecipeDetail {...commonProps} />;
      
      case `/cooking/${selectedRecipe?.id}`:
        return <CookingMode {...commonProps} />;
      
      case '/pantry':
        return <PantryManagement {...commonProps} />;
      
      case '/recipes':
        return <RecipeFiltering {...commonProps} />;
      
      case '/shopping':
        return <ShoppingList {...commonProps} />;
      
      default:
        return <Home {...commonProps} />;
    }
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {renderCurrentRoute()}
    </div>
  );
}

export default App;