
import { useState, useEffect } from 'react';
import { Auction, Product } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface AuctionCardProps {
  auction: Auction;
  product: Product;
}

const AuctionCard = ({ auction, product }: AuctionCardProps) => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [bidAmount, setBidAmount] = useState<number>(auction.currentPrice + 0.25);

  // Calculate time remaining for auction
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const end = new Date(auction.endTime);
      const timeRemaining = end.getTime() - now.getTime();
      
      if (timeRemaining <= 0) {
        return "Auction ended";
      }
      
      // Calculate days, hours, minutes, seconds
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      
      if (days > 0) {
        return `${days}d ${hours}h remaining`;
      } else if (hours > 0) {
        return `${hours}h ${minutes}m remaining`;
      } else {
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        return `${minutes}m ${seconds}s remaining`;
      }
    };
    
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [auction.endTime]);
  
  const handleBid = () => {
    if (bidAmount <= auction.currentPrice) {
      toast.error("Bid must be higher than the current price");
      return;
    }
    
    // Here we would normally make an API call to place the bid
    toast.success(`Bid of $${bidAmount.toFixed(2)} placed for ${product.name}`);
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full aspect-square object-cover"
          />
        </Link>
        <div className="absolute top-2 right-2">
          <Badge className="bg-farm-accent-orange text-white">
            Auction
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <Link to={`/product/${product.id}`} className="hover:underline">
          <h3 className="font-semibold text-lg">{product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">{product.farmerName}</p>
      </CardHeader>
      
      <CardContent className="space-y-4 flex-grow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Current bid:</p>
            <p className="font-bold text-xl text-farm-accent-orange">
              {formatPrice(auction.currentPrice)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Bids:</p>
            <p className="font-medium">{auction.bidCount}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="font-medium">{timeLeft}</span>
          </div>
        </div>
        
        <div>
          <p className="text-sm line-clamp-2 text-muted-foreground">{product.description}</p>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-3 pt-2">
        <div className="flex w-full">
          <input 
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(parseFloat(e.target.value))}
            step={0.25}
            min={auction.currentPrice + 0.01}
            className="w-2/3 border rounded-l px-3 py-2 text-sm"
          />
          <Button 
            className="w-1/3 rounded-l-none bg-farm-accent-orange hover:bg-farm-accent-orange/80 text-white"
            onClick={handleBid}
          >
            Bid
          </Button>
        </div>
        
        <Link to={`/product/${product.id}`} className="w-full">
          <Button variant="outline" className="w-full border-farm-green text-farm-green hover:bg-farm-green/5">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default AuctionCard;
