
import React, { useState } from 'react';
import { motion } from 'framer-motion';
/* Fix: Added Lock to imports to resolve JSX element conflict with global Lock class */
import { 
  Package, MapPin, Heart, LogOut, ChevronRight, 
  ExternalLink, ArrowLeft, Settings, Shield, CreditCard, Lock
} from 'lucide-react';
import { User, Order, Address, Product } from '../types';
import { PRODUCTS } from '../constants';

interface ProfilePageProps {
  user: User;
  onLogout: () => void;
  wishlist: string[];
  onBackToShop: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogout, wishlist, onBackToShop }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist' | 'settings'>('orders');

  const MOCK_ORDERS: Order[] = [
    {
      id: 'ORD-8291',
      date: '2023-11-20',
      status: 'Delivered',
      total: 1548,
      items: [
        { productId: '1', name: 'Nebula Pro Max', quantity: 1, price: 1199, image: PRODUCTS[0].image },
        { productId: '3', name: 'Sonic Aura G7', quantity: 1, price: 349, image: PRODUCTS[2].image }
      ]
    },
    {
      id: 'ORD-7742',
      date: '2023-10-05',
      status: 'Processing',
      total: 129,
      items: [
        { productId: '6', name: 'Vector Mouse Z', quantity: 1, price: 129, image: PRODUCTS[5].image }
      ]
    }
  ];

  const MOCK_ADDRESSES: Address[] = [
    { id: 'a1', type: 'Home', street: '221B Baker St', city: 'London', country: 'UK', zip: 'NW1 6XE' },
    { id: 'a2', type: 'Work', street: 'One Microsoft Way', city: 'Redmond', country: 'USA', zip: '98052' }
  ];

  const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  const tabs = [
    { id: 'orders', label: 'ORDERS', icon: Package },
    { id: 'wishlist', label: 'WISHLIST', icon: Heart },
    { id: 'addresses', label: 'ADDRESSES', icon: MapPin },
    { id: 'settings', label: 'SECURITY', icon: Shield },
  ] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button 
        onClick={onBackToShop}
        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        BACK TO CATALOG
      </button>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <div className="glass rounded-3xl p-8 border border-gray-800">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 p-1 mb-6">
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center border-4 border-gray-900">
                  <span className="text-3xl font-orbitron font-bold text-blue-500">
                    {user.name.charAt(0)}
                  </span>
                </div>
              </div>
              <h2 className="text-xl font-orbitron font-bold mb-1">{user.name}</h2>
              <p className="text-xs text-gray-500 font-medium mb-6">{user.email}</p>
              
              <div className="w-full space-y-2 pt-6 border-t border-gray-800">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      activeTab === tab.id 
                        ? 'bg-blue-600 text-white neon-glow' 
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </button>
                ))}
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all mt-4"
                >
                  <LogOut size={18} />
                  LOGOUT
                </button>
              </div>
            </div>
          </div>
          
          <div className="glass rounded-3xl p-6 border border-gray-800 bg-blue-600/5">
             <div className="flex items-center gap-3 mb-4">
                <CreditCard className="text-blue-500" size={20} />
                <h3 className="font-bold text-sm tracking-widest">CYBER REWARDS</h3>
             </div>
             <div className="flex items-end justify-between">
                <div>
                   <p className="text-[10px] text-gray-500 mb-1">AVAILABLE BALANCE</p>
                   <p className="text-2xl font-orbitron font-bold text-white">4,820 <span className="text-xs text-blue-500">PTS</span></p>
                </div>
                <button className="text-[10px] font-bold text-blue-400 hover:underline underline-offset-4">REDEEM</button>
             </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-orbitron font-bold">
                {tabs.find(t => t.id === activeTab)?.label}
              </h1>
              {activeTab === 'addresses' && (
                <button className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-xs font-bold hover:bg-gray-800 transition-all">
                  + ADD NEW ADDRESS
                </button>
              )}
            </div>

            {activeTab === 'orders' && (
              <div className="space-y-4">
                {MOCK_ORDERS.map(order => (
                  <div key={order.id} className="glass rounded-3xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all">
                    <div className="bg-gray-900/50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-800">
                      <div className="flex gap-8">
                        <div>
                          <p className="text-[10px] text-gray-500 font-bold mb-1">ORDER ID</p>
                          <p className="text-xs font-bold">{order.id}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 font-bold mb-1">DATE</p>
                          <p className="text-xs font-bold">{order.date}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 font-bold mb-1">TOTAL</p>
                          <p className="text-xs font-bold text-blue-400">${order.total}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                          order.status === 'Delivered' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                        }`}>
                          {order.status.toUpperCase()}
                        </span>
                        <button className="text-gray-400 hover:text-white transition-colors"><ChevronRight size={18} /></button>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex gap-4">
                        {order.items.map(item => (
                          <div key={item.productId} className="w-16 h-16 rounded-xl bg-gray-900 border border-gray-800 overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-70" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {wishlistProducts.length === 0 ? (
                  <div className="col-span-full py-20 flex flex-col items-center opacity-30">
                    <Heart size={64} className="mb-4" />
                    <p className="text-xl font-bold">YOUR WISHLIST IS VOID</p>
                  </div>
                ) : (
                  wishlistProducts.map(p => (
                    <div key={p.id} className="glass rounded-3xl p-4 border border-gray-800 flex gap-4 group hover:border-blue-500/30 transition-all">
                      <div className="w-24 h-24 rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden shrink-0">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex-1 py-1">
                        <h4 className="font-bold mb-1">{p.name}</h4>
                        <p className="text-blue-400 font-bold text-sm mb-4">${p.price}</p>
                        <div className="flex gap-2">
                          <button className="text-[10px] font-bold text-gray-500 hover:text-white uppercase transition-all">VIEW</button>
                          <span className="text-gray-800">|</span>
                          <button className="text-[10px] font-bold text-red-500/70 hover:text-red-500 uppercase transition-all">REMOVE</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MOCK_ADDRESSES.map(addr => (
                  <div key={addr.id} className="glass rounded-3xl p-6 border border-gray-800 relative group">
                    <div className="flex items-center gap-3 mb-6">
                       <div className="p-2 bg-gray-900 rounded-lg">
                          <MapPin size={18} className="text-blue-500" />
                       </div>
                       <h4 className="font-orbitron font-bold text-sm">{addr.type.toUpperCase()}</h4>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-200 font-medium">{addr.street}</p>
                      <p className="text-gray-500 text-sm">{addr.city}, {addr.zip}</p>
                      <p className="text-gray-500 text-sm uppercase font-bold tracking-widest">{addr.country}</p>
                    </div>
                    <div className="mt-8 flex gap-4">
                       <button className="text-[10px] font-bold text-blue-400 hover:underline">EDIT</button>
                       <button className="text-[10px] font-bold text-gray-600 hover:text-red-500">DELETE</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="glass rounded-3xl p-8 border border-gray-800 space-y-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Settings size={20} className="text-blue-500" />
                    ACCOUNT SETTINGS
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Display Name</label>
                      <input type="text" defaultValue={user.name} className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Email Address</label>
                      <input type="email" defaultValue={user.email} className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" />
                    </div>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-gray-800 space-y-4">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    {/* Fix: Lock component now correctly imported from lucide-react */}
                    <Lock size={20} className="text-blue-500" />
                    SECURITY
                  </h3>
                  <button className="px-6 py-3 bg-gray-900 border border-gray-800 rounded-xl text-sm font-bold hover:bg-gray-800 transition-all">
                    CHANGE PASSWORD
                  </button>
                  <div className="flex items-center justify-between p-4 bg-blue-600/5 rounded-2xl border border-blue-500/20">
                    <div>
                      <p className="text-sm font-bold">2-FACTOR AUTHENTICATION</p>
                      <p className="text-xs text-gray-500">Add an extra layer of security to your account.</p>
                    </div>
                    <div className="w-12 h-6 bg-gray-800 rounded-full relative cursor-pointer">
                       <div className="absolute right-1 top-1 w-4 h-4 bg-blue-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;