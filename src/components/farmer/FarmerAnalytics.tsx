
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Download, 
  DollarSign, 
  HandCoins, 
  LineChart, 
  Package, 
  ShoppingCart, 
  Users 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Mock data for charts
const monthlyEarnings = [
  { month: "Jan", earnings: 12000 },
  { month: "Feb", earnings: 15000 },
  { month: "Mar", earnings: 14000 },
  { month: "Apr", earnings: 16500 },
  { month: "May", earnings: 18000 },
  { month: "Jun", earnings: 21000 },
];

const productPerformance = [
  { name: "Rice", sales: 2800, auctions: 1200 },
  { name: "Wheat", sales: 2200, auctions: 800 },
  { name: "Lentils", sales: 1800, auctions: 500 },
  { name: "Mangoes", sales: 3500, auctions: 1500 },
  { name: "Tomatoes", sales: 1200, auctions: 300 },
];

const FarmerAnalytics = () => {
  const handleDownloadReport = (reportType: string) => {
    toast.success(`Downloading ${reportType} report`);
    // In a real app, we would generate and download a report
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDownloadReport('CSV')}
          >
            <Download className="mr-2 h-4 w-4" /> CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDownloadReport('PDF')}
          >
            <Download className="mr-2 h-4 w-4" /> PDF
          </Button>
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Sales
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹97,500</div>
            <p className="text-xs text-muted-foreground">
              +12% from previous month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Products Sold
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">873</div>
            <p className="text-xs text-muted-foreground">
              +5% from previous month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Auction Success
            </CardTitle>
            <HandCoins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              +2% from previous month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unique Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">
              +18% from previous month
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <Tabs defaultValue="earnings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="earnings" className="data-[state=active]:bg-background">
            <LineChart className="h-4 w-4 mr-2" /> Earnings
          </TabsTrigger>
          <TabsTrigger value="products" className="data-[state=active]:bg-background">
            <BarChart3 className="h-4 w-4 mr-2" /> Products
          </TabsTrigger>
          <TabsTrigger value="customers" className="data-[state=active]:bg-background">
            <Users className="h-4 w-4 mr-2" /> Customers
          </TabsTrigger>
          <TabsTrigger value="orders" className="data-[state=active]:bg-background">
            <ShoppingCart className="h-4 w-4 mr-2" /> Orders
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="earnings">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Earnings</CardTitle>
              <CardDescription>
                Your earnings from direct sales and auctions over the past 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Monthly earnings chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>
                Sales and auction performance for your top products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Product performance chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Customer Analytics</CardTitle>
              <CardDescription>
                Customer demographics and purchasing behavior
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Customer analytics chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order Trends</CardTitle>
              <CardDescription>
                Trends in order volume and value over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Order trends chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Recent Sales */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>
            Your most recent sale transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Sale item 1 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-muted w-12 h-12 rounded-md flex items-center justify-center">
                  <Package className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Organic Rice</p>
                  <p className="text-sm text-muted-foreground">50kg • Direct Sale</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">₹2,500</p>
                <p className="text-sm text-muted-foreground">April 5, 2025</p>
              </div>
            </div>
            
            {/* Sale item 2 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-muted w-12 h-12 rounded-md flex items-center justify-center">
                  <HandCoins className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Premium Mangoes</p>
                  <p className="text-sm text-muted-foreground">10 dozen • Auction</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">₹4,800</p>
                <p className="text-sm text-muted-foreground">April 3, 2025</p>
              </div>
            </div>
            
            {/* Sale item 3 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-muted w-12 h-12 rounded-md flex items-center justify-center">
                  <Package className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Red Lentils</p>
                  <p className="text-sm text-muted-foreground">25kg • Direct Sale</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">₹1,750</p>
                <p className="text-sm text-muted-foreground">April 1, 2025</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerAnalytics;
