
import React from 'react';
import { Product } from '../types';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Heart } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart, wishlist, onToggleWishlist }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product, index) => {
        const isWishlisted = wishlist.includes(product.id);
        
        return (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative"
          >
            <div className="glass rounded-3xl overflow-hidden h-full flex flex-col border border-gray-800 hover:border-blue-500/50 transition-all duration-500 group-hover:-translate-y-2">
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60" />
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gray-900/80 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest text-blue-400 border border-blue-400/20">
                    {product.category.toUpperCase()}
                  </span>
                </div>

                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
                    className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                      isWishlisted ? 'bg-red-500 text-white' : 'bg-gray-900/80 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
                  </button>
                </div>

                <button 
                  onClick={() => onAddToCart(product)}
                  className="absolute bottom-4 right-4 p-3 bg-blue-600 rounded-2xl text-white transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-xl"
                >
                  <Plus size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-orbitron font-bold text-lg group-hover:text-blue-400 transition-colors">
                    {product.name}
                  </h3>
                  <span className="text-xl font-bold text-white">${product.price}</span>
                </div>
                
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                  {product.description}
                </p>

                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.specs.slice(0, 2).map(spec => (
                      <span key={spec} className="text-[10px] text-gray-500 bg-gray-800 px-2 py-1 rounded">
                        {spec}
                      </span>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => onAddToCart(product)}
                    className="w-full py-3 bg-gray-900 border border-gray-800 rounded-xl text-sm font-bold flex items-center justify-center gap-2 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all"
                  >
                    <ShoppingCart size={16} />
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
