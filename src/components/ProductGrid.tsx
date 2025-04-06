
import { useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';

// Mock data for products with Indian crops, pulses and vegetables
const MOCK_PRODUCTS: Product[] = [
  // Crops
  {
    id: "1",
    name: "Rice",
    description: "Premium quality rice grown in the fertile fields of India.",
    price: 2.50,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer1",
    farmerName: "Indian Farms",
    organic: true,
    seasonal: false,
    stock: 100,
    unit: "kg",
    createdAt: "2023-04-10T12:00:00Z"
  },
  {
    id: "2",
    name: "Wheat",
    description: "Nutritious wheat cultivated in India's vast farmlands.",
    price: 3.00,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1530272552339-5de84dc5de91?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer2",
    farmerName: "Green Harvest",
    organic: false,
    seasonal: false,
    stock: 200,
    unit: "kg",
    createdAt: "2023-04-08T10:00:00Z"
  },
  {
    id: "3",
    name: "Maize",
    description: "Golden maize known for its rich taste and high yield.",
    price: 2.20,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1551549899-c6e902083ffe?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer3",
    farmerName: "Farm Fresh",
    organic: false,
    seasonal: false,
    stock: 150,
    unit: "kg",
    createdAt: "2023-04-09T11:00:00Z"
  },
  {
    id: "4",
    name: "Barley",
    description: "Healthy barley used in various Indian dishes and beverages.",
    price: 1.80,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1631209121750-a9f656d34153?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer4",
    farmerName: "Golden Fields",
    organic: true,
    seasonal: false,
    stock: 120,
    unit: "kg",
    createdAt: "2023-04-11T09:30:00Z",
    auction: {
      id: "auction1",
      productId: "4",
      startPrice: 1.50,
      currentPrice: 1.75,
      startTime: "2023-04-11T10:00:00Z",
      endTime: "2025-06-08T10:00:00Z",
      bidCount: 5,
      highestBidderId: "user123"
    }
  },
  {
    id: "5",
    name: "Gram",
    description: "High-protein gram, a staple pulse in Indian cuisine.",
    price: 3.50,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1648094728881-d945147aeeb0?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer5",
    farmerName: "Pulse Farms",
    organic: true,
    seasonal: false,
    stock: 80,
    unit: "kg",
    createdAt: "2023-04-07T08:45:00Z"
  },
  {
    id: "6",
    name: "Tur (Arhar)",
    description: "Nutritious tur, a key ingredient in many traditional dishes.",
    price: 4.00,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1615485500806-831e0263385e?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer6",
    farmerName: "Indian Legumes",
    organic: true,
    seasonal: false,
    stock: 90,
    unit: "kg",
    createdAt: "2023-04-06T14:20:00Z",
    auction: {
      id: "auction2",
      productId: "6",
      startPrice: 3.50,
      currentPrice: 4.15,
      startTime: "2023-04-06T15:00:00Z",
      endTime: "2025-05-16T12:00:00Z",
      bidCount: 7,
      highestBidderId: "user456"
    }
  },
  {
    id: "7",
    name: "Moong",
    description: "Split moong dal, perfect for healthy, light meals.",
    price: 3.20,
    category: "Pulses",
    image: "https://images.unsplash.com/photo-1648094728840-5003bcce6c64?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer1",
    farmerName: "Indian Farms",
    organic: true,
    seasonal: false,
    stock: 110,
    unit: "kg",
    createdAt: "2023-04-05T12:00:00Z"
  },
  {
    id: "8",
    name: "Urad",
    description: "High-quality urad dal for a variety of culinary uses.",
    price: 3.80,
    category: "Pulses",
    image: "https://images.unsplash.com/photo-1644584202258-2eb6d71e6986?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer2",
    farmerName: "Green Harvest",
    organic: false,
    seasonal: false,
    stock: 95,
    unit: "kg",
    createdAt: "2023-04-12T10:00:00Z"
  },
  {
    id: "9",
    name: "Masoor",
    description: "Red lentils known for their rich flavor and nutrition.",
    price: 3.99,
    category: "Pulses",
    image: "https://images.unsplash.com/photo-1648094728881-d945147aeeb0?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer3",
    farmerName: "Farm Fresh",
    organic: false,
    seasonal: false,
    stock: 70,
    unit: "kg",
    createdAt: "2023-04-10T11:00:00Z"
  },
  {
    id: "10",
    name: "Groundnut",
    description: "Crunchy groundnuts, ideal for snacks and traditional recipes.",
    price: 5.50,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1590742412017-3e2a927126c8?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer4",
    farmerName: "Golden Fields",
    organic: true,
    seasonal: false,
    stock: 60,
    unit: "kg",
    createdAt: "2023-04-09T15:00:00Z"
  },
  {
    id: "11",
    name: "Mustard",
    description: "High-quality mustard seeds for oil and cooking.",
    price: 2.75,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1552323543-4a4de13483a9?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer5",
    farmerName: "Pulse Farms",
    organic: false,
    seasonal: false,
    stock: 130,
    unit: "kg",
    createdAt: "2023-04-08T13:30:00Z",
    auction: {
      id: "auction3",
      productId: "11",
      startPrice: 2.50,
      currentPrice: 2.85,
      startTime: "2023-04-08T14:00:00Z",
      endTime: "2025-06-15T12:00:00Z",
      bidCount: 4,
      highestBidderId: "user789"
    }
  },
  {
    id: "12",
    name: "Soybean",
    description: "Nutritious soybean, a key ingredient in many protein-rich dishes.",
    price: 4.25,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1652351522129-7b91f42ba67a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer6",
    farmerName: "Indian Legumes",
    organic: true,
    seasonal: false,
    stock: 140,
    unit: "kg",
    createdAt: "2023-04-11T16:00:00Z"
  },
  {
    id: "13",
    name: "Sunflower",
    description: "Sunflower seeds for oil extraction and healthy snacks.",
    price: 3.10,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer1",
    farmerName: "Indian Farms",
    organic: false,
    seasonal: false,
    stock: 160,
    unit: "kg",
    createdAt: "2023-04-10T09:00:00Z"
  },
  {
    id: "14",
    name: "Sugarcane",
    description: "Juicy sugarcane harvested fresh for making natural sugar and juices.",
    price: 1.20,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1584186215631-daf974872c41?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer2",
    farmerName: "Green Harvest",
    organic: false,
    seasonal: true,
    stock: 200,
    unit: "bundle",
    createdAt: "2023-04-07T07:30:00Z"
  },
  {
    id: "15",
    name: "Cotton",
    description: "High-quality cotton suitable for textiles and clothing manufacturing.",
    price: 2.80,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1575308345464-5f2a7519b7b2?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer3",
    farmerName: "Farm Fresh",
    organic: false,
    seasonal: false,
    stock: 180,
    unit: "kg",
    createdAt: "2023-04-06T10:00:00Z"
  },
  {
    id: "16",
    name: "Jute",
    description: "Eco-friendly jute fibers used in packaging and handicrafts.",
    price: 1.90,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1602073788270-7a4c106bdf89?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer4",
    farmerName: "Golden Fields",
    organic: true,
    seasonal: false,
    stock: 150,
    unit: "kg",
    createdAt: "2023-04-05T11:00:00Z"
  },
  {
    id: "17",
    name: "Tea",
    description: "High-quality tea leaves from the renowned gardens of India.",
    price: 6.50,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1567922045116-2a00fae2ed03?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer5",
    farmerName: "Pulse Farms",
    organic: true,
    seasonal: true,
    stock: 90,
    unit: "kg",
    createdAt: "2023-04-04T14:00:00Z"
  },
  {
    id: "18",
    name: "Coffee",
    description: "Fresh coffee beans cultivated in the plantations of South India.",
    price: 7.25,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer6",
    farmerName: "Indian Legumes",
    organic: true,
    seasonal: false,
    stock: 80,
    unit: "kg",
    createdAt: "2023-04-03T16:00:00Z"
  },
  {
    id: "19",
    name: "Tobacco",
    description: "Premium tobacco grown with traditional methods.",
    price: 4.75,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1574551912958-5724ce127549?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer1",
    farmerName: "Indian Farms",
    organic: false,
    seasonal: false,
    stock: 70,
    unit: "kg",
    createdAt: "2023-04-02T13:00:00Z"
  },

  // Vegetables
  {
    id: "20",
    name: "Potato",
    description: "Fresh, high-quality potatoes from local farms.",
    price: 1.25,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer2",
    farmerName: "Green Harvest",
    organic: false,
    seasonal: false,
    stock: 100,
    unit: "kg",
    createdAt: "2023-04-11T10:00:00Z"
  },
  {
    id: "21",
    name: "Onion",
    description: "Red and white onions, perfect for everyday cooking.",
    price: 0.75,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer3",
    farmerName: "Farm Fresh",
    organic: false,
    seasonal: false,
    stock: 120,
    unit: "kg",
    createdAt: "2023-04-10T09:30:00Z"
  },
  {
    id: "22",
    name: "Tomato",
    description: "Juicy tomatoes with a rich flavor, ideal for salads and sauces.",
    price: 1.50,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1592924357229-940a66f3e523?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer4",
    farmerName: "Golden Fields",
    organic: true,
    seasonal: true,
    stock: 80,
    unit: "kg",
    createdAt: "2023-04-09T11:45:00Z"
  },
  {
    id: "23",
    name: "Brinjal",
    description: "Fresh brinjal (eggplant) perfect for curries and stir-fries.",
    price: 1.75,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1605196560547-1f28226c992f?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer5",
    farmerName: "Pulse Farms",
    organic: true,
    seasonal: false,
    stock: 90,
    unit: "kg",
    createdAt: "2023-04-08T12:00:00Z"
  },
  {
    id: "24",
    name: "Cabbage",
    description: "Crunchy cabbage ideal for salads and stir-fried dishes.",
    price: 1.20,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1551904138-6d2t359ca3be?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer6",
    farmerName: "Indian Legumes",
    organic: false,
    seasonal: false,
    stock: 70,
    unit: "kg",
    createdAt: "2023-04-07T10:30:00Z"
  },
  {
    id: "25",
    name: "Cauliflower",
    description: "Fresh cauliflower, perfect for healthy meals and curries.",
    price: 1.50,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1613743983303-b3e89f8a2b80?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer1",
    farmerName: "Indian Farms",
    organic: true,
    seasonal: false,
    stock: 60,
    unit: "kg",
    createdAt: "2023-04-06T14:30:00Z"
  },
  {
    id: "26",
    name: "Lady Finger (Okra)",
    description: "Tender okra for making delicious bhindi dishes.",
    price: 2.00,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1661435597321-80c2a7b1f231?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer2",
    farmerName: "Green Harvest",
    organic: true,
    seasonal: true,
    stock: 50,
    unit: "kg",
    createdAt: "2023-04-05T11:00:00Z"
  },
  {
    id: "27",
    name: "Carrot",
    description: "Crunchy, sweet carrots sourced from local farms.",
    price: 1.00,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer3",
    farmerName: "Farm Fresh",
    organic: true,
    seasonal: false,
    stock: 80,
    unit: "kg",
    createdAt: "2023-04-04T09:00:00Z"
  },
  {
    id: "28",
    name: "Beans",
    description: "Fresh green beans, ideal for stir-frying and salads.",
    price: 1.75,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1567374783966-aa2ef74db0e4?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer4",
    farmerName: "Golden Fields",
    organic: false,
    seasonal: false,
    stock: 90,
    unit: "kg",
    createdAt: "2023-04-03T10:00:00Z"
  },
  {
    id: "29",
    name: "Spinach",
    description: "Nutrient-rich spinach for healthy meals.",
    price: 1.50,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1576181256399-834e3b3a49bf?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer5",
    farmerName: "Pulse Farms",
    organic: true,
    seasonal: true,
    stock: 100,
    unit: "kg",
    createdAt: "2023-04-02T11:30:00Z"
  },
  {
    id: "30",
    name: "Bottle Gourd",
    description: "Fresh bottle gourd, perfect for curries and stir-fries.",
    price: 1.80,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1636378203904-1cf669d925f5?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer6",
    farmerName: "Indian Legumes",
    organic: true,
    seasonal: false,
    stock: 75,
    unit: "kg",
    createdAt: "2023-04-01T12:00:00Z"
  },
  {
    id: "31",
    name: "Pumpkin",
    description: "Fresh pumpkin, ideal for soups and festive recipes.",
    price: 2.50,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1570586437263-ab629fccc818?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer1",
    farmerName: "Indian Farms",
    organic: true,
    seasonal: true,
    stock: 40,
    unit: "kg",
    createdAt: "2023-03-31T09:00:00Z"
  },
  {
    id: "32",
    name: "Chillies",
    description: "Spicy chillies for a burst of flavor in every dish.",
    price: 1.25,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1547745726-9e5256830de3?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer2",
    farmerName: "Green Harvest",
    organic: false,
    seasonal: true,
    stock: 60,
    unit: "kg",
    createdAt: "2023-03-30T10:00:00Z"
  },

  // Fruits
  {
    id: "33",
    name: "Mango",
    description: "Juicy, delicious mangoes, a staple in Indian summers.",
    price: 5.50,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer3",
    farmerName: "Farm Fresh",
    organic: true,
    seasonal: true,
    stock: 50,
    unit: "dozen",
    createdAt: "2023-03-29T08:00:00Z",
    auction: {
      id: "auction4",
      productId: "33",
      startPrice: 5.00,
      currentPrice: 5.80,
      startTime: "2023-03-29T10:00:00Z",
      endTime: "2025-06-20T12:00:00Z",
      bidCount: 6,
      highestBidderId: "user234"
    }
  },
  {
    id: "34",
    name: "Banana",
    description: "Sweet bananas, rich in potassium and a daily essential.",
    price: 2.00,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer4",
    farmerName: "Golden Fields",
    organic: false,
    seasonal: false,
    stock: 100,
    unit: "dozen",
    createdAt: "2023-03-28T07:30:00Z"
  },
  {
    id: "35",
    name: "Papaya",
    description: "Fresh papaya, loaded with vitamins and perfect for a healthy diet.",
    price: 3.75,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer5",
    farmerName: "Pulse Farms",
    organic: true,
    seasonal: true,
    stock: 40,
    unit: "kg",
    createdAt: "2023-03-27T09:15:00Z"
  },
  {
    id: "36",
    name: "Pineapple",
    description: "Tropical pineapple with a perfect balance of sweetness and acidity.",
    price: 4.25,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer6",
    farmerName: "Indian Legumes",
    organic: true,
    seasonal: false,
    stock: 30,
    unit: "each",
    createdAt: "2023-03-26T10:00:00Z"
  },
  {
    id: "37",
    name: "Guava",
    description: "Fresh guava, rich in vitamin C and perfect for a healthy snack.",
    price: 2.75,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer1",
    farmerName: "Indian Farms",
    organic: true,
    seasonal: true,
    stock: 45,
    unit: "kg",
    createdAt: "2023-03-25T11:00:00Z"
  },
  {
    id: "38",
    name: "Pomegranate",
    description: "Juicy pomegranate, loaded with antioxidants and a symbol of prosperity.",
    price: 6.00,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1601275222517-a8132e1f6f65?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer2",
    farmerName: "Green Harvest",
    organic: true,
    seasonal: true,
    stock: 35,
    unit: "kg",
    createdAt: "2023-03-24T12:00:00Z"
  },
  {
    id: "39",
    name: "Litchi",
    description: "Sweet and juicy litchi, a seasonal delight with a unique flavor.",
    price: 7.50,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1628885363743-fbf9c4578419?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer3",
    farmerName: "Farm Fresh",
    organic: true,
    seasonal: true,
    stock: 20,
    unit: "kg",
    createdAt: "2023-03-23T13:00:00Z"
  },
  {
    id: "40",
    name: "Lime",
    description: "Tangy lime, essential for a refreshing burst of flavor in beverages and dishes.",
    price: 1.50,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1590502593747-42a996133562?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer4",
    farmerName: "Golden Fields",
    organic: true,
    seasonal: false,
    stock: 50,
    unit: "kg",
    createdAt: "2023-03-22T14:00:00Z"
  },
  {
    id: "41",
    name: "Sapota (Chikoo)",
    description: "Sweet sapota, a tropical fruit cherished for its soft texture and rich flavor.",
    price: 3.25,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1622173271867-6fa76916b708?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer5",
    farmerName: "Pulse Farms",
    organic: true,
    seasonal: true,
    stock: 30,
    unit: "kg",
    createdAt: "2023-03-21T15:00:00Z"
  },
  {
    id: "42",
    name: "Apple",
    description: "Crisp, fresh apples perfect for snacking and baking.",
    price: 5.00,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer6",
    farmerName: "Indian Legumes",
    organic: true,
    seasonal: false,
    stock: 40,
    unit: "kg",
    createdAt: "2023-03-20T16:00:00Z"
  },
  {
    id: "43",
    name: "Pear",
    description: "Juicy and soft pears, ideal for a nutritious snack.",
    price: 4.50,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1614373371549-c7d9010d2f6d?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer1",
    farmerName: "Indian Farms",
    organic: true,
    seasonal: false,
    stock: 35,
    unit: "kg",
    createdAt: "2023-03-19T17:00:00Z"
  },
  {
    id: "44",
    name: "Peach",
    description: "Delicious peaches with a soft, juicy texture and sweet flavor.",
    price: 6.00,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1593558463273-d78fa97692d1?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer2",
    farmerName: "Green Harvest",
    organic: true,
    seasonal: true,
    stock: 30,
    unit: "kg",
    createdAt: "2023-03-18T18:00:00Z"
  },
  {
    id: "45",
    name: "Plum",
    description: "Ripe plums with a sweet-tart flavor, perfect for snacking.",
    price: 5.50,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1598061644426-75984013e254?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer3",
    farmerName: "Farm Fresh",
    organic: true,
    seasonal: true,
    stock: 25,
    unit: "kg",
    createdAt: "2023-03-17T19:00:00Z"
  },
  {
    id: "46",
    name: "Cherry",
    description: "Fresh cherries bursting with flavor and natural sweetness.",
    price: 8.00,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer4",
    farmerName: "Golden Fields",
    organic: true,
    seasonal: true,
    stock: 20,
    unit: "kg",
    createdAt: "2023-03-16T20:00:00Z"
  }
];

interface ProductGridProps {
  title?: string;
  showFilters?: boolean;
  auctionsOnly?: boolean;
}

const ProductGrid = ({ title, showFilters = false, auctionsOnly = false }: ProductGridProps) => {
  const [category, setCategory] = useState<string | null>(null);
  const [organicOnly, setOrganicOnly] = useState(false);

  // Filter products based on current filters and auction setting
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    if (auctionsOnly && !product.auction) return false;
    if (category && product.category !== category) return false;
    if (organicOnly && !product.organic) return false;
    return true;
  });

  // Extract unique categories for filter
  const categories = Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)));

  return (
    <div className="w-full">
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      
      {/* Filters */}
      {showFilters && (
        <div className="mb-6 p-4 bg-secondary rounded-lg">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
              <select
                id="category"
                className="w-40 rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={category || ""}
                onChange={(e) => setCategory(e.target.value || null)}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center h-full pt-5">
              <input
                type="checkbox"
                id="organicOnly"
                checked={organicOnly}
                onChange={() => setOrganicOnly(!organicOnly)}
                className="rounded border-input h-4 w-4 text-farm-green focus:ring-farm-green"
              />
              <label htmlFor="organicOnly" className="ml-2 text-sm font-medium">
                Organic Only
              </label>
            </div>
          </div>
        </div>
      )}
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* No results message */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No products found matching your filters.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
