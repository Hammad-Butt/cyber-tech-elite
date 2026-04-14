
import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { CartItem } from '../types';

interface CartSidebarProps {
  items: CartItem[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ items, onClose, onRemove, onUpdateQty }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" onClick={onClose} />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-gray-950 z-[70] flex flex-col shadow-2xl border-l border-gray-800"
      >
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-blue-500" />
            <h2 className="text-xl font-orbitron font-bold">YOUR CART</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <ShoppingBag size={64} className="mb-4" />
              <p className="text-lg font-medium">Your cart is empty</p>
              <button onClick={onClose} className="mt-4 text-blue-400 hover:underline">Start shopping</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-200">{item.name}</h3>
                    <button onClick={() => onRemove(item.id)} className="text-gray-500 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">${item.price}</p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-gray-900 rounded-lg p-1 border border-gray-800">
                      <button 
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="p-1 hover:bg-gray-800 rounded transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="p-1 hover:bg-gray-800 rounded transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-bold text-blue-400">${item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-800 bg-gray-900/50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400 font-medium">Subtotal</span>
              <span className="text-2xl font-orbitron font-bold">${total.toLocaleString()}</span>
            </div>
            <button className="w-full py-4 bg-blue-600 rounded-2xl font-bold text-white hover:bg-blue-700 transition-all neon-glow flex items-center justify-center gap-2">
              INITIATE CHECKOUT
              <Plus size={18} />
            </button>
            <p className="text-center text-[10px] text-gray-500 mt-4 tracking-widest uppercase">
              Secure encrypted transaction
            </p>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default CartSidebar;
