
import { useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';

// Mock data for products with Indian crops, pulses and vegetables
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Organic Basmati Rice",
    description: "Premium long-grain aromatic rice from the foothills of Himalayas. Known for its distinct aroma and taste.",
    price: 5.99,
    category: "Grains",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer1",
    farmerName: "Himalayan Organics",
    organic: true,
    seasonal: false,
    stock: 100,
    unit: "kg",
    createdAt: "2023-04-10T12:00:00Z"
  },
  {
    id: "2",
    name: "Fresh Turmeric Root",
    description: "Fresh organic turmeric root with high curcumin content. Perfect for cooking and traditional medicinal uses.",
    price: 2.50,
    category: "Spices",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9fef1b?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer2",
    farmerName: "Kerala Spice Gardens",
    organic: true,
    seasonal: false,
    stock: 45,
    unit: "250g",
    createdAt: "2023-04-05T10:30:00Z"
  },
  {
    id: "3",
    name: "Masoor Dal (Red Lentils)",
    description: "Split red lentils that cook quickly. High in protein and a staple in Indian kitchens.",
    price: 3.99,
    category: "Pulses",
    image: "https://images.unsplash.com/photo-1648094728881-d945147aeeb0?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer3",
    farmerName: "Punjab Pulse Farms",
    organic: false,
    seasonal: false,
    stock: 75,
    unit: "kg",
    createdAt: "2023-04-08T14:15:00Z"
  },
  {
    id: "4",
    name: "Organic Alphonso Mangoes",
    description: "The king of mangoes, sourced directly from Ratnagiri. Sweet, aromatic and with minimal fiber.",
    price: 8.25,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer4",
    farmerName: "Konkan Fruit Orchards",
    organic: true,
    seasonal: true,
    stock: 35,
    unit: "dozen",
    createdAt: "2023-04-01T09:45:00Z",
    auction: {
      id: "auction1",
      productId: "4",
      startPrice: 6.50,
      currentPrice: 7.75,
      startTime: "2023-04-01T10:00:00Z",
      endTime: "2025-06-08T10:00:00Z",
      bidCount: 8,
      highestBidderId: "user123"
    }
  },
  {
    id: "5",
    name: "Chana Dal (Split Chickpeas)",
    description: "High-quality split chickpeas, perfect for making traditional Indian dishes like dal and sweets.",
    price: 3.49,
    category: "Pulses",
    image: "https://images.unsplash.com/photo-1515543904379-3d757abe72d2?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer5",
    farmerName: "Madhya Pradesh Farms",
    organic: true,
    seasonal: false,
    stock: 60,
    unit: "kg",
    createdAt: "2023-04-03T16:20:00Z"
  },
  {
    id: "6",
    name: "Fresh Organic Okra (Bhindi)",
    description: "Tender, fresh okra perfect for Indian dishes like bhindi masala or fried okra.",
    price: 2.99,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1661435597321-80c2a7b1f231?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer1",
    farmerName: "Himalayan Organics",
    organic: true,
    seasonal: true,
    stock: 40,
    unit: "kg",
    createdAt: "2023-04-09T11:10:00Z",
    auction: {
      id: "auction2",
      productId: "6",
      startPrice: 2.00,
      currentPrice: 2.50,
      startTime: "2023-04-09T12:00:00Z",
      endTime: "2025-05-16T12:00:00Z",
      bidCount: 3,
      highestBidderId: "user456"
    }
  },
  {
    id: "7",
    name: "Farm-Fresh Mustard Greens (Sarson)",
    description: "Fresh mustard greens harvested daily, perfect for making sarson ka saag or adding to curries.",
    price: 1.99,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1576181256399-834e3b3a49bf?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer6",
    farmerName: "Haryana Green Farms",
    organic: false,
    seasonal: true,
    stock: 30,
    unit: "bunch",
    createdAt: "2023-04-02T08:30:00Z"
  },
  {
    id: "8",
    name: "Organic Curry Leaves",
    description: "Fresh, aromatic curry leaves essential for South Indian cooking. Adds distinct flavor to curries and chutneys.",
    price: 1.50,
    category: "Herbs",
    image: "https://images.unsplash.com/photo-1606574954754-e2ded05ea13e?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer1",
    farmerName: "Himalayan Organics",
    organic: true,
    seasonal: false,
    stock: 25,
    unit: "bunch",
    createdAt: "2023-04-10T09:15:00Z"
  },
  {
    id: "9",
    name: "Moong Dal (Split Green Gram)",
    description: "Nutritious split green gram, ideal for soups, porridges, and traditional Indian dishes.",
    price: 4.25,
    category: "Pulses",
    image: "https://images.unsplash.com/photo-1648094728840-5003bcce6c64?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer3",
    farmerName: "Punjab Pulse Farms",
    organic: true,
    seasonal: false,
    stock: 55,
    unit: "kg",
    createdAt: "2023-04-12T13:20:00Z"
  },
  {
    id: "10",
    name: "Fresh Green Cardamom Pods",
    description: "Aromatic green cardamom pods directly from the hills of Kerala. Essential for desserts and masala chai.",
    price: 12.99,
    category: "Spices",
    image: "https://images.unsplash.com/photo-1638322587325-d8e0a24a9687?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer2",
    farmerName: "Kerala Spice Gardens",
    organic: true,
    seasonal: false,
    stock: 20,
    unit: "100g",
    createdAt: "2023-04-07T16:45:00Z"
  },
  {
    id: "11",
    name: "Organic Bitter Gourd (Karela)",
    description: "Fresh bitter gourd known for its unique taste and medicinal properties in traditional medicine.",
    price: 2.75,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1622579521244-bdce25b9608e?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer6",
    farmerName: "Haryana Green Farms",
    organic: true,
    seasonal: true,
    stock: 35,
    unit: "kg",
    createdAt: "2023-04-15T10:30:00Z",
    auction: {
      id: "auction3",
      productId: "11",
      startPrice: 2.00,
      currentPrice: 2.25,
      startTime: "2023-04-15T12:00:00Z",
      endTime: "2025-06-15T12:00:00Z",
      bidCount: 2,
      highestBidderId: "user789"
    }
  },
  {
    id: "12",
    name: "Urad Dal (Black Gram)",
    description: "Split black gram essential for making dosas, idlis, and various North Indian dishes.",
    price: 4.50,
    category: "Pulses",
    image: "https://images.unsplash.com/photo-1644584202258-2eb6d71e6986?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer5",
    farmerName: "Madhya Pradesh Farms",
    organic: false,
    seasonal: false,
    stock: 65,
    unit: "kg",
    createdAt: "2023-04-06T11:45:00Z"
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
