
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product, Bid } from '@/types';
import { Button } from '@/components/ui/button';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { 
  Clock, 
  Info, 
  Leaf, 
  ShoppingCart, 
  Truck,
  Calendar,
  User
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Mock data for a single product
const MOCK_PRODUCT: Product = {
  id: "1",
  name: "Fresh Organic Tomatoes",
  description: "These tomatoes are locally grown using organic practices, free from synthetic pesticides and fertilizers. They're picked at peak ripeness to ensure maximum flavor and nutritional value. Our sustainable farming methods ensure you're not only getting the tastiest tomatoes but also supporting environmentally friendly agriculture.",
  price: 3.99,
  category: "Vegetables",
  image: "https://images.unsplash.com/photo-1592924357229-940a66f3e523?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=600&h=600",
  farmerId: "farmer1",
  farmerName: "Green Valley Farm",
  organic: true,
  seasonal: true,
  stock: 50,
  unit: "lb",
  createdAt: "2023-04-10T12:00:00Z",
  auction: {
    id: "auction1",
    productId: "1",
    startPrice: 2.99,
    currentPrice: 3.75,
    startTime: "2023-04-10T12:00:00Z",
    endTime: "2023-04-17T12:00:00Z",
    bidCount: 5,
    highestBidderId: "user123"
  }
};

// Mock bid history
const MOCK_BIDS: Bid[] = [
  {
    id: "bid5",
    auctionId: "auction1",
    bidderId: "user123",
    bidderName: "Alex Johnson",
    amount: 3.75,
    timestamp: "2023-04-15T10:45:00Z"
  },
  {
    id: "bid4",
    auctionId: "auction1",
    bidderId: "user456",
    bidderName: "Sam Wilson",
    amount: 3.50,
    timestamp: "2023-04-14T16:30:00Z"
  },
  {
    id: "bid3",
    auctionId: "auction1",
    bidderId: "user789",
    bidderName: "Taylor Davis",
    amount: 3.25,
    timestamp: "2023-04-13T09:15:00Z"
  },
  {
    id: "bid2",
    auctionId: "auction1",
    bidderId: "user123",
    bidderName: "Alex Johnson",
    amount: 3.10,
    timestamp: "2023-04-12T14:20:00Z"
  },
  {
    id: "bid1",
    auctionId: "auction1",
    bidderId: "user456",
    bidderName: "Sam Wilson",
    amount: 2.99,
    timestamp: "2023-04-11T08:00:00Z"
  }
];

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [bidAmount, setBidAmount] = useState(0);
  const [timeLeft, setTimeLeft] = useState<string>("");

  // Fetch product and bids data
  useEffect(() => {
    // In a real app, we would fetch from API based on productId
    // For now, using mock data
    setTimeout(() => {
      setProduct(MOCK_PRODUCT);
      setBids(MOCK_BIDS);
      if (MOCK_PRODUCT.auction) {
        setBidAmount(MOCK_PRODUCT.auction.currentPrice + 0.25);
      }
      setIsLoading(false);
    }, 500);
  }, [productId]);

  // Calculate time remaining for auction
  useEffect(() => {
    if (!product?.auction) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const end = new Date(product.auction!.endTime);
      const timeRemaining = end.getTime() - now.getTime();
      
      if (timeRemaining <= 0) {
        return "Auction ended";
      }
      
      // Calculate days, hours, minutes, seconds
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
      
      if (days > 0) {
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
      } else if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`;
      } else {
        return `${minutes}m ${seconds}s`;
      }
    };
    
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [product]);

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${quantity > 1 ? 'items' : 'item'} to cart`);
  };

  const handleBid = () => {
    if (!product?.auction) return;

    if (bidAmount <= product.auction.currentPrice) {
      toast.error("Bid must be higher than current price");
      return;
    }

    // In a real app, we would make an API call to place the bid
    toast.success(`Bid of $${bidAmount.toFixed(2)} placed successfully`);

    // Update local state to simulate successful bid
    setProduct(prev => {
      if (!prev || !prev.auction) return prev;
      return {
        ...prev,
        auction: {
          ...prev.auction,
          currentPrice: bidAmount,
          bidCount: prev.auction.bidCount + 1,
          highestBidderId: "currentUser" // In a real app, this would be the actual user ID
        }
      };
    });

    // Add new bid to bid history
    const newBid: Bid = {
      id: `bid${bids.length + 1}`,
      auctionId: product.auction.id,
      bidderId: "currentUser",
      bidderName: "You", // In a real app, this would be the actual user's name
      amount: bidAmount,
      timestamp: new Date().toISOString()
    };

    setBids([newBid, ...bids]);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-farm-green"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs mb-6">
        <ul className="flex items-center gap-2">
          <li><Link to="/" className="text-muted-foreground hover:text-farm-green">Home</Link></li>
          <li className="text-muted-foreground before:content-['>'] before:mx-2">{product.category}</li>
          <li className="text-muted-foreground before:content-['>'] before:mx-2">{product.name}</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="overflow-hidden rounded-lg border">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.organic && (
                <Badge className="bg-farm-green text-white font-medium flex items-center gap-1">
                  <Leaf className="h-3 w-3" /> Organic
                </Badge>
              )}
              
              {product.seasonal && (
                <Badge className="bg-farm-accent-yellow text-black font-medium flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Seasonal
                </Badge>
              )}
              
              {product.auction && (
                <Badge className="bg-farm-accent-orange text-white font-medium">
                  Auction
                </Badge>
              )}
            </div>
            
            <div className="flex items-center mb-4">
              <Link to={`/farmer/${product.farmerId}`} className="flex items-center hover:underline">
                <User className="h-4 w-4 mr-1" />
                <span className="text-farm-green">{product.farmerName}</span>
              </Link>
            </div>

            <p className="text-muted-foreground mb-6">{product.description}</p>
          </div>

          {/* Auction Section */}
          {product.auction ? (
            <div className="bg-secondary p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Current bid:</p>
                  <p className="text-2xl font-bold text-farm-accent-orange">
                    {formatPrice(product.auction.currentPrice)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Starting price:</p>
                  <p className="font-medium">{formatPrice(product.auction.startPrice)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-1 text-farm-accent-orange" />
                  <span className="font-medium">{timeLeft}</span>
                </div>
                <div className="text-sm">
                  {product.auction.bidCount} {product.auction.bidCount === 1 ? 'bid' : 'bids'}
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(parseFloat(e.target.value))}
                  step={0.25}
                  min={product.auction.currentPrice + 0.01}
                  className="w-1/3 border rounded-md px-3 py-2"
                />
                <Button 
                  className="w-2/3 bg-farm-accent-orange hover:bg-farm-accent-orange/80 text-white"
                  onClick={handleBid}
                >
                  Place Bid
                </Button>
              </div>

              {/* Bid History */}
              <div>
                <h3 className="font-medium mb-2">Bid History</h3>
                <div className="max-h-40 overflow-y-auto border rounded-md bg-background">
                  <table className="min-w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Bidder</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Amount</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {bids.map((bid) => (
                        <tr key={bid.id} className="bg-white">
                          <td className="px-4 py-2 text-sm">{bid.bidderName}</td>
                          <td className="px-4 py-2 text-sm">{formatPrice(bid.amount)}</td>
                          <td className="px-4 py-2 text-sm text-muted-foreground">
                            {formatDate(bid.timestamp)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            /* Regular Purchase Section */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">
                  {formatPrice(product.price)}
                  <span className="text-sm font-normal text-muted-foreground ml-1">/ {product.unit}</span>
                </p>
                <div className="flex items-center">
                  <span className={`${product.stock > 10 ? 'text-farm-green' : product.stock > 0 ? 'text-farm-accent-orange' : 'text-farm-accent-red'} font-medium`}>
                    {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <div className="flex border rounded-md">
                  <button 
                    className="px-3 py-2 border-r" 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={product.stock <= 0}
                  >-</button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value))))}
                    className="w-16 text-center py-2"
                    disabled={product.stock <= 0}
                  />
                  <button 
                    className="px-3 py-2 border-l" 
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    disabled={product.stock <= 0}
                  >+</button>
                </div>
                
                <Button 
                  className="flex-1 bg-farm-green hover:bg-farm-green-dark gap-2"
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
              </div>

              <div className="flex items-center text-sm text-muted-foreground">
                <Truck className="h-4 w-4 mr-2" />
                <span>Free delivery on orders over $50</span>
              </div>
            </div>
          )}

          {/* Product Details */}
          <Accordion type="single" collapsible className="mt-8">
            <AccordionItem value="details">
              <AccordionTrigger>Product Details</AccordionTrigger>
              <AccordionContent>
                <div className="text-sm space-y-2">
                  <p><span className="font-medium">Category:</span> {product.category}</p>
                  <p><span className="font-medium">Organic:</span> {product.organic ? 'Yes' : 'No'}</p>
                  <p><span className="font-medium">Seasonal:</span> {product.seasonal ? 'Yes' : 'No'}</p>
                  <p><span className="font-medium">Farm:</span> {product.farmerName}</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shipping">
              <AccordionTrigger>Shipping & Returns</AccordionTrigger>
              <AccordionContent>
                <div className="text-sm space-y-2">
                  <p>
                    <span className="font-medium">Delivery:</span> Orders are typically delivered within 1-3 business days.
                  </p>
                  <p>
                    <span className="font-medium">Returns:</span> Due to the perishable nature of our products, we cannot accept returns.
                    If you receive damaged goods, please contact us within 24 hours.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="farm">
              <AccordionTrigger>About the Farm</AccordionTrigger>
              <AccordionContent>
                <div className="text-sm space-y-2">
                  <p>
                    <Link to={`/farmer/${product.farmerId}`} className="text-farm-green hover:underline font-medium">
                      {product.farmerName}
                    </Link> specializes in growing high-quality produce using sustainable farming practices.
                  </p>
                  <p>
                    Visit their farm page to learn more about their growing methods and see other available products.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
