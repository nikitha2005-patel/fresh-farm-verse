
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart3, 
  ListChecks, 
  PlusCircle, 
  GalleryHorizontalEnd, 
  HandCoins, 
  Settings, 
  Info, 
  Calendar,
  TrendingUp,
  Box,
  Tag
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import DashboardOverview from '@/components/farmer/DashboardOverview';
import ListingsManager from '@/components/farmer/ListingsManager';
import CreateListingForm from '@/components/farmer/CreateListingForm';
import FarmerAuctions from '@/components/farmer/FarmerAuctions';
import FarmerAnalytics from '@/components/farmer/FarmerAnalytics';

const FarmerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  if (!user) {
    return (
      <div className="container mx-auto py-16 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Farmer Access Required</CardTitle>
            <CardDescription>You need to be logged in as a farmer to access this page.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Info className="h-16 w-16 text-farm-green opacity-80" />
            <p className="text-center text-muted-foreground">
              Please sign in with your farmer account to view and manage your crop listings.
            </p>
            <div className="flex gap-4">
              <Button onClick={() => navigate('/')}>
                Return Home
              </Button>
              <Button variant="outline" onClick={() => {
                toast.info("Opening login form");
                // Open login form logic here
              }}>
                Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if logged in user is a farmer
  if (user.role !== 'farmer') {
    return (
      <div className="container mx-auto py-16 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Farmer Account Required</CardTitle>
            <CardDescription>This dashboard is only available to registered farmers.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Info className="h-16 w-16 text-farm-accent-yellow opacity-80" />
            <p className="text-center text-muted-foreground">
              You are currently signed in as a consumer. To access the farmer dashboard, please sign in with a farmer account.
            </p>
            <Button onClick={() => navigate('/')}>
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Farmer Dashboard</h1>
            <p className="text-muted-foreground">Welcome, {user.username}. Manage your crop listings and auctions.</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              className="border-farm-green text-farm-green hover:bg-farm-green/5"
              onClick={() => setActiveTab("create")}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> New Listing
            </Button>
            <Button 
              variant="outline" 
              className="border-farm-accent-orange text-farm-accent-orange hover:bg-farm-accent-orange/5"
              onClick={() => setActiveTab("auctions")}
            >
              <HandCoins className="mr-2 h-4 w-4" /> Manage Auctions
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-background border">
            <TabsTrigger value="overview" className="data-[state=active]:bg-background">
              <BarChart3 className="h-4 w-4 mr-2" /> Overview
            </TabsTrigger>
            <TabsTrigger value="listings" className="data-[state=active]:bg-background">
              <ListChecks className="h-4 w-4 mr-2" /> My Listings
            </TabsTrigger>
            <TabsTrigger value="create" className="data-[state=active]:bg-background">
              <PlusCircle className="h-4 w-4 mr-2" /> Create Listing
            </TabsTrigger>
            <TabsTrigger value="auctions" className="data-[state=active]:bg-background">
              <HandCoins className="h-4 w-4 mr-2" /> Auctions
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-background">
              <GalleryHorizontalEnd className="h-4 w-4 mr-2" /> Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-background">
              <Settings className="h-4 w-4 mr-2" /> Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <DashboardOverview />
          </TabsContent>
          
          <TabsContent value="listings" className="space-y-6">
            <ListingsManager />
          </TabsContent>
          
          <TabsContent value="create" className="space-y-6">
            <CreateListingForm />
          </TabsContent>
          
          <TabsContent value="auctions" className="space-y-6">
            <FarmerAuctions />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <FarmerAnalytics />
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Update your profile and account settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Profile settings functionality will be implemented soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FarmerDashboard;
