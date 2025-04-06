
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, Menu, X, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Temporary, will use auth context

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-farm-green overflow-hidden flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <span className="font-semibold text-xl hidden sm:block">FarmMarket</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-farm-green transition-colors">
            Home
          </Link>
          <Link to="/marketplace" className="text-sm font-medium hover:text-farm-green transition-colors">
            Marketplace
          </Link>
          <Link to="/auctions" className="text-sm font-medium hover:text-farm-green transition-colors">
            Auctions
          </Link>
          <Link to="/farmers" className="text-sm font-medium hover:text-farm-green transition-colors">
            Farmers
          </Link>
        </nav>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center relative max-w-xs w-full">
          <Input
            type="text"
            placeholder="Search for produce..."
            className="pl-10 pr-4 py-2 rounded-full border-farm-brown/20"
          />
          <Search size={18} className="absolute left-3 text-muted-foreground" />
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {/* Search Icon (Mobile) */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search size={20} />
          </Button>

          {/* Shopping Cart */}
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 bg-farm-accent-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Button>

          {/* User Menu */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsLoggedIn(true)}
                className="border-farm-green text-farm-green hover:bg-farm-green/5"
              >
                Sign in
              </Button>
              <Button 
                variant="default" 
                className="bg-farm-green hover:bg-farm-green-dark"
                onClick={() => setIsLoggedIn(true)}
              >
                Join Now
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4 bg-background">
          {/* Mobile Search */}
          <div className="relative mb-4">
            <Input
              type="text"
              placeholder="Search for produce..."
              className="pl-10 pr-4 py-2 w-full rounded-full"
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
          
          {/* Mobile Navigation */}
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-base font-medium hover:text-farm-green transition-colors">
              Home
            </Link>
            <Link to="/marketplace" className="text-base font-medium hover:text-farm-green transition-colors">
              Marketplace
            </Link>
            <Link to="/auctions" className="text-base font-medium hover:text-farm-green transition-colors">
              Auctions
            </Link>
            <Link to="/farmers" className="text-base font-medium hover:text-farm-green transition-colors">
              Farmers
            </Link>

            {/* Mobile Auth Buttons */}
            {!isLoggedIn && (
              <div className="flex flex-col gap-2 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsLoggedIn(true)}
                  className="border-farm-green text-farm-green hover:bg-farm-green/5"
                >
                  Sign in
                </Button>
                <Button 
                  variant="default" 
                  onClick={() => setIsLoggedIn(true)}
                  className="bg-farm-green hover:bg-farm-green-dark"
                >
                  Join Now
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
