import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Leaf, Users, ShoppingCart, ArrowUp, DollarSign, Calendar, Bell } from 'lucide-react';

const Dashboard = () => {
  const [userType] = useState('investor'); // This would come from authentication context

  const renderInvestorDashboard = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₵45,000</div>
            <p className="text-xs text-muted-foreground">
              <ArrowUp className="h-3 w-3 inline mr-1" />
              +20% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Across 3 regions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expected Returns</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₵11,250</div>
            <p className="text-xs text-muted-foreground">
              25% average ROI
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payouts Received</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₵8,750</div>
            <p className="text-xs text-muted-foreground">
              Last payout: 2 weeks ago
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { project: 'Tomato Farm - Kumasi', amount: '₵5,000', status: 'Growing', progress: 60 },
                { project: 'Maize Farm - Tamale', amount: '₵8,000', status: 'Harvest Ready', progress: 95 },
                { project: 'Rice Farm - Volta', amount: '₵3,000', status: 'Planting', progress: 20 }
              ].map((investment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{investment.project}</p>
                    <p className="text-sm text-gray-600">{investment.amount} • {investment.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{investment.progress}% complete</p>
                    <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${investment.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4">View All Investments</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Cassava Farm - Brong Ahafo', roi: '22%', duration: '8 months', needed: '₵15,000' },
                { name: 'Plantain Farm - Western', roi: '18%', duration: '12 months', needed: '₵25,000' },
                { name: 'Pepper Farm - Greater Accra', roi: '25%', duration: '4 months', needed: '₵8,000' }
              ].map((project, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">{project.name}</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                    <div>ROI: <span className="text-primary-600 font-medium">{project.roi}</span></div>
                    <div>Duration: {project.duration}</div>
                    <div className="col-span-2">Funding needed: {project.needed}</div>
                  </div>
                  <Button size="sm" className="w-full">Invest Now</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderGrowerDashboard = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Leaf className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">5</div>
              <p className="text-sm text-gray-600">Active Farms</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">₵12,000</div>
              <p className="text-sm text-gray-600">This Season's Sales</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">45</div>
              <p className="text-sm text-gray-600">Days to Harvest</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">8</div>
              <p className="text-sm text-gray-600">Buyer Connections</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Farm Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">Manage your farms, track progress, and upload produce for sale.</p>
          <Button>View Farm Details</Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderBuyerDashboard = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <ShoppingCart className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">24</div>
              <p className="text-sm text-gray-600">Orders This Month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">₵85,000</div>
              <p className="text-sm text-gray-600">Total Purchases</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">15</div>
              <p className="text-sm text-gray-600">Partner Farmers</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Available Produce</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">Browse and order fresh produce from our certified farmers.</p>
          <Button>Browse Marketplace</Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderVendorDashboard = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Users className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">120</div>
              <p className="text-sm text-gray-600">Farmer Customers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">₵45,000</div>
              <p className="text-sm text-gray-600">Monthly Sales</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <ShoppingCart className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">89</div>
              <p className="text-sm text-gray-600">Products Listed</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Product Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">Manage your product listings and farmer orders.</p>
          <Button>Manage Inventory</Button>
        </CardContent>
      </Card>
    </div>
  );

  const getDashboardContent = () => {
    switch (userType) {
      case 'investor':
        return renderInvestorDashboard();
      case 'grower':
        return renderGrowerDashboard();
      case 'buyer':
        return renderBuyerDashboard();
      case 'vendor':
        return renderVendorDashboard();
      default:
        return renderInvestorDashboard();
    }
  };

  return (
    <Layout>
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, John! 👋
            </h1>
            <p className="text-gray-600">
              Here's what's happening with your agricultural portfolio today.
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              {getDashboardContent()}
            </TabsContent>

            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">View all your transactions and financial activity.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Detailed analytics and performance metrics.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Manage your account preferences and security settings.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
