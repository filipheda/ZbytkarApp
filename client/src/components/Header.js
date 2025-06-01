import React from 'react';
import { ArrowLeft, User, Menu } from 'lucide-react';

export const Header = ({ 
  title, 
  showBack = false, 
  showProfile = true, 
  showMenu = false,
  onBack,
  onMenuClick 
}) => (
  <div className="bg-white shadow-sm sticky top-0 z-40">
    <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
      {/* Left side */}
      {showBack ? (
        <button 
          onClick={onBack} 
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden md:inline text-sm">Zpět</span>
        </button>
      ) : showMenu ? (
        <button 
          onClick={onMenuClick}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 md:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
      ) : (
        <div className="w-8"></div>
      )}

      {/* Title */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 text-center flex-1 md:flex-none">
        {title}
      </h1>

      {/* Right side */}
      {showProfile ? (
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <User className="w-6 h-6 text-gray-600" />
        </button>
      ) : (
        <div className="w-8"></div>
      )}
    </div>
  </div>
);

export default Header;