import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  User, MapPin, Phone, Mail, Calendar, 
  Leaf, Tractor, Award, ChevronLeft, MessageCircle, 
  ShoppingBag, Star, Share2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from "@/components/Navbar";
import { toast } from 'sonner';

// Mock farmers data
const mockFarmers = [
  {
    id: "f1",
    name: "Raj Patel",
    email: "raj.patel@example.com",
    phone: "+91 98765 43210",
    location: "Gujarat, India",
    bio: "Third-generation farmer specializing in traditional crop varieties grown using sustainable practices. Our farm has been in the family for over 75 years.",
    farmName: "Patel Organic Farms",
    farmingExperience: 15,
    farmSize: "25 acres",
    organicCertified: true,
    establishedYear: "1948",
    specialties: ["Rice", "Wheat", "Pulses", "Cotton"],
    rating: 4.8,
    reviewCount: 124,
    profileImage: "https://images.unsplash.com/photo-1571504211935-1c936b327535?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    farmPhotos: [
      "https://images.unsplash.com/photo-1500076656116-558758c991c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1629726212504-1f5f09676cb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ],
    achievements: [
      "State Agriculture Award 2023",
      "Organic Farming Excellence Certificate",
      "Community Leader Award 2022"
    ],
    certifications: [
      "Organic Certification (2015)",
      "Sustainable Farming Practices (2018)",
      "Fair Trade Certification (2020)"
    ],
    activeProducts: 12,
    // Mock reviews
    reviews: [
      {
        id: "r1",
        userId: "u1",
        userName: "Amit Kumar",
        rating: 5,
        date: "2023-12-15",
        comment: "Exceptional quality products. The rice I purchased was fresh and had amazing flavor.",
        userImage: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
      },
      {
        id: "r2",
        userId: "u2",
        userName: "Priya Sharma",
        rating: 4,
        date: "2023-11-20",
        comment: "Very good quality wheat. Delivery was prompt and the packaging was excellent.",
        userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
      },
      {
        id: "r3",
        userId: "u3",
        userName: "Rahul Singh",
        rating: 5,
        date: "2023-10-05",
        comment: "The organic cotton is of exceptional quality. Will definitely buy again.",
        userImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
      }
    ],
    // Mock products
    products: [
      {
        id: "p1",
        name: "Organic Basmati Rice",
        price: 120,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "p2",
        name: "Whole Wheat",
        price: 45,
        image: "https://images.unsplash.com/photo-1568347355280-d33fcd569dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "p3",
        name: "Organic Cotton",
        price: 600,
        image: "https://images.unsplash.com/photo-1605405400344-15d1df89b164?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "p4",
        name: "Red Lentils",
        price: 90,
        image: "https://images.unsplash.com/photo-1634467524884-857d99081c8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
      }
    ]
  },
  {
    id: "f2",
    name: "Lakshmi Devi",
    email: "lakshmi.devi@example.com",
    phone: "+91 87654 32109",
    location: "Tamil Nadu, India",
    bio: "Family-run farm focusing on organic fruits and heritage rice varieties with traditional farming techniques passed down through generations.",
    farmName: "Heritage Organic Fields",
    farmingExperience: 20,
    farmSize: "15 acres",
    organicCertified: true,
    establishedYear: "1965",
    specialties: ["Fruits", "Rice", "Spices"],
    rating: 4.9,
    reviewCount: 98,
    profileImage: "https://images.unsplash.com/photo-1617878227827-8360231f7f03?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    farmPhotos: [
      "https://images.unsplash.com/photo-1592982537447-7440770faae9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ],
    achievements: [
      "Best Organic Farm Award 2022",
      "Heritage Crop Preservation Recognition",
      "Sustainable Farming Pioneer 2021"
    ],
    certifications: [
      "Organic India Certification",
      "Heritage Crop Preservation",
      "Water Conservation Excellence"
    ],
    activeProducts: 9,
    reviews: [
      {
        id: "r4",
        userId: "u4",
        userName: "Vijay Kumar",
        rating: 5,
        date: "2023-12-20",
        comment: "The mangoes were incredibly sweet and juicy. Best I've had in years.",
        userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
      },
      {
        id: "r5",
        userId: "u5",
        userName: "Ananya Patel",
        rating: 5,
        date: "2023-11-15",
        comment: "Their heritage rice varieties are exceptional. The flavor is unlike anything you get in stores.",
        userImage: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
      }
    ],
    products: [
      {
        id: "p5",
        name: "Alphonso Mangoes",
        price: 450,
        image: "https://images.unsplash.com/photo-1605027990121-cbae9e0642df?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "p6",
        name: "Heritage Rice",
        price: 190,
        image: "https://images.unsplash.com/photo-1590166223826-12dee1677420?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "p7",
        name: "Organic Turmeric",
        price: 120,
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
      }
    ]
  },
  // Other farmers remain the same...
  {
    id: "f3",
    name: "Amit Singh",
    location: "Punjab, India",
    rating: 4.7,
    organic: false,
    specialties: ["Wheat", "Vegetables", "Dairy"],
    profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
  },
  {
    id: "f4",
    name: "Priya Sharma",
    location: "Kerala, India",
    rating: 4.9,
    organic: true,
    specialties: ["Spices", "Tea", "Coconut"],
    profileImage: "https://images.unsplash.com/photo-1616244013235-89a929ded525?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
  },
  {
    id: "f5",
    name: "Mohan Reddy",
    location: "Andhra Pradesh, India",
    rating: 4.6,
    organic: false,
    specialties: ["Rice", "Vegetables", "Fruits"],
    profileImage: "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
  },
  {
    id: "f6",
    name: "Anjali Puri",
    location: "Himachal Pradesh, India",
    rating: 4.8,
    organic: true,
    specialties: ["Apples", "Nuts", "Honey"],
    profileImage: "https://images.unsplash.com/photo-1520420097861-01d7b85c3908?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
  }
];

const FarmerPublicProfile = () => {
  const { farmerId } = useParams<{ farmerId: string }>();
  const [farmer, setFarmer] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("about");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, fetch farmer data from API
    // For now, using mock data
    setLoading(true);
    const foundFarmer = mockFarmers.find(f => f.id === farmerId);
    
    if (foundFarmer) {
      setFarmer(foundFarmer);
    }
    
    setLoading(false);
  }, [farmerId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto py-12 flex justify-center">
          <p className="text-muted-foreground">Loading farmer profile...</p>
        </div>
      </div>
    );
  }

  if (!farmer) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto py-12 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Farmer Not Found</h2>
          <p className="text-muted-foreground mb-6">We couldn't find the farmer you're looking for.</p>
          <Button asChild>
            <Link to="/farmers">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Farmers
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleContactFarmer = () => {
    toast.success("Message sent to farmer. They will contact you soon.");
  };

  const handleShareProfile = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Profile link copied to clipboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-muted py-2">
        <div className="container mx-auto px-4">
          <Link 
            to="/farmers" 
            className="text-sm text-muted-foreground hover:text-foreground flex items-center"
          >
            <ChevronLeft className="h-3 w-3 mr-1" /> Back to Farmers
          </Link>
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="bg-farm-green py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <Avatar className="h-32 w-32 border-4 border-white">
              <AvatarImage src={farmer.profileImage} alt={farmer.name} />
              <AvatarFallback className="text-4xl">{farmer.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="text-center md:text-left text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{farmer.name}</h1>
              <h2 className="text-xl mb-4">{farmer.farmName}</h2>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 opacity-80" />
                  <span>{farmer.location}</span>
                </div>
                
                {farmer.organicCertified && (
                  <Badge className="bg-white text-farm-green">
                    <Leaf className="mr-1 h-3 w-3" /> Organic Certified
                  </Badge>
                )}
                
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 fill-yellow-300 text-yellow-300" />
                  <span>{farmer.rating} ({farmer.reviewCount} reviews)</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {farmer.specialties?.map((specialty: string) => (
                  <Badge 
                    key={specialty} 
                    variant="secondary"
                    className="bg-white/20 text-white border-none"
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="ml-auto flex-shrink-0 hidden md:flex gap-2">
              <Button 
                variant="outline"
                className="bg-white text-farm-green border-white hover:bg-white/90"
                onClick={handleShareProfile}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button 
                className="bg-white text-farm-green border-white hover:bg-white/90"
                onClick={handleContactFarmer}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile action buttons */}
      <div className="md:hidden bg-white sticky top-0 z-10 p-4 flex gap-2 shadow-sm">
        <Button 
          variant="outline"
          className="flex-1"
          onClick={handleShareProfile}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
        <Button 
          className="flex-1 bg-farm-green hover:bg-farm-green-dark"
          onClick={handleContactFarmer}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Contact
        </Button>
      </div>
      
      {/* Tab navigation */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-background border w-full justify-start">
            <TabsTrigger value="about">
              <User className="h-4 w-4 mr-2" /> About
            </TabsTrigger>
            <TabsTrigger value="products">
              <ShoppingBag className="h-4 w-4 mr-2" /> Products
            </TabsTrigger>
            <TabsTrigger value="reviews">
              <Star className="h-4 w-4 mr-2" /> Reviews
            </TabsTrigger>
          </TabsList>
          
          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Farmer Bio */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {farmer.farmName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{farmer.bio}</p>
                  </CardContent>
                </Card>
                
                {/* Farm Photos */}
                <Card>
                  <CardHeader>
                    <CardTitle>Farm Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {farmer.farmPhotos?.map((photo: string, index: number) => (
                        <div key={index} className="aspect-video rounded-md overflow-hidden">
                          <img 
                            src={photo} 
                            alt={`${farmer.farmName} photo ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Achievements & Certifications */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Award className="h-5 w-5 mr-2 text-farm-green" />
                        Achievements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                        {farmer.achievements?.map((achievement: string, index: number) => (
                          <li key={index} className="text-foreground">
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Leaf className="h-5 w-5 mr-2 text-farm-green" />
                        Certifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                        {farmer.certifications?.map((cert: string, index: number) => (
                          <li key={index} className="text-foreground">
                            {cert}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Sidebar with contact & details */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Farm Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center">
                      <Tractor className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Farm Size:</span>
                      <span className="ml-auto font-medium">{farmer.farmSize}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Established:</span>
                      <span className="ml-auto font-medium">{farmer.establishedYear}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Experience:</span>
                      <span className="ml-auto font-medium">{farmer.farmingExperience} years</span>
                    </div>
                    
                    <div className="flex items-center">
                      <ShoppingBag className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Active Products:</span>
                      <span className="ml-auto font-medium">{farmer.activeProducts || 'N/A'}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {farmer.email && (
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{farmer.email}</span>
                      </div>
                    )}
                    
                    {farmer.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{farmer.phone}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{farmer.location}</span>
                    </div>
                    
                    <Button 
                      className="w-full mt-2 bg-farm-green hover:bg-farm-green-dark"
                      onClick={handleContactFarmer}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Message Farmer
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Products from {farmer.farmName}</CardTitle>
              </CardHeader>
              <CardContent>
                {farmer.products && farmer.products.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {farmer.products.map((product: any) => (
                      <Card key={product.id} className="overflow-hidden border hover:shadow-md transition-shadow">
                        <div className="aspect-square relative bg-muted">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-2">{product.name}</h3>
                          <div className="flex justify-between items-center">
                            <span className="font-bold">₹{product.price}/kg</span>
                            <Button variant="secondary" size="sm" asChild>
                              <Link to={`/product/${product.id}`}>
                                View
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No products available at the moment.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Customer Reviews</CardTitle>
                {farmer.reviewCount && (
                  <div className="flex items-center">
                    <div className="bg-farm-green text-white px-2 py-1 rounded-md flex items-center mr-2">
                      <Star className="fill-white h-4 w-4 mr-1" />
                      <span className="font-bold">{farmer.rating}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {farmer.reviewCount} reviews
                    </span>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {farmer.reviews && farmer.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {farmer.reviews.map((review: any) => (
                      <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={review.userImage} alt={review.userName} />
                            <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <h4 className="font-medium">{review.userName}</h4>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                            <div className="flex mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            <p className="text-muted-foreground">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No reviews yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FarmerPublicProfile;
