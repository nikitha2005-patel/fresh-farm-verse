
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  CalendarDays, 
  PackageCheck, 
  ShoppingCart, 
  Star, 
  Tags,
  TrendingUp,
  Users
} from "lucide-react";

const DashboardOverview = () => {
  // Mock data for farmer dashboard
  const stats = [
    {
      title: "Active Listings",
      value: "12",
      icon: PackageCheck,
      description: "Live product listings",
      trend: "+2 this week",
      color: "text-green-500"
    },
    {
      title: "Active Auctions",
      value: "3",
      icon: Tags,
      description: "Ongoing auctions",
      trend: "+1 this week",
      color: "text-orange-500"
    },
    {
      title: "Sales This Month",
      value: "₹24,300",
      icon: ShoppingCart,
      description: "Revenue from sales",
      trend: "+12% vs last month",
      color: "text-blue-500"
    },
    {
      title: "Customer Ratings",
      value: "4.8",
      icon: Star,
      description: "Average from 28 ratings",
      trend: "Excellent",
      color: "text-yellow-500"
    }
  ];

  const recentActivity = [
    {
      type: "bid",
      message: "New bid on your Organic Rice auction",
      time: "10 minutes ago"
    },
    {
      type: "order",
      message: "New order: 25kg of Red Lentils",
      time: "2 hours ago"
    },
    {
      type: "listing",
      message: "Your listing for Organic Tomatoes is expiring soon",
      time: "1 day ago"
    },
    {
      type: "review",
      message: "New 5-star review from customer",
      time: "2 days ago"
    }
  ];
  
  const upcomingHarvests = [
    {
      crop: "Wheat",
      field: "North Field",
      estimatedDate: "May 15, 2025",
      quantity: "2500 kg"
    },
    {
      crop: "Rice",
      field: "East Paddy",
      estimatedDate: "June 10, 2025",
      quantity: "3200 kg"
    },
    {
      crop: "Potatoes",
      field: "West Field",
      estimatedDate: "April 25, 2025",
      quantity: "1800 kg"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <div className="mt-2 text-xs flex items-center">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span className={stat.color}>{stat.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity and Harvest Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-farm-accent-orange mt-2 mr-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarDays className="mr-2 h-5 w-5" />
              Upcoming Harvests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingHarvests.map((harvest, index) => (
                <div key={index} className="pb-4 border-b last:border-0 last:pb-0">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{harvest.crop}</p>
                      <p className="text-xs text-muted-foreground">{harvest.field}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{harvest.quantity}</p>
                      <p className="text-xs text-muted-foreground">{harvest.estimatedDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart className="mr-2 h-5 w-5" />
            Market Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">Interactive chart with market price trends will be displayed here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
