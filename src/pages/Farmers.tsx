
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Leaf, MapPin, Search, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

// Mock data for farmers
const mockFarmers = [
  {
    id: "f1",
    name: "Raj Patel",
    location: "Gujarat",
    rating: 4.8,
    organic: true,
    specialties: ["Rice", "Wheat", "Pulses"],
    image: "https://images.unsplash.com/photo-1571504211935-1c936b327535?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    description: "Third-generation farmer specializing in traditional crop varieties grown using sustainable practices."
  },
  {
    id: "f2",
    name: "Lakshmi Devi",
    location: "Tamil Nadu",
    rating: 4.9,
    organic: true,
    specialties: ["Fruits", "Rice", "Spices"],
    image: "https://images.unsplash.com/photo-1617878227827-8360231f7f03?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80", 
    description: "Family-run farm focusing on organic fruits and heritage rice varieties."
  },
  {
    id: "f3",
    name: "Amit Singh",
    location: "Punjab",
    rating: 4.7,
    organic: false,
    specialties: ["Wheat", "Vegetables", "Dairy"],
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    description: "Modern farming techniques with a focus on high-quality wheat and seasonal vegetables."
  },
  {
    id: "f4",
    name: "Priya Sharma",
    location: "Kerala",
    rating: 4.9,
    organic: true,
    specialties: ["Spices", "Tea", "Coconut"],
    image: "https://images.unsplash.com/photo-1616244013235-89a929ded525?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    description: "Specializing in premium spices and tea grown using traditional organic methods."
  },
  {
    id: "f5",
    name: "Mohan Reddy",
    location: "Andhra Pradesh",
    rating: 4.6,
    organic: false,
    specialties: ["Rice", "Vegetables", "Fruits"],
    image: "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    description: "Family farm producing a variety of crops using both traditional and modern farming techniques."
  },
  {
    id: "f6",
    name: "Anjali Puri",
    location: "Himachal Pradesh",
    rating: 4.8,
    organic: true,
    specialties: ["Apples", "Nuts", "Honey"],
    image: "https://images.unsplash.com/photo-1520420097861-01d7b85c3908?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    description: "Mountain farmer specializing in heirloom apple varieties and organic honey production."
  }
];

const Farmers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<'all' | 'organic'>('all');
  
  // Filter farmers based on search term and filter
  const filteredFarmers = mockFarmers.filter(farmer => {
    const matchesSearch = 
      searchTerm === "" || 
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'organic' && farmer.organic);
    
    return matchesSearch && matchesFilter;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-farm-green py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet Our Farmers
            </h1>
            <p className="text-white/90 text-lg mb-6">
              Connect directly with the passionate individuals who grow your food. 
              Learn their stories and discover the care that goes into every harvest.
            </p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Search farmers by name, location, or specialty..." 
                className="pl-10 py-6 text-lg bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Filter Section */}
      <section className="py-6 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-farm-green hover:bg-farm-green-dark' : ''}
            >
              All Farmers
            </Button>
            <Button 
              variant={filter === 'organic' ? 'default' : 'outline'}
              onClick={() => setFilter('organic')}
              className={filter === 'organic' ? 'bg-farm-green hover:bg-farm-green-dark' : ''}
            >
              <Leaf className="mr-2 h-4 w-4" /> Organic Farmers
            </Button>
          </div>
        </div>
      </section>
      
      {/* Farmers Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFarmers.map((farmer) => (
              <Card key={farmer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative pt-[60%] bg-muted">
                    <Avatar className="absolute inset-0 w-full h-full rounded-none">
                      <AvatarImage src={farmer.image} alt={farmer.name} className="object-cover" />
                      <AvatarFallback className="rounded-none text-2xl">{farmer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-xl">{farmer.name}</h3>
                    <div className="flex items-center text-yellow-500">
                      <Star className="fill-current h-4 w-4 mr-1" />
                      <span>{farmer.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-3 text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{farmer.location}</span>
                  </div>
                  
                  {farmer.organic && (
                    <Badge className="mb-3 bg-farm-green text-white">
                      <Leaf className="mr-1 h-3 w-3" /> Organic
                    </Badge>
                  )}
                  
                  <p className="text-muted-foreground mb-3 line-clamp-2">
                    {farmer.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {farmer.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full bg-farm-green hover:bg-farm-green-dark"
                    asChild
                  >
                    <Link to={`/farmer/${farmer.id}`}>
                      View Profile
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Farmers;
