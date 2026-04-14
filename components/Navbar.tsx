
import React, { useState } from 'react';
/* Fix: Changed CPU to Cpu to match lucide-react exports */
import { Search, ShoppingCart, Menu, X, Cpu, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  user: User | null;
  onAuthClick: () => void;
  onHomeClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, 
  onOpenCart, 
  searchQuery, 
  setSearchQuery,
  user,
  onAuthClick,
  onHomeClick
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={onHomeClick}
          >
            <div className="p-2 bg-blue-600 rounded-lg neon-glow">
              {/* Fix: Changed CPU to Cpu */}
              <Cpu size={24} className="text-white" />
            </div>
            <span className="font-orbitron text-2xl font-bold tracking-tighter hidden sm:block">
              CYBER<span className="text-blue-500">TECH</span>
            </span>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-full px-6 py-2 focus:outline-none focus:border-blue-500 transition-all text-sm"
              />
              <Search className="absolute right-4 top-2.5 text-gray-500" size={18} />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onAuthClick}
              className="flex items-center gap-2 p-2 text-gray-300 hover:text-white transition-colors"
            >
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/50 flex items-center justify-center">
                    <UserIcon size={18} className="text-blue-400" />
                  </div>
                  <span className="text-xs font-bold hidden lg:block uppercase tracking-wider">{user.name.split(' ')[0]}</span>
                </div>
              ) : (
                <UserIcon size={24} />
              )}
            </button>

            <button 
              onClick={onOpenCart}
              className="relative p-2 text-gray-300 hover:text-white transition-colors"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center neon-glow">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              className="md:hidden p-2 text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-gray-900 border-b border-gray-800 overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-4">
               <div className="relative">
                <input
                  type="text"
                  placeholder="Search tech..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-sm"
                />
                <Search className="absolute right-4 top-2.5 text-gray-500" size={18} />
              </div>
              <button onClick={() => { onAuthClick(); setIsMenuOpen(false); }} className="text-left py-2 font-bold text-gray-300">
                {user ? 'MY PROFILE' : 'LOGIN / SIGN UP'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;