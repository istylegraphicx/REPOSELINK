import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Building, Users, Calendar, CreditCard, BarChart3, Settings, Bell, User, LogOut, Plus, Eye, Edit, Trash2, Phone, Mail, MapPin, Clock, DollarSign, CheckCircle, AlertCircle, Wifi, WifiOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useRealtime, Client } from "@/lib/realtime";
import ProtectedRoute from "@/components/ProtectedRoute";

function DashboardContent() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { 
    clients, 
    payments, 
    notifications, 
    isOnline, 
    lastSync,
    addClient, 
    updateClient, 
    deleteClient,
    addPayment,
    getClientPayments,
    getUnreadCount,
    markNotificationRead 
  } = useRealtime();
  
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [newClientData, setNewClientData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    dateOfDeath: '',
    serviceType: 'traditional' as const,
    serviceDate: '',
    serviceTime: '',
    status: 'consultation' as const,
    totalAmount: 0,
    paidAmount: 0,
    notes: '',
    userId: user?.id || ''
  });

  useEffect(() => {
    if (user?.id) {
      // Initialize with user ID if not already done
      setNewClientData(prev => ({ ...prev, userId: user.id }));
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddClient = () => {
    if (newClientData.fullName && newClientData.email) {
      addClient(newClientData);
      setIsAddClientOpen(false);
      setNewClientData({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        dateOfDeath: '',
        serviceType: 'traditional',
        serviceDate: '',
        serviceTime: '',
        status: 'consultation',
        totalAmount: 0,
        paidAmount: 0,
        notes: '',
        userId: user?.id || ''
      });
    }
  };

  const handleStatusUpdate = (clientId: string, newStatus: Client['status']) => {
    updateClient(clientId, { status: newStatus });
  };

  const handleDeleteClient = (clientId: string) => {
    if (confirm('Are you sure you want to delete this client?')) {
      deleteClient(clientId);
    }
  };

  const stats = [
    { title: "Total Clients", value: clients.length.toString(), icon: Users, color: "text-blue-600" },
    { title: "Active Services", value: clients.filter(c => c.status === 'scheduled').length.toString(), icon: Calendar, color: "text-green-600" },
    { title: "Monthly Revenue", value: `R ${payments.reduce((sum, p) => sum + (p.status === 'completed' ? p.amount : 0), 0).toLocaleString()}`, icon: DollarSign, color: "text-purple-600" },
    { title: "Pending Payments", value: clients.filter(c => c.paidAmount < c.totalAmount).length.toString(), icon: CreditCard, color: "text-orange-600" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'consultation': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const upcomingServices = clients.filter(c => c.status === 'scheduled' && c.serviceDate);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className="text-xl font-bold text-gray-900">ReposeLink</span>
              </Link>
              <Badge variant={user?.plan === 'premium' ? 'default' : 'secondary'}>
                {user?.plan?.charAt(0).toUpperCase() + user?.plan?.slice(1)} Plan
              </Badge>
              <div className="flex items-center space-x-2">
                {isOnline ? (
                  <Wifi className="w-4 h-4 text-green-500" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-500" />
                )}
                <span className="text-xs text-gray-500">
                  Last sync: {new Date(lastSync).toLocaleTimeString()}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                {getUnreadCount() > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 text-xs">
                    {getUnreadCount()}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user?.firstName?.charAt(0) || 'U'}
                    </span>
                  </div>
                )}
                <span className="text-sm font-medium">{user?.firstName}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-6">
            <div className="space-y-2">
              <Button variant="secondary" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Clients
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Services
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <CreditCard className="w-4 h-4 mr-2" />
                Payments
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Building className="w-4 h-4 mr-2" />
                Business Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your funeral home.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Clients */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Clients</CardTitle>
                  <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Client
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Add New Client</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Full Name</label>
                          <Input
                            value={newClientData.fullName}
                            onChange={(e) => setNewClientData(prev => ({ ...prev, fullName: e.target.value }))}
                            placeholder="Enter full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email</label>
                          <Input
                            type="email"
                            value={newClientData.email}
                            onChange={(e) => setNewClientData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="Enter email"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone</label>
                          <Input
                            value={newClientData.phone}
                            onChange={(e) => setNewClientData(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="Enter phone number"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Service Type</label>
                          <Select
                            value={newClientData.serviceType}
                            onValueChange={(value: any) => setNewClientData(prev => ({ ...prev, serviceType: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="traditional">Traditional Funeral</SelectItem>
                              <SelectItem value="cremation">Cremation</SelectItem>
                              <SelectItem value="memorial">Memorial Service</SelectItem>
                              <SelectItem value="burial">Burial Service</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Total Amount</label>
                          <Input
                            type="number"
                            value={newClientData.totalAmount}
                            onChange={(e) => setNewClientData(prev => ({ ...prev, totalAmount: parseFloat(e.target.value) || 0 }))}
                            placeholder="Enter total amount"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Paid Amount</label>
                          <Input
                            type="number"
                            value={newClientData.paidAmount}
                            onChange={(e) => setNewClientData(prev => ({ ...prev, paidAmount: parseFloat(e.target.value) || 0 }))}
                            placeholder="Enter paid amount"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium mb-2">Address</label>
                          <Input
                            value={newClientData.address}
                            onChange={(e) => setNewClientData(prev => ({ ...prev, address: e.target.value }))}
                            placeholder="Enter address"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium mb-2">Notes</label>
                          <Textarea
                            value={newClientData.notes}
                            onChange={(e) => setNewClientData(prev => ({ ...prev, notes: e.target.value }))}
                            placeholder="Enter any notes"
                            rows={3}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2 mt-4">
                        <Button variant="outline" onClick={() => setIsAddClientOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddClient}>
                          Add Client
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clients.slice(0, 5).map((client) => (
                    <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{client.fullName}</h4>
                        <p className="text-sm text-gray-600 capitalize">{client.serviceType.replace('_', ' ')}</p>
                        <p className="text-xs text-gray-500">{new Date(client.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(client.status)}>
                          {client.status}
                        </Badge>
                        <p className="text-sm font-semibold mt-1">R {client.totalAmount.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Paid: R {client.paidAmount.toLocaleString()}</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedClient(client)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteClient(client.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Services */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingServices.slice(0, 5).map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{service.fullName}</h4>
                        <p className="text-sm text-gray-600 capitalize">{service.serviceType.replace('_', ' ')}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Calendar className="w-3 h-3 mr-1" />
                          {service.serviceDate}
                          <Clock className="w-3 h-3 ml-3 mr-1" />
                          {service.serviceTime}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Select
                          value={service.status}
                          onValueChange={(value: any) => handleStatusUpdate(service.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="consultation">Consultation</SelectItem>
                            <SelectItem value="planning">Planning</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                  {upcomingServices.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No upcoming services</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Business Performance */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Business Performance</CardTitle>
              <CardDescription>Your business metrics for this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Revenue Target</span>
                    <span className="text-sm font-semibold">75%</span>
                  </div>
                  <Progress value={75} className="mb-2" />
                  <p className="text-xs text-gray-500">R 45,200 of R 60,000</p>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Client Satisfaction</span>
                    <span className="text-sm font-semibold">92%</span>
                  </div>
                  <Progress value={92} className="mb-2" />
                  <p className="text-xs text-gray-500">Excellent rating</p>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Services Completed</span>
                    <span className="text-sm font-semibold">88%</span>
                  </div>
                  <Progress value={88} className="mb-2" />
                  <p className="text-xs text-gray-500">22 of 25 scheduled</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  className="h-20 flex flex-col bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
                  onClick={() => setIsAddClientOpen(true)}
                >
                  <Plus className="w-6 h-6 mb-2" />
                  Add Client
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <Calendar className="w-6 h-6 mb-2" />
                  Schedule Service
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <CreditCard className="w-6 h-6 mb-2" />
                  Process Payment
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <BarChart3 className="w-6 h-6 mb-2" />
                  View Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}