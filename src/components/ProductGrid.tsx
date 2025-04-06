
import { useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';

// Mock data for products
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Fresh Organic Tomatoes",
    description: "Locally grown organic tomatoes, picked at peak ripeness for maximum flavor.",
    price: 3.99,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1592924357229-940a66f3e523?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer1",
    farmerName: "Green Valley Farm",
    organic: true,
    seasonal: true,
    stock: 50,
    unit: "lb",
    createdAt: "2023-04-10T12:00:00Z"
  },
  {
    id: "2",
    name: "Premium Honey",
    description: "Raw, unfiltered wildflower honey harvested from our own beehives.",
    price: 8.50,
    category: "Honey & Preserves",
    image: "https://images.unsplash.com/photo-1589827577276-3cd89efd5d12?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer2",
    farmerName: "Sweet Meadows Apiary",
    organic: true,
    seasonal: false,
    stock: 25,
    unit: "jar",
    createdAt: "2023-04-05T10:30:00Z"
  },
  {
    id: "3",
    name: "Farm Fresh Eggs",
    description: "Free-range eggs from pasture-raised chickens. Rich in flavor and nutrition.",
    price: 5.99,
    category: "Dairy & Eggs",
    image: "https://images.unsplash.com/photo-1598965445063-542a69b5ce4b?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer3",
    farmerName: "Sunrise Poultry Farm",
    organic: false,
    seasonal: false,
    stock: 40,
    unit: "dozen",
    createdAt: "2023-04-08T14:15:00Z"
  },
  {
    id: "4",
    name: "Heirloom Apples",
    description: "A mix of rare heirloom apple varieties. Perfect for baking or fresh eating.",
    price: 4.25,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer4",
    farmerName: "Heritage Orchards",
    organic: false,
    seasonal: true,
    stock: 35,
    unit: "lb",
    createdAt: "2023-04-01T09:45:00Z",
    auction: {
      id: "auction1",
      productId: "4",
      startPrice: 3.50,
      currentPrice: 4.75,
      startTime: "2023-04-01T10:00:00Z",
      endTime: "2023-04-08T10:00:00Z",
      bidCount: 8,
      highestBidderId: "user123"
    }
  },
  {
    id: "5",
    name: "Artisanal Goat Cheese",
    description: "Creamy, tangy goat cheese made in small batches from our own herd's milk.",
    price: 6.99,
    category: "Dairy & Eggs",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer5",
    farmerName: "Mountain Meadow Dairy",
    organic: true,
    seasonal: false,
    stock: 15,
    unit: "8oz package",
    createdAt: "2023-04-03T16:20:00Z"
  },
  {
    id: "6",
    name: "Fresh Kale Bunches",
    description: "Nutritious, crisp kale. Great for salads, smoothies, or cooking.",
    price: 2.99,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1600315858428-8f442d378e4b?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer1",
    farmerName: "Green Valley Farm",
    organic: true,
    seasonal: false,
    stock: 30,
    unit: "bunch",
    createdAt: "2023-04-09T11:10:00Z",
    auction: {
      id: "auction2",
      productId: "6",
      startPrice: 2.00,
      currentPrice: 2.50,
      startTime: "2023-04-09T12:00:00Z",
      endTime: "2023-04-16T12:00:00Z",
      bidCount: 3,
      highestBidderId: "user456"
    }
  },
  {
    id: "7",
    name: "Grass-Fed Ground Beef",
    description: "Local, humanely raised grass-fed beef. No antibiotics or hormones.",
    price: 9.99,
    category: "Meat",
    image: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer6",
    farmerName: "Rolling Hills Ranch",
    organic: false,
    seasonal: false,
    stock: 20,
    unit: "lb",
    createdAt: "2023-04-02T08:30:00Z"
  },
  {
    id: "8",
    name: "Fresh Basil",
    description: "Fragrant, flavorful basil. Perfect for Italian dishes, pesto, or garnishing.",
    price: 2.50,
    category: "Herbs",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer1",
    farmerName: "Green Valley Farm",
    organic: true,
    seasonal: true,
    stock: 25,
    unit: "bunch",
    createdAt: "2023-04-10T09:15:00Z"
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
