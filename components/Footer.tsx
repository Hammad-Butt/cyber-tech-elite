
import React from 'react';
/* Fix: Changed CPU to Cpu to match lucide-react exports */
import { Cpu, Twitter, Github, Instagram, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-blue-600 rounded-lg">
                {/* Fix: Changed CPU to Cpu */}
                <Cpu size={20} className="text-white" />
              </div>
              <span className="font-orbitron text-xl font-bold tracking-tighter">
                CYBER<span className="text-blue-500">TECH</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              The world's premier destination for high-end technology and futuristic hardware solutions.
            </p>
            <div className="flex gap-4">
              <button className="p-2 bg-gray-900 border border-gray-800 rounded-lg hover:text-blue-400 transition-all"><Twitter size={18}/></button>
              <button className="p-2 bg-gray-900 border border-gray-800 rounded-lg hover:text-blue-400 transition-all"><Github size={18}/></button>
              <button className="p-2 bg-gray-900 border border-gray-800 rounded-lg hover:text-blue-400 transition-all"><Instagram size={18}/></button>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-gray-200">DIRECTORY</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Neural Laptops</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Quantum Phones</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Audio Modules</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Tactile Interfaces</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-gray-200">COMPANY</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-blue-400 transition-colors">About Mission</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Support Node</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Protocal</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Warranty Info</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-gray-200">TRANSMISSION</h4>
            <p className="text-sm text-gray-500 mb-6">Receive priority updates and exclusive hardware drop alerts.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter email..." 
                className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-sm flex-1 focus:outline-none focus:border-blue-500"
              />
              <button className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-all">
                JOIN
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-gray-900 text-[10px] text-gray-600 font-bold uppercase tracking-widest gap-6">
          <p>© 2024 CYBER-TECH ELITE SYSTEMS. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
            <a href="#" className="hover:text-white transition-colors">END USER LICENSE</a>
            <button 
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
              className="flex items-center gap-2 group hover:text-white transition-colors"
            >
              BACK TO TOP <ArrowUp size={12} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;