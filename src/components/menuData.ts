import biryani from "@/assets/dish-biryani.jpg";
import burger from "@/assets/dish-burger.jpg";
import sweets from "@/assets/dish-sweets.jpg";
import chai from "@/assets/dish-chai.jpg";
import bbq from "@/assets/dish-bbq.jpg";
import karahi from "@/assets/hero-dish.jpg";

export type Category =
  | "All"
  | "Desi"
  | "Fast Food"
  | "Biryani & Rice"
  | "Chinese"
  | "Sweets"
  | "Drinks"
  | "Soft Drinks"
  | "Roti & Bread"
  | "Special Deals";

export const categories: { name: Category; icon: string; tint: string }[] = [
  { name: "All", icon: "✦", tint: "from-[var(--frost)] to-[var(--aurora)]" },
  { name: "Desi", icon: "🔥", tint: "from-orange-300 to-rose-400" },
  { name: "Fast Food", icon: "🍔", tint: "from-yellow-200 to-amber-400" },
  { name: "Biryani & Rice", icon: "🍚", tint: "from-amber-200 to-orange-400" },
  { name: "Chinese", icon: "🥢", tint: "from-red-300 to-rose-500" },
  { name: "Sweets", icon: "🍯", tint: "from-pink-200 to-fuchsia-400" },
  { name: "Drinks", icon: "🧉", tint: "from-emerald-200 to-teal-400" },
  { name: "Soft Drinks", icon: "🥤", tint: "from-sky-200 to-blue-500" },
  { name: "Roti & Bread", icon: "🫓", tint: "from-amber-100 to-yellow-500" },
  { name: "Special Deals", icon: "⚡", tint: "from-cyan-200 to-sky-400" },
];

export type Dish = {
  name: string;
  category: Exclude<Category, "All">;
  price: number;
  rating: number;
  time: string;
  image?: string;
  badge?: string;
  desc: string;
};

export const dishes: Dish[] = [
  { name: "Chicken Karahi", category: "Desi", price: 1490, rating: 4.9, time: "25m", image: karahi, badge: "Signature", desc: "Copper-pan seared, hand-pounded spices, finished with ginger julienne." },
  { name: "Mutton Karahi", category: "Desi", price: 2290, rating: 4.8, time: "35m", desc: "Slow braised in bone broth, black pepper crust." },
  { name: "BBQ Platter", category: "Desi", price: 1890, rating: 4.9, time: "30m", image: bbq, badge: "Live fire", desc: "Seekh, bihari, malai boti, chargha wings with three chutneys." },
  { name: "Nihari", category: "Desi", price: 1290, rating: 4.9, time: "14h", desc: "Fourteen-hour shank stew, garam masala oil, lime, chilies." },
  { name: "Haleem", category: "Desi", price: 890, rating: 4.7, time: "12h", desc: "Wheat, lentils and shredded beef, whispered smoke." },
  { name: "Chicken Handi", category: "Desi", price: 1490, rating: 4.8, time: "25m", desc: "Clay pot cream, tomato & fenugreek." },
  { name: "Chicken Qorma", category: "Desi", price: 1390, rating: 4.7, time: "30m", desc: "Golden yogurt braise, brown onion silk." },

  { name: "Chicken Biryani", category: "Biryani & Rice", price: 690, rating: 4.9, time: "20m", image: biryani, badge: "Bestseller", desc: "Layered basmati, saffron milk, kewra mist." },
  { name: "Sindhi Biryani", category: "Biryani & Rice", price: 790, rating: 4.9, time: "22m", desc: "Fiery Sindhi masala, potato, plum." },
  { name: "Beef Pulao", category: "Biryani & Rice", price: 690, rating: 4.6, time: "22m", desc: "Yakhni-cooked rice, whole spices, bone marrow." },
  { name: "Chinese Fried Rice", category: "Biryani & Rice", price: 590, rating: 4.5, time: "15m", desc: "Wok-fired, spring onion, ginger oil." },

  { name: "Frost Signature Burger", category: "Fast Food", price: 890, rating: 4.8, time: "18m", image: burger, badge: "New", desc: "Double smash, aged cheddar, glacier sauce." },
  { name: "Wood-fire Pizza", category: "Fast Food", price: 1290, rating: 4.7, time: "18m", desc: "72-hour dough, San Marzano, buffalo mozzarella." },
  { name: "Loaded Fries", category: "Fast Food", price: 490, rating: 4.6, time: "12m", desc: "Truffle, aged cheddar, spring onion." },
  { name: "Chicken Sandwich", category: "Fast Food", price: 590, rating: 4.5, time: "12m", desc: "Grilled chicken, brioche, chipotle." },
  { name: "Shawarma Roll", category: "Fast Food", price: 490, rating: 4.7, time: "10m", desc: "Slow-roasted lamb, tahini, pickled cucumber." },

  { name: "Chowmein", category: "Chinese", price: 690, rating: 4.6, time: "15m", desc: "Wok noodles, garlic soy, vegetable ribbons." },
  { name: "Chicken Manchurian", category: "Chinese", price: 790, rating: 4.6, time: "18m", desc: "Crispy chicken, sweet-tangy glaze." },
  { name: "Hot & Sour Soup", category: "Chinese", price: 390, rating: 4.5, time: "8m", desc: "Peppery broth, silken tofu, black vinegar." },

  { name: "Gulab Jamun", category: "Sweets", price: 290, rating: 4.9, time: "5m", image: sweets, badge: "Chef pick", desc: "Milk dumplings in cardamom rose syrup." },
  { name: "Jalebi", category: "Sweets", price: 190, rating: 4.7, time: "5m", desc: "Crisp saffron spirals, warm syrup." },
  { name: "Ras Malai", category: "Sweets", price: 390, rating: 4.9, time: "5m", desc: "Poached cheese in saffron cream." },
  { name: "Kheer", category: "Sweets", price: 290, rating: 4.6, time: "5m", desc: "Rice, cardamom milk, pistachio dust." },
  { name: "Kaju Barfi", category: "Sweets", price: 490, rating: 4.7, time: "5m", desc: "Cashew fudge, silver leaf." },

  { name: "Cold-brew Chai", category: "Drinks", price: 390, rating: 4.9, time: "5m", image: chai, badge: "House", desc: "Cold-steeped Assam, cardamom, oat foam." },
  { name: "Kashmiri Coffee", category: "Drinks", price: 490, rating: 4.7, time: "8m", desc: "Rose, cardamom, condensed milk." },
  { name: "Fresh Juice", category: "Drinks", price: 290, rating: 4.6, time: "3m", desc: "Cold-pressed seasonal fruit." },
  { name: "Mint Margarita", category: "Drinks", price: 290, rating: 4.7, time: "3m", desc: "Mint, lime, sparkling water." },
  { name: "Mango Mocktail", category: "Drinks", price: 390, rating: 4.7, time: "3m", desc: "Alphonso, chili salt, chamomile foam." },

  { name: "Coca-Cola", category: "Soft Drinks", price: 150, rating: 4.5, time: "1m", desc: "Chilled 500ml bottle." },
  { name: "Pepsi", category: "Soft Drinks", price: 150, rating: 4.4, time: "1m", desc: "Chilled 500ml bottle." },
  { name: "Sprite", category: "Soft Drinks", price: 150, rating: 4.4, time: "1m", desc: "Chilled 500ml bottle." },

  { name: "Roghni Naan", category: "Roti & Bread", price: 120, rating: 4.7, time: "6m", desc: "Sesame, saffron, ghee brushed." },
  { name: "Garlic Naan", category: "Roti & Bread", price: 150, rating: 4.8, time: "6m", desc: "Fresh garlic, coriander, butter." },
  { name: "Chapati", category: "Roti & Bread", price: 40, rating: 4.5, time: "3m", desc: "Whole wheat, tandoor kissed." },
  { name: "Naan", category: "Roti & Bread", price: 80, rating: 4.6, time: "5m", desc: "Classic tandoor naan." },

  { name: "Family Feast", category: "Special Deals", price: 3990, rating: 4.9, time: "40m", badge: "Save 25%", desc: "Karahi, biryani, BBQ platter, 6 naans, drinks." },
  { name: "Chai & Sweets Ritual", category: "Special Deals", price: 990, rating: 4.9, time: "10m", badge: "Save 15%", desc: "Chai flight + sweets tasting for two." },
  { name: "Late-night Combo", category: "Special Deals", price: 1490, rating: 4.7, time: "20m", badge: "12–3am", desc: "Nihari, naan, chai and gulab jamun." },
];