
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import TechAssistant from './components/TechAssistant';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import ProfilePage from './components/ProfilePage';
import { Product, CartItem, Category, User, Order } from './types';
import { PRODUCTS } from './constants';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Auth & View State
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'shop' | 'profile'>('shop');
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Check for stored session
  useEffect(() => {
    const savedUser = localStorage.getItem('cybertech_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('cybertech_user');
    setCurrentView('shop');
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('cybertech_user', JSON.stringify(userData));
    setIsAuthModalOpen(false);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-blue-500/30">
      <Navbar 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        user={user}
        onAuthClick={() => user ? setCurrentView('profile') : setIsAuthModalOpen(true)}
        onHomeClick={() => setCurrentView('shop')}
      />

      <main>
        <AnimatePresence mode="wait">
          {currentView === 'shop' ? (
            <motion.div
              key="shop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero onCtaClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })} />

              <section id="shop" className="max-w-7xl mx-auto px-4 py-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                  <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="text-4xl font-orbitron font-bold tracking-tighter"
                  >
                    FUTURE <span className="text-blue-500">INVENTORY</span>
                  </motion.h2>

                  <div className="flex flex-wrap gap-2">
                    {(['All', 'Mobiles', 'Laptops', 'Audio', 'Accessories'] as Category[]).map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-6 py-2 rounded-full border transition-all duration-300 font-medium ${
                          selectedCategory === cat 
                            ? 'bg-blue-600 border-blue-600 text-white neon-glow' 
                            : 'bg-transparent border-gray-700 text-gray-400 hover:border-gray-500'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <ProductGrid 
                  products={filteredProducts} 
                  onAddToCart={addToCart} 
                  wishlist={wishlist}
                  onToggleWishlist={toggleWishlist}
                />
              </section>
            </motion.div>
          ) : (
            <ProfilePage 
              user={user!} 
              onLogout={handleLogout} 
              wishlist={wishlist}
              onBackToShop={() => setCurrentView('shop')}
            />
          )}
        </AnimatePresence>
      </main>

      <Footer />

      <AnimatePresence>
        {isCartOpen && (
          <CartSidebar 
            items={cart} 
            onClose={() => setIsCartOpen(false)} 
            onRemove={removeFromCart}
            onUpdateQty={updateQuantity}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAuthModalOpen && (
          <AuthModal 
            onClose={() => setIsAuthModalOpen(false)} 
            onLogin={handleLogin}
          />
        )}
      </AnimatePresence>

      <TechAssistant onProductClick={addToCart} />
    </div>
  );
};

export default App;
