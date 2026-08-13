// Run via node or ts-node: npx ts-node scripts/seed.ts

const API_URL = 'https://kitchen-server-d763.onrender.com/food';

const INITIAL_FOOD_ITEMS = [
  {
    name: 'Pounded Yam & Egusi Soup',
    category: 'Swallow',
    price: 3500,
    description: 'Smooth pounded yam served with rich, well-seasoned egusi soup and stockfish.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Amala with Ewedu & Gbegiri',
    category: 'Swallow',
    price: 3000,
    description: 'Authentic dark amala served with smooth gbegiri (bean soup) and fresh ewedu.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Smokey Party Jollof Rice',
    category: 'Rice & Spaghetti',
    price: 2500,
    description: 'Classic firewood-infused Nigerian jollof rice served with fried plantains.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Spicy Stir-Fry Spaghetti',
    category: 'Rice & Spaghetti',
    price: 2800,
    description: 'Wok-tossed spaghetti prepared with scotch bonnet, bell peppers, and carrots.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Grilled Peppered Goat Meat (Asun)',
    category: 'Proteins',
    price: 4000,
    description: 'Tender, flame-grilled goat meat tossed in spicy habanero pepper sauce.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Sweet Fried Plantain (Dodo)',
    category: 'Sides',
    price: 1000,
    description: 'Golden, naturally sweet fried ripe plantain slices.',
    image: 'https://images.unsplash.com/photo-1628191010210-a59de33e5941?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Chilled Zobo Drink (75cl)',
    category: 'Drinks',
    price: 1200,
    description: 'Refreshing hibiscus beverage infused with ginger, pineapple, and mint leaves.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Nigerian Meat Pie (2 Pcs)',
    category: 'Snacks',
    price: 1800,
    description: 'Flaky pastry filled with minced beef, potatoes, and rich gravy.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
  },
];

async function seedDatabase() {
  console.log('🌱 Starting database seeding...');
  
  for (const item of INITIAL_FOOD_ITEMS) {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });

      if (res.ok) {
        console.log(`✅ Seeded: ${item.name}`);
      } else {
        console.error(`❌ Failed to seed: ${item.name}`);
      }
    } catch (err) {
      console.error(`⚠️ Error sending item ${item.name}:`, err);
    }
  }
  
  console.log('🎉 Seeding completed!');
}

seedDatabase();