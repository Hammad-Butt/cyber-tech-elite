
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  specs: string[];
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'Mobiles' | 'Laptops' | 'Audio' | 'Accessories' | 'All';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  street: string;
  city: string;
  country: string;
  zip: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: { productId: string; name: string; quantity: number; price: number; image: string }[];
}
