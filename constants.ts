
// Added Category to the imports from types.ts
import { Product, Category } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Nebula Pro Max',
    category: 'Mobiles',
    price: 1199,
    description: 'The ultimate smartphone with 8K holographic display.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
    specs: ['Snapdragon X3', '16GB RAM', '512GB Storage', '200MP Camera'],
    featured: true
  },
  {
    id: '2',
    name: 'Zenith Blade 16',
    category: 'Laptops',
    price: 2499,
    description: 'Ultra-thin gaming laptop with liquid metal cooling.',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
    specs: ['RTX 5090', 'Intel Core i9-15th Gen', '64GB DDR5', '4K OLED 240Hz'],
    featured: true
  },
  {
    id: '3',
    name: 'Sonic Aura G7',
    category: 'Audio',
    price: 349,
    description: 'Studio-grade noise canceling headphones.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    specs: ['Spatial Audio', '60hr Battery', 'Adaptive ANC', 'Titanium Drivers'],
    featured: true
  },
  {
    id: '4',
    name: 'Titan Mechanical K1',
    category: 'Accessories',
    price: 189,
    description: 'Low-profile optical mechanical keyboard.',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80',
    specs: ['Optical Switches', 'Aluminum Frame', 'RGB Per-Key', 'Wireless 2.4GHz']
  },
  {
    id: '5',
    name: 'Swift Pods Pro',
    category: 'Audio',
    price: 249,
    description: 'Next-gen earbuds with bone conduction tech.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
    specs: ['Waterproof IP68', '36hr Total Playback', 'Smart Touch', 'Instant Pair']
  },
  {
    id: '6',
    name: 'Vector Mouse Z',
    category: 'Accessories',
    price: 129,
    description: 'Ultralight gaming mouse for pro-level precision.',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
    specs: ['32K DPI Sensor', '48g Weight', 'Magnesium Chassis', 'Zero Latency']
  },
  {
    id: '7',
    name: 'Titan Book Ultra',
    category: 'Laptops',
    price: 3299,
    description: 'The world\'s most powerful mobile workstation.',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80',
    specs: ['NVIDIA RTX 6000 Ada', '128GB RAM', '4TB SSD', 'Thunderbolt 5']
  },
  {
    id: '8',
    name: 'Echo Buds Lite',
    category: 'Audio',
    price: 79,
    description: 'Crystal clear calls in a compact design.',
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&q=80',
    specs: ['Bluetooth 5.3', 'USB-C Charging', 'Compact Case', 'Dual Mics']
  }
];

// Correctly typing CATEGORIES using the imported Category type
export const CATEGORIES: Category[] = ['All', 'Mobiles', 'Laptops', 'Audio', 'Accessories'];
