import { 
  User, Product, Client, Order, OrderItem, 
  Expense, InventoryRequest, Activity 
} from "@shared/schema";

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

export type DashboardStats = {
  totalInventory: number;
  totalInventoryValue: number;
  monthlyRevenue: number;
  totalClients: number;
  lowStockCount: number;
  profit: number;
};

export type InventoryTrend = {
  month: string;
  inventory: number;
  sold: number;
};

export type FinanceTrend = {
  month: string;
  revenue: number;
  expenses: number;
};

export type DashboardData = {
  stats: DashboardStats;
  inventoryTrends: InventoryTrend[];
  financeTrends: FinanceTrend[];
  lowStock: Product[];
};

export type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor: string;
  change?: {
    value: number;
    type: "increase" | "decrease";
    text: string;
  };
  action?: {
    text: string;
    onClick: () => void;
  };
};

export type DateRangeOption = "7days" | "30days" | "month" | "quarter" | "year" | "custom";

export type StatusType = "active" | "inactive" | "pending" | "approved" | "rejected" | "completed" | "processing";

export type PriorityType = "low" | "medium" | "high" | "urgent";

export interface InventoryRequestFormValues {
  productId?: number;
  productName: string;
  quantity: number;
  priority: PriorityType;
  notes?: string;
}

export interface ExpenseFormValues {
  category: string;
  amount: string;
  date: Date;
  description?: string;
}

export interface ProductFormValues {
  name: string;
  sku: string;
  description?: string;
  category: string;
  quantity: number;
  minQuantity: number;
  price: string;
  cost: string;
  status: "active" | "inactive";
}

export interface ClientFormValues {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  company?: string;
  isActive: boolean;
}
