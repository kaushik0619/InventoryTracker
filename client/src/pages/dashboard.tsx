import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { 
  Package, DollarSign, Users, AlertTriangle, 
  Plus 
} from "lucide-react";
import { TopBar } from "@/components/layout/topbar";
import { Sidebar } from "@/components/layout/sidebar";
import { StatCard } from "@/components/dashboard/stat-card";
import { ActivityList } from "@/components/dashboard/activity-list";
import { InventoryChart } from "@/components/dashboard/inventory-chart";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { LowStockTable } from "@/components/dashboard/low-stock-table";
import { InventoryRequestForm } from "@/components/inventory/inventory-request-form";
import { DashboardData } from "@/lib/types";
import { Activity } from "@shared/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState("7days");
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [_, navigate] = useLocation();

  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard"],
  });

  const { data: activities, isLoading: isActivitiesLoading } = useQuery<Activity[]>({
    queryKey: ["/api/activities"],
  });

  const openRequestModal = () => {
    setIsRequestModalOpen(true);
  };

  const closeRequestModal = () => {
    setIsRequestModalOpen(false);
  };

  const handleViewAllActivities = () => {
    // Navigate to activities page or show more activities
    console.log("View all activities");
  };

  const handleOrderInventory = () => {
    navigate("/requests");
  };

  if (isDashboardLoading || isActivitiesLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar title="Dashboard" onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          {/* Date Range Selector */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-medium text-gray-900 mb-2 sm:mb-0">Dashboard Overview</h2>
            <div className="inline-flex items-center">
              <span className="mr-2 text-sm text-gray-500">Filter by:</span>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-[180px]">
                  <SelectValue placeholder="Select a range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Total Inventory"
              value={dashboardData?.stats?.totalInventory || 0}
              icon={<Package className="h-5 w-5 text-white" />}
              iconBgColor="bg-blue-500"
              change={{
                value: 12,
                type: "increase",
                text: "from last month"
              }}
            />
            
            <StatCard
              title="Monthly Revenue"
              value={`$${dashboardData?.stats?.monthlyRevenue?.toLocaleString() || 0}`}
              icon={<DollarSign className="h-5 w-5 text-white" />}
              iconBgColor="bg-green-500"
              change={{
                value: 8.2,
                type: "increase",
                text: "from last month"
              }}
            />
            
            <StatCard
              title="Total Clients"
              value={dashboardData?.stats?.totalClients || 0}
              icon={<Users className="h-5 w-5 text-white" />}
              iconBgColor="bg-purple-500"
              change={{
                value: 5.3,
                type: "increase",
                text: "from last month"
              }}
            />
            
            <StatCard
              title="Low Stock Items"
              value={dashboardData?.stats?.lowStockCount || 0}
              icon={<AlertTriangle className="h-5 w-5 text-white" />}
              iconBgColor="bg-red-500"
              action={{
                text: "View all",
                onClick: () => navigate("/inventory")
              }}
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <InventoryChart data={dashboardData?.inventoryTrends || []} />
            <RevenueChart data={dashboardData?.financeTrends || []} />
          </div>

          {/* Recent Activity & Low Stock Items */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ActivityList
              activities={activities || []}
              onViewAll={handleViewAllActivities}
            />
            
            <LowStockTable
              products={dashboardData?.lowStock || []}
              onOrderInventory={handleOrderInventory}
            />
          </div>
        </main>
      </div>

      {/* Floating Action Button */}
      <div className="fixed right-6 bottom-6">
        <button
          onClick={openRequestModal}
          className="h-14 w-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
        >
          <Plus className="h-6 w-6" />
          <span className="sr-only">Request Inventory</span>
        </button>
        <span 
          className="absolute bottom-16 right-0 bg-gray-800 text-white text-xs rounded py-1 px-2 pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          Request Inventory
        </span>
      </div>

      {/* Inventory Request Modal */}
      <InventoryRequestForm 
        isOpen={isRequestModalOpen} 
        onClose={closeRequestModal} 
      />
    </div>
  );
}
