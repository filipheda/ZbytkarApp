import React from 'react';
import { Home, Search, Calendar, ShoppingCart, ChefHat } from 'lucide-react';

export const BottomNav = ({ currentRoute, navigate }) => {
  const navItems = [
    {
      path: '/',
      icon: Home,
      label: 'Domů',
      active: currentRoute === '/'
    },
    {
      path: '/recipes',
      icon: Search,
      label: 'Recepty',
      active: currentRoute === '/recipes'
    },
    {
      path: '/pantry',
      icon: Calendar,
      label: 'Spíž',
      active: currentRoute === '/pantry'
    },
    {
      path: '/shopping',
      icon: ShoppingCart,
      label: 'Nákup',
      active: currentRoute === '/shopping'
    }
  ];

  return (
     <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
      <div className="flex justify-around py-2">
        {navItems.map(({ path, icon: Icon, label, active }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center p-2 min-w-0 transition-colors ${
              active ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;