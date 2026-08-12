export interface MenuItem {
  id: string;
  name: string;
  category: 'Swallow' | 'Rice & Spaghetti' | 'Proteins' | 'Sides' | 'Drinks' | 'Snacks';
  price: number;
  description: string;
  image: string;
}

export const CATEGORIES = [
  'All',
  'Swallow',
  'Rice & Spaghetti',
  'Proteins',
  'Sides',
  'Drinks',
  'Snacks',
] as const;

export const MENU_ITEMS: MenuItem[] = [
  // Swallow
  {
    id: 'sw-1',
    name: 'Pounded Yam & Egusi Soup',
    category: 'Swallow',
    price: 3500,
    description: 'Smooth pounded yam served with rich, well-seasoned egusi soup and stockfish.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sw-2',
    name: 'Amala with Ewedu & Gbegiri',
    category: 'Swallow',
    price: 3000,
    description: 'Authentic dark amala served with smooth gbegiri (bean soup) and fresh ewedu.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80',
  },

  // Rice & Spaghetti
  {
    id: 'rs-1',
    name: 'Smokey Party Jollof Rice',
    category: 'Rice & Spaghetti',
    price: 2500,
    description: 'Classic firewood-infused Nigerian jollof rice served with fried plantains.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'rs-2',
    name: 'Spicy Stir-Fry Spaghetti',
    category: 'Rice & Spaghetti',
    price: 2800,
    description: 'Wok-tossed spaghetti prepared with scotch bonnet, bell peppers, and carrots.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
  },

  // Proteins
  {
    id: 'pr-1',
    name: 'Grilled Peppered Goat Meat (Asun)',
    category: 'Proteins',
    price: 4000,
    description: 'Tender, flame-grilled goat meat tossed in spicy habanero pepper sauce.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'pr-2',
    name: 'Crispy Fried Chicken Lap',
    category: 'Proteins',
    price: 2200,
    description: 'Deep-fried marinated chicken seasoned with traditional spices.',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=600&q=80',
  },

  // Sides
  {
    id: 'sd-1',
    name: 'Sweet Fried Plantain (Dodo)',
    category: 'Sides',
    price: 1000,
    description: 'Golden, naturally sweet fried ripe plantain slices.',
    image: 'https://images.unsplash.com/photo-1628191010210-a59de33e5941?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sd-2',
    name: 'Moin Moin Elephant',
    category: 'Sides',
    price: 1200,
    description: 'Steamed savory bean pudding made with boiled eggs and fish flakes.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
  },

  // Drinks
  {
    id: 'dr-1',
    name: 'Chilled Zobo Drink (75cl)',
    category: 'Drinks',
    price: 1200,
    description: 'Refreshing hibiscus beverage infused with ginger, pineapple, and mint leaves.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'dr-2',
    name: 'Fresh Pineapple Juice',
    category: 'Drinks',
    price: 1500,
    description: '100% natural cold-pressed fresh pineapple juice without added sugar.',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=600&q=80',
  },

  // Snacks
  {
    id: 'sn-1',
    name: 'Nigerian Meat Pie (2 Pcs)',
    category: 'Snacks',
    price: 1800,
    description: 'Flaky pastry filled with minced beef, potatoes, and rich gravy.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
  },
];