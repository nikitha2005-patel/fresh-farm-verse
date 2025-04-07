
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Edit, MapPin, Phone, Mail, BookOpen, 
  Save, X, Camera, Leaf, Tractor, Award, Calendar
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Mock farmer data - In a real app, this would come from the database
const mockFarmerData = {
  id: "f1",
  name: "Raj Patel",
  email: "farmer@example.com",
  phone: "+91 98765 43210",
  location: "Gujarat, India",
  bio: "Third-generation farmer specializing in traditional crop varieties grown using sustainable practices. Our farm has been in the family for over 75 years.",
  farmName: "Patel Organic Farms",
  farmingExperience: 15,
  farmSize: "25 acres",
  organicCertified: true,
  establishedYear: "1948",
  specialties: ["Rice", "Wheat", "Pulses", "Cotton"],
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
  bankDetails: {
    accountName: "Raj Patel",
    accountNumber: "XXXX-XXXX-1234",
    bankName: "State Bank of India",
    ifscCode: "SBIN0XXXXXX"
  }
};

const FarmerProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [farmerData, setFarmerData] = useState(mockFarmerData);
  const [formData, setFormData] = useState(mockFarmerData);
  const [activeTab, setActiveTab] = useState("profile");
  
  useEffect(() => {
    // In a real app, fetch farmer data from database
    // For now, using mock data
    if (!user || user.role !== 'farmer') {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // In a real app, save to database
    setFarmerData(formData);
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleCancel = () => {
    setFormData(farmerData);
    setIsEditing(false);
  };

  if (!user || user.role !== 'farmer') {
    return null; // Redirect handled in useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <h1 className="text-3xl font-bold">Farmer Profile</h1>
          {!isEditing ? (
            <Button 
              onClick={() => setIsEditing(true)}
              className="bg-farm-green hover:bg-farm-green-dark mt-4 md:mt-0"
            >
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button 
                onClick={handleSave}
                className="bg-farm-green hover:bg-farm-green-dark"
              >
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCancel}
              >
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left sidebar - Profile summary */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-4">
                    <Avatar className="h-32 w-32 border-4 border-background">
                      <AvatarImage src={farmerData.profileImage} alt={farmerData.name} />
                      <AvatarFallback className="text-4xl">{farmerData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button 
                        size="icon" 
                        className="absolute bottom-0 right-0 rounded-full bg-farm-green hover:bg-farm-green-dark"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <h2 className="text-xl font-bold">{farmerData.name}</h2>
                  <p className="text-muted-foreground">{farmerData.farmName}</p>
                  {farmerData.organicCertified && (
                    <Badge className="mt-2 bg-farm-green">
                      <Leaf className="mr-1 h-3 w-3" /> Organic Certified
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{farmerData.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{farmerData.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{farmerData.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Tractor className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{farmerData.farmSize}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Est. {farmerData.establishedYear}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-2">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {farmerData.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Achievements</h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {farmerData.achievements.map((achievement, index) => (
                      <li key={index} className="mb-1">
                        <span className="text-foreground">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right content area - Tabs for different sections */}
          <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="bg-background border">
                <TabsTrigger value="profile">
                  <User className="h-4 w-4 mr-2" /> Profile
                </TabsTrigger>
                <TabsTrigger value="farm-info">
                  <Tractor className="h-4 w-4 mr-2" /> Farm Info
                </TabsTrigger>
                <TabsTrigger value="bank-details">
                  <BookOpen className="h-4 w-4 mr-2" /> Bank Details
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        {isEditing ? (
                          <Input 
                            id="name" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        ) : (
                          <div className="p-2 border rounded-md">{farmerData.name}</div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        {isEditing ? (
                          <Input 
                            id="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        ) : (
                          <div className="p-2 border rounded-md">{farmerData.email}</div>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        {isEditing ? (
                          <Input 
                            id="phone" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        ) : (
                          <div className="p-2 border rounded-md">{farmerData.phone}</div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        {isEditing ? (
                          <Input 
                            id="location" 
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                          />
                        ) : (
                          <div className="p-2 border rounded-md">{farmerData.location}</div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      {isEditing ? (
                        <Textarea 
                          id="bio" 
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          className="min-h-[100px]"
                        />
                      ) : (
                        <div className="p-2 border rounded-md min-h-[100px]">{farmerData.bio}</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="farm-info" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Farm Details</CardTitle>
                    <CardDescription>Information about your farm</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="farmName">Farm Name</Label>
                        {isEditing ? (
                          <Input 
                            id="farmName" 
                            name="farmName"
                            value={formData.farmName}
                            onChange={handleChange}
                          />
                        ) : (
                          <div className="p-2 border rounded-md">{farmerData.farmName}</div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="farmSize">Farm Size</Label>
                        {isEditing ? (
                          <Input 
                            id="farmSize" 
                            name="farmSize"
                            value={formData.farmSize}
                            onChange={handleChange}
                          />
                        ) : (
                          <div className="p-2 border rounded-md">{farmerData.farmSize}</div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="farmingExperience">Years of Experience</Label>
                        {isEditing ? (
                          <Input 
                            id="farmingExperience" 
                            name="farmingExperience"
                            type="number"
                            value={formData.farmingExperience}
                            onChange={handleChange}
                          />
                        ) : (
                          <div className="p-2 border rounded-md">{farmerData.farmingExperience} years</div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="establishedYear">Established Year</Label>
                        {isEditing ? (
                          <Input 
                            id="establishedYear" 
                            name="establishedYear"
                            value={formData.establishedYear}
                            onChange={handleChange}
                          />
                        ) : (
                          <div className="p-2 border rounded-md">{farmerData.establishedYear}</div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium mb-2">Farm Photos</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {farmerData.farmPhotos.map((photo, index) => (
                          <div key={index} className="relative aspect-video rounded-md overflow-hidden">
                            <img 
                              src={photo} 
                              alt={`Farm photo ${index + 1}`} 
                              className="object-cover w-full h-full"
                            />
                            {isEditing && (
                              <Button 
                                size="icon"
                                variant="destructive"
                                className="absolute top-1 right-1 h-6 w-6 rounded-full"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        ))}
                        {isEditing && (
                          <div className="border-2 border-dashed border-muted-foreground/25 rounded-md aspect-video flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                            <div className="flex flex-col items-center text-muted-foreground">
                              <Camera className="h-8 w-8 mb-2" />
                              <span className="text-sm">Add Photo</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bank-details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Bank Information</CardTitle>
                    <CardDescription>Your banking details for payments</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="accountName">Account Holder Name</Label>
                        {isEditing ? (
                          <Input 
                            id="accountName" 
                            name="bankDetails.accountName"
                            value={formData.bankDetails.accountName}
                            onChange={(e) => {
                              setFormData(prev => ({
                                ...prev,
                                bankDetails: {
                                  ...prev.bankDetails,
                                  accountName: e.target.value
                                }
                              }));
                            }}
                          />
                        ) : (
                          <div className="p-2 border rounded-md">{farmerData.bankDetails.accountName}</div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bankName">Bank Name</Label>
                        {isEditing ? (
                          <Input 
                            id="bankName" 
                            name="bankDetails.bankName"
                            value={formData.bankDetails.bankName}
                            onChange={(e) => {
                              setFormData(prev => ({
                                ...prev,
                                bankDetails: {
                                  ...prev.bankDetails,
                                  bankName: e.target.value
                                }
                              }));
                            }}
                          />
                        ) : (
                          <div className="p-2 border rounded-md">{farmerData.bankDetails.bankName}</div>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        {isEditing ? (
                          <Input 
                            id="accountNumber" 
                            name="bankDetails.accountNumber"
                            value={formData.bankDetails.accountNumber}
                            onChange={(e) => {
                              setFormData(prev => ({
                                ...prev,
                                bankDetails: {
                                  ...prev.bankDetails,
                                  accountNumber: e.target.value
                                }
                              }));
                            }}
                          />
                        ) : (
                          <div className="p-2 border rounded-md">{farmerData.bankDetails.accountNumber}</div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ifscCode">IFSC Code</Label>
                        {isEditing ? (
                          <Input 
                            id="ifscCode" 
                            name="bankDetails.ifscCode"
                            value={formData.bankDetails.ifscCode}
                            onChange={(e) => {
                              setFormData(prev => ({
                                ...prev,
                                bankDetails: {
                                  ...prev.bankDetails,
                                  ifscCode: e.target.value
                                }
                              }));
                            }}
                          />
                        ) : (
                          <div className="p-2 border rounded-md">{farmerData.bankDetails.ifscCode}</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;
