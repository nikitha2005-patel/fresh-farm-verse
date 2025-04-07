
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Badge, 
  Calendar, 
  Clock, 
  Filter, 
  Gavel, 
  HandCoins, 
  Search, 
  SortDesc 
} from 'lucide-react';
import { Product } from '@/types';
import Navbar from '@/components/Navbar';
import AuctionCard from '@/components/AuctionCard';
import LiveAuctionCard from '@/components/LiveAuctionCard';
import AuctionBidHistory from '@/components/AuctionBidHistory';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Get auction products from AuctionsList.tsx
const getAuctionProducts = () => {
  // This would normally come from an API call
  // Using mock data based on AuctionsList.tsx
  const MOCK_PRODUCTS: Product[] = [
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
      createdAt: "2023-04-11T10:00:00Z",
      auction: {
        id: "auction5",
        productId: "20",
        startPrice: 1.00,
        currentPrice: 1.10,
        startTime: "2023-04-11T11:00:00Z",
        endTime: "2025-05-11T11:00:00Z",
        bidCount: 3,
        highestBidderId: "user567"
      }
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
      createdAt: "2023-03-25T11:00:00Z",
      auction: {
        id: "auction6",
        productId: "37",
        startPrice: 2.50,
        currentPrice: 3.25,
        startTime: "2023-03-25T12:00:00Z",
        endTime: "2025-04-25T12:00:00Z",
        bidCount: 8,
        highestBidderId: "user890"
      }
    }
  ];
  
  // Ensure all products have auction data
  return MOCK_PRODUCTS.filter(product => product.auction);
};

const Auctions = () => {
  const [auctionProducts, setAuctionProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('endingSoon');
  const [selectedAuction, setSelectedAuction] = useState<Product | null>(null);
  const [showBidHistory, setShowBidHistory] = useState(false);
  
  useEffect(() => {
    // Fetch auction products (in a real app, this would be an API call)
    const products = getAuctionProducts();
    setAuctionProducts(products);
  }, []);
  
  // Filter and sort products
  const filteredProducts = auctionProducts
    .filter(product => {
      const matchesSearch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesCategory = categoryFilter === '' || 
        product.category === categoryFilter;
        
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'endingSoon') {
        return new Date(a.auction!.endTime).getTime() - new Date(b.auction!.endTime).getTime();
      } else if (sortBy === 'highestBid') {
        return b.auction!.currentPrice - a.auction!.currentPrice;
      } else if (sortBy === 'mostBids') {
        return b.auction!.bidCount - a.auction!.bidCount;
      }
      return 0;
    });
    
  // Get unique categories for filter
  const categories = Array.from(new Set(auctionProducts.map(product => product.category)));
  
  // Find the auction with the highest bid amount for the featured spot
  const featuredAuction = [...auctionProducts].sort((a, b) => 
    b.auction!.currentPrice - a.auction!.currentPrice
  )[0];
  
  const handleBid = (product: Product, bidAmount: number) => {
    toast.success(`Bid of $${bidAmount.toFixed(2)} placed for ${product.name}`);
    // In a real app, we would update the auction data and refresh the UI
  };
  
  const handleViewBidHistory = (product: Product) => {
    setSelectedAuction(product);
    setShowBidHistory(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-farm-accent-orange/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-lg">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Live Farm Auctions
              </h1>
              <p className="text-lg mb-4">
                Bid on premium, limited-quantity produce directly from Indian farmers.
                Get the freshest, highest quality crops at competitive prices.
              </p>
              <div className="flex gap-4">
                <Button className="bg-farm-accent-orange hover:bg-farm-accent-orange/90">
                  <HandCoins className="mr-2 h-5 w-5" /> Join Live Auctions
                </Button>
                <Button variant="outline" className="border-farm-accent-orange text-farm-accent-orange hover:bg-farm-accent-orange/5">
                  How Auctions Work
                </Button>
              </div>
            </div>
            <div className="relative">
              <Badge className="absolute -top-3 -left-3 bg-farm-accent-orange z-10">Featured</Badge>
              {featuredAuction && (
                <div className="bg-white rounded-lg shadow-lg p-4 border border-muted max-w-xs">
                  <img 
                    src={featuredAuction.image} 
                    alt={featuredAuction.name}
                    className="w-full h-48 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-semibold text-lg">{featuredAuction.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{featuredAuction.farmerName}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Current bid:</p>
                      <p className="font-bold text-xl text-farm-accent-orange">
                        ${featuredAuction.auction!.currentPrice.toFixed(2)}
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-farm-accent-orange hover:bg-farm-accent-orange/90"
                      onClick={() => setSelectedAuction(featuredAuction)}
                    >
                      Bid Now
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Auction Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search auctions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      {categoryFilter || "All Categories"}
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <SortDesc className="mr-2 h-4 w-4" />
                      {sortBy === 'endingSoon' 
                        ? 'Ending Soon' 
                        : sortBy === 'highestBid' 
                          ? 'Highest Bid' 
                          : 'Most Bids'
                      }
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="endingSoon">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" /> Ending Soon
                      </div>
                    </SelectItem>
                    <SelectItem value="highestBid">
                      <div className="flex items-center">
                        <Gavel className="mr-2 h-4 w-4" /> Highest Bid
                      </div>
                    </SelectItem>
                    <SelectItem value="mostBids">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" /> Most Bids
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Auctions Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <AuctionCard 
                  key={`auction-${product.auction?.id}`} 
                  auction={product.auction!} 
                  product={product} 
                  onViewHistory={() => handleViewBidHistory(product)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <HandCoins className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <p className="mt-4 text-xl font-medium">No auctions match your filters</p>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Live Auction Dialog */}
      <Dialog 
        open={!!selectedAuction && !showBidHistory} 
        onOpenChange={(open) => !open && setSelectedAuction(null)}
      >
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
          {selectedAuction && (
            <LiveAuctionCard 
              product={selectedAuction} 
              auction={selectedAuction.auction!}
              onBid={(amount) => handleBid(selectedAuction, amount)}
              onViewHistory={() => setShowBidHistory(true)}
              onClose={() => setSelectedAuction(null)}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Bid History Dialog */}
      <Dialog 
        open={showBidHistory} 
        onOpenChange={(open) => !open && setShowBidHistory(false)}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Bid History</DialogTitle>
            <DialogDescription>
              {selectedAuction?.name} - {selectedAuction?.auction?.bidCount} bids
            </DialogDescription>
          </DialogHeader>
          {selectedAuction && (
            <AuctionBidHistory 
              auctionId={selectedAuction.auction!.id}
              onBack={() => setShowBidHistory(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Auctions;
