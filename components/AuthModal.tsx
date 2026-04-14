
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User as UserIcon, ShieldCheck } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin({
        id: 'u1',
        name: 'Neo Matrix',
        email: 'neo@cybertech.com',
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
        onClick={onClose} 
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-md glass rounded-3xl border border-blue-500/30 overflow-hidden shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-blue-600 rounded-2xl neon-glow">
              <ShieldCheck size={32} className="text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-orbitron font-bold text-center mb-2">
            {mode === 'login' ? 'ACCESS GRANTED' : 'INITIALIZE PROFILE'}
          </h2>
          <p className="text-gray-400 text-sm text-center mb-8">
            {mode === 'login' ? 'Enter your credentials to proceed' : 'Create your digital identity'}
          </p>

          <div className="flex bg-gray-900 p-1 rounded-xl mb-8 border border-gray-800">
            <button 
              onClick={() => setMode('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${mode === 'login' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              LOGIN
            </button>
            <button 
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${mode === 'signup' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              SIGN UP
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="relative">
                <UserIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Full Name"
                  required
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            )}
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="email" 
                placeholder="Email Address"
                required
                className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="password" 
                placeholder="Password"
                required
                className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <button 
              disabled={loading}
              type="submit"
              className="w-full py-4 bg-blue-600 rounded-xl font-bold hover:bg-blue-700 transition-all neon-glow flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                mode === 'login' ? 'DECRYPT & ENTER' : 'GENERATE PROFILE'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
             <p className="text-[10px] text-gray-600 tracking-widest uppercase mb-4">Or continue with</p>
             <div className="flex gap-4 justify-center">
                <button className="w-full py-2 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 transition-all text-[10px] font-bold">GOOGLE</button>
                <button className="w-full py-2 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 transition-all text-[10px] font-bold">GITHUB</button>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthModal;
