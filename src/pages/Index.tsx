
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingBag, HandCoins, User, Leaf } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FarmScene from '@/components/FarmScene';
import ProductGrid from '@/components/ProductGrid';
import UserAuth from '@/components/UserAuth';
import LandingSlider from '@/components/LandingSlider';

const Index = () => {
  const [showAuth, setShowAuth] = useState(false);
  
  const handleJoinClick = () => {
    setShowAuth(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section with 3D Scene */}
      <section className="relative">
        {/* 3D Scene */}
        <div className="h-[60vh] md:h-[70vh] relative overflow-hidden">
          <LandingSlider className="h-full w-full" />
          
          {/* Overlay Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-farm-brown-dark">
                  Farm Fresh, Direct to You
                </h1>
                <p className="text-xl mb-8 text-farm-brown">
                  Connect directly with local farmers, bid on auctions, and enjoy the freshest produce delivered to your doorstep.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="bg-farm-green hover:bg-farm-green-dark text-white"
                    asChild
                  >
                    <Link to="/marketplace">
                      Start Shopping <ShoppingBag className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-farm-green text-farm-green hover:bg-farm-green/5"
                    onClick={handleJoinClick}
                  >
                    Join FarmMarket <User className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Fresh From the Farm</h2>
            <Link to="/marketplace" className="text-farm-green hover:underline flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <ProductGrid />
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How FarmMarket Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Consumers */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-farm-accent-yellow rounded-full flex items-center justify-center mb-4 mx-auto">
                <ShoppingBag className="h-8 w-8 text-farm-brown" />
              </div>
              <h3 className="text-xl font-bold text-center mb-3">For Consumers</h3>
              <ul className="space-y-3 text-center">
                <li className="text-muted-foreground">Browse high-quality local produce</li>
                <li className="text-muted-foreground">Buy directly or participate in auctions</li>
                <li className="text-muted-foreground">Support local farmers & sustainable practices</li>
                <li className="text-muted-foreground">Enjoy fresh, farm-to-table products</li>
              </ul>
              <div className="mt-6 text-center">
                <Button 
                  variant="outline" 
                  className="border-farm-green text-farm-green hover:bg-farm-green/5"
                  onClick={handleJoinClick}
                >
                  Join as Consumer
                </Button>
              </div>
            </div>
            
            {/* For Farmers */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-farm-green rounded-full flex items-center justify-center mb-4 mx-auto">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-center mb-3">For Farmers</h3>
              <ul className="space-y-3 text-center">
                <li className="text-muted-foreground">Sell your produce directly to consumers</li>
                <li className="text-muted-foreground">Create listings & set your own prices</li>
                <li className="text-muted-foreground">Host auctions for premium or limited items</li>
                <li className="text-muted-foreground">Build a loyal customer base</li>
              </ul>
              <div className="mt-6 text-center">
                <Button 
                  variant="outline" 
                  className="border-farm-green text-farm-green hover:bg-farm-green/5"
                  onClick={handleJoinClick}
                >
                  Join as Farmer
                </Button>
              </div>
            </div>
            
            {/* Auctions */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-farm-accent-orange rounded-full flex items-center justify-center mb-4 mx-auto">
                <HandCoins className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-center mb-3">Dynamic Auctions</h3>
              <ul className="space-y-3 text-center">
                <li className="text-muted-foreground">Bid on premium seasonal produce</li>
                <li className="text-muted-foreground">Get notifications for active auctions</li>
                <li className="text-muted-foreground">Secure fair prices through open bidding</li>
                <li className="text-muted-foreground">Discover unique farm products</li>
              </ul>
              <div className="mt-6 text-center">
                <Button 
                  variant="outline" 
                  className="border-farm-accent-orange text-farm-accent-orange hover:bg-farm-accent-orange/5"
                  asChild
                >
                  <Link to="/auctions">
                    View Auctions
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Auctions */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Live Auctions</h2>
            <Link to="/auctions" className="text-farm-accent-orange hover:underline flex items-center">
              All Auctions <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <ProductGrid auctionsOnly={true} />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-farm-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Farm-Fresh Quality?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join FarmMarket today and discover the difference of buying directly from local farmers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-farm-green"
              asChild
            >
              <Link to="/marketplace">
                Browse Marketplace
              </Link>
            </Button>
            <Button 
              size="lg"
              className="bg-white text-farm-green hover:bg-white/90"
              onClick={handleJoinClick}
            >
              Create Account
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-farm-brown-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">FarmMarket</h3>
              <p className="text-sm text-gray-300 mb-4">
                Connecting farmers and consumers directly for fresher, more sustainable food systems.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/marketplace" className="hover:underline">Marketplace</Link></li>
                <li><Link to="/auctions" className="hover:underline">Auctions</Link></li>
                <li><Link to="/farmers" className="hover:underline">Our Farmers</Link></li>
                <li><Link to="/about" className="hover:underline">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/faq" className="hover:underline">FAQs</Link></li>
                <li><Link to="/shipping" className="hover:underline">Shipping Policy</Link></li>
                <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Subscribe</h3>
              <p className="text-sm text-gray-300 mb-4">
                Stay updated with our latest products and offers.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 w-full rounded-l text-black text-sm"
                />
                <Button className="rounded-l-none bg-farm-accent-yellow text-black hover:bg-farm-accent-yellow/90">
                  Join
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} FarmMarket. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/terms" className="text-sm text-gray-400 hover:underline">Terms</Link>
              <Link to="/privacy" className="text-sm text-gray-400 hover:underline">Privacy</Link>
              <Link to="/cookies" className="text-sm text-gray-400 hover:underline">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Authentication Dialog */}
      <UserAuth isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
};

export default Index;
