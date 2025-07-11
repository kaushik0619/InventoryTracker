import { useLocation, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart,
  Receipt,
  ClipboardList,
  Settings,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { User } from "@shared/schema";

type SidebarItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

const sidebarItems: SidebarItem[] = [
  { name: "Dashboard", path: "/", icon: <LayoutDashboard className="w-6" /> },
  { name: "Inventory", path: "/inventory", icon: <Package className="w-6" /> },
  { name: "Orders", path: "/orders", icon: <ShoppingCart className="w-6" /> },
  { name: "Clients", path: "/clients", icon: <Users className="w-6" /> },
  { name: "Reports", path: "/reports", icon: <BarChart className="w-6" /> },
  { name: "Expenses", path: "/expenses", icon: <Receipt className="w-6" /> },
  { name: "Inventory Requests", path: "/requests", icon: <ClipboardList className="w-6" /> },
  { name: "Settings", path: "/settings", icon: <Settings className="w-6" /> },
];

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [location] = useLocation();
  const { toast } = useToast();

  const { data: user } = useQuery<User>({
    queryKey: ["/api/auth/me"],
  });

  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/api/auth/logout", {});
      window.location.href = "/login";
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "An error occurred while logging out."
      });
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 flex-shrink-0 w-64 bg-gray-800 z-10 shadow-lg md:static md:block transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo Header */}
        <div className="flex items-center justify-between h-16 px-6 bg-gray-900">
          <div className="flex items-center space-x-2">
            <Package className="text-white" />
            <span className="text-lg font-bold text-white">InventoryPro</span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden text-gray-300 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <div className="overflow-y-auto py-4 px-3 flex-grow">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.path}>
                <Link href={item.path}>
                  <a
                    className={cn(
                      "flex items-center p-2 text-base font-medium rounded-lg",
                      location === item.path
                        ? "text-white bg-gray-700"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    )}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center text-white uppercase">
                {user?.name?.charAt(0) || "U"}
              </div>
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium text-white">{user?.name || "User"}</div>
              <div className="text-xs text-gray-300">{user?.role || "User"}</div>
            </div>
            <button
              onClick={handleLogout}
              className="ml-auto text-gray-300 hover:text-white"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
