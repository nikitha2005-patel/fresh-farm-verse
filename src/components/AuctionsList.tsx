
import { Product } from '@/types';
import AuctionCard from './AuctionCard';

// Filter the mock products to get only those with auctions
const getAuctionProducts = () => {
  // This would normally come from an API call
  // Using the same mock data from ProductGrid for consistency
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
        endTime: "2025-06-08T10:00:00Z",
        bidCount: 8,
        highestBidderId: "user123"
      }
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
        endTime: "2025-05-16T12:00:00Z",
        bidCount: 3,
        highestBidderId: "user456"
      }
    }
  ];
  
  return MOCK_PRODUCTS.filter(product => product.auction);
};

const AuctionsList = () => {
  const auctionProducts = getAuctionProducts();
  
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Live Auctions</h2>
        <p className="text-muted-foreground">
          Bid on fresh farm products in real-time auctions
        </p>
      </div>
      
      {auctionProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctionProducts.map((product) => (
            <AuctionCard 
              key={`auction-${product.auction?.id}`} 
              auction={product.auction!} 
              product={product} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No active auctions at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default AuctionsList;
