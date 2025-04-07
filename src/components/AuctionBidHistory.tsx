
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Award, ArrowLeft } from 'lucide-react';

interface AuctionBidHistoryProps {
  auctionId: string;
  onBack: () => void;
}

interface Bid {
  id: string;
  bidder: string;
  amount: number;
  time: string;
  isHighestBid: boolean;
}

const AuctionBidHistory = ({ auctionId, onBack }: AuctionBidHistoryProps) => {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Generate mock bid history
  useEffect(() => {
    // In a real app, we would fetch bids from an API
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockBids: Bid[] = [];
      let currentBid = 1.5; // Starting price
      const now = new Date();
      
      // Generate between 5 and 15 bids
      const bidCount = Math.floor(Math.random() * 10) + 5;
      
      for (let i = 0; i < bidCount; i++) {
        const bidIncrement = Math.random() * 0.5 + 0.1;
        currentBid += bidIncrement;
        
        // Each bid is made some time in the past
        const bidTime = new Date(now.getTime() - (bidCount - i) * 3600000);
        
        mockBids.push({
          id: `bid-${i}`,
          bidder: `user${Math.floor(Math.random() * 1000)}`,
          amount: parseFloat(currentBid.toFixed(2)),
          time: bidTime.toISOString(),
          isHighestBid: i === bidCount - 1 // Last bid is highest
        });
      }
      
      setBids(mockBids);
      setLoading(false);
    }, 500);
  }, [auctionId]);
  
  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="max-h-96 overflow-y-auto pr-1">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin h-6 w-6 border-2 border-farm-accent-orange border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <>
            {bids.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No bids have been placed yet.
              </div>
            ) : (
              <div className="space-y-1">
                {bids.slice().reverse().map((bid) => (
                  <div 
                    key={bid.id} 
                    className={`flex justify-between items-center p-3 rounded-md border ${bid.isHighestBid ? 'bg-farm-accent-orange/5 border-farm-accent-orange/20' : ''}`}
                  >
                    <div className="flex items-center">
                      {bid.isHighestBid && (
                        <Award className="mr-2 h-5 w-5 text-farm-accent-orange" />
                      )}
                      <div>
                        <p className="font-medium">{bid.bidder}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(bid.time)}</p>
                      </div>
                    </div>
                    <div className={`font-semibold text-lg ${bid.isHighestBid ? 'text-farm-accent-orange' : ''}`}>
                      {formatPrice(bid.amount)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Stats and Footer */}
      {!loading && bids.length > 0 && (
        <div className="pt-4 border-t">
          <div className="flex justify-between text-sm text-muted-foreground">
            <div>
              <p>Starting bid: {formatPrice(bids[0].amount - 0.5)}</p>
              <p>Total bids: {bids.length}</p>
            </div>
            <div className="text-right">
              <p>Current highest: {formatPrice(bids[bids.length - 1].amount)}</p>
              <p>Bid increment: {formatPrice(0.25)} (min)</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-start pt-2">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Auction
        </Button>
      </div>
    </div>
  );
};

export default AuctionBidHistory;
