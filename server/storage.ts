import {
  users, type User, type InsertUser,
  products, type Product, type InsertProduct,
  clients, type Client, type InsertClient,
  orders, type Order, type InsertOrder,
  orderItems, type OrderItem, type InsertOrderItem,
  expenses, type Expense, type InsertExpense,
  inventoryRequests, type InventoryRequest, type InsertInventoryRequest,
  activities, type Activity, type InsertActivity
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, lt } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Client methods
  getClients(): Promise<Client[]>;
  getClient(id: number): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: number, client: Partial<InsertClient>): Promise<Client | undefined>;
  deleteClient(id: number): Promise<boolean>;
  
  // Order methods
  getOrders(): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: number, order: Partial<InsertOrder>): Promise<Order | undefined>;
  
  // Order Item methods
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
  
  // Expense methods
  getExpenses(): Promise<Expense[]>;
  getExpense(id: number): Promise<Expense | undefined>;
  createExpense(expense: InsertExpense): Promise<Expense>;
  updateExpense(id: number, expense: Partial<InsertExpense>): Promise<Expense | undefined>;
  deleteExpense(id: number): Promise<boolean>;
  
  // Inventory Request methods
  getInventoryRequests(): Promise<InventoryRequest[]>;
  getInventoryRequest(id: number): Promise<InventoryRequest | undefined>;
  createInventoryRequest(request: InsertInventoryRequest): Promise<InventoryRequest>;
  updateInventoryRequest(id: number, request: Partial<InsertInventoryRequest>): Promise<InventoryRequest | undefined>;
  
  // Activity methods
  getActivities(limit?: number): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  
  // Dashboard methods
  getLowStockProducts(): Promise<Product[]>;
  getDashboardStats(): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updated] = await db.update(products).set(product).where(eq(products.id, id)).returning();
    return updated || undefined;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getClients(): Promise<Client[]> {
    return await db.select().from(clients);
  }

  async getClient(id: number): Promise<Client | undefined> {
    const [client] = await db.select().from(clients).where(eq(clients.id, id));
    return client || undefined;
  }

  async createClient(client: InsertClient): Promise<Client> {
    const [newClient] = await db.insert(clients).values(client).returning();
    return newClient;
  }

  async updateClient(id: number, client: Partial<InsertClient>): Promise<Client | undefined> {
    const [updated] = await db.update(clients).set(client).where(eq(clients.id, id)).returning();
    return updated || undefined;
  }

  async deleteClient(id: number): Promise<boolean> {
    const result = await db.delete(clients).where(eq(clients.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getOrders(): Promise<Order[]> {
    return await db.select().from(orders);
  }

  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order || undefined;
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db.insert(orders).values(order).returning();
    return newOrder;
  }

  async updateOrder(id: number, order: Partial<InsertOrder>): Promise<Order | undefined> {
    const [updated] = await db.update(orders).set(order).where(eq(orders.id, id)).returning();
    return updated || undefined;
  }

  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  }

  async createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem> {
    const [newOrderItem] = await db.insert(orderItems).values(orderItem).returning();
    return newOrderItem;
  }

  async getExpenses(): Promise<Expense[]> {
    return await db.select().from(expenses);
  }

  async getExpense(id: number): Promise<Expense | undefined> {
    const [expense] = await db.select().from(expenses).where(eq(expenses.id, id));
    return expense || undefined;
  }

  async createExpense(expense: InsertExpense): Promise<Expense> {
    const [newExpense] = await db.insert(expenses).values(expense).returning();
    return newExpense;
  }

  async updateExpense(id: number, expense: Partial<InsertExpense>): Promise<Expense | undefined> {
    const [updated] = await db.update(expenses).set(expense).where(eq(expenses.id, id)).returning();
    return updated || undefined;
  }

  async deleteExpense(id: number): Promise<boolean> {
    const result = await db.delete(expenses).where(eq(expenses.id, id));
    return result.rowCount > 0;
  }

  async getInventoryRequests(): Promise<InventoryRequest[]> {
    return await db.select().from(inventoryRequests);
  }

  async getInventoryRequest(id: number): Promise<InventoryRequest | undefined> {
    const [request] = await db.select().from(inventoryRequests).where(eq(inventoryRequests.id, id));
    return request || undefined;
  }

  async createInventoryRequest(request: InsertInventoryRequest): Promise<InventoryRequest> {
    const [newRequest] = await db.insert(inventoryRequests).values(request).returning();
    return newRequest;
  }

  async updateInventoryRequest(id: number, request: Partial<InsertInventoryRequest>): Promise<InventoryRequest | undefined> {
    const [updated] = await db.update(inventoryRequests).set(request).where(eq(inventoryRequests.id, id)).returning();
    return updated || undefined;
  }

  async getActivities(limit: number = 10): Promise<Activity[]> {
    return await db.select().from(activities).orderBy(desc(activities.timestamp)).limit(limit);
  }

  async createActivity(activity: InsertActivity): Promise<Activity> {
    const [newActivity] = await db.insert(activities).values(activity).returning();
    return newActivity;
  }

  async getLowStockProducts(): Promise<Product[]> {
    return await db.select().from(products).where(lt(products.quantity, products.minQuantity));
  }

  async getDashboardStats(): Promise<any> {
    const allProducts = await this.getProducts();
    const allExpenses = await this.getExpenses();
    const allClients = await this.getClients();
    const lowStockProducts = await this.getLowStockProducts();

    const totalInventory = allProducts.reduce((sum, product) => sum + product.quantity, 0);
    const totalInventoryValue = allProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    const monthlyExpenses = allExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalClients = allClients.length;
    const lowStockCount = lowStockProducts.length;

    return {
      totalInventory,
      totalInventoryValue,
      monthlyRevenue: totalInventoryValue * 0.3, // Sample calculation
      totalClients,
      lowStockCount,
      profit: totalInventoryValue - monthlyExpenses
    };
  }
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private clients: Map<number, Client>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private expenses: Map<number, Expense>;
  private inventoryRequests: Map<number, InventoryRequest>;
  private activities: Map<number, Activity>;
  
  private userIdCounter: number;
  private productIdCounter: number;
  private clientIdCounter: number;
  private orderIdCounter: number;
  private orderItemIdCounter: number;
  private expenseIdCounter: number;
  private requestIdCounter: number;
  private activityIdCounter: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.clients = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.expenses = new Map();
    this.inventoryRequests = new Map();
    this.activities = new Map();
    
    this.userIdCounter = 1;
    this.productIdCounter = 1;
    this.clientIdCounter = 1;
    this.orderIdCounter = 1;
    this.orderItemIdCounter = 1;
    this.expenseIdCounter = 1;
    this.requestIdCounter = 1;
    this.activityIdCounter = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create admin user
    this.createUser({
      username: "admin",
      password: "admin123", // In a real app, this would be hashed
      name: "John Smith",
      role: "administrator",
      email: "admin@example.com"
    });
    
    // Sample products
    const products = [
      { name: "Widget A", sku: "PRD-001", description: "Standard widget", category: "Widgets", quantity: 5, minQuantity: 25, price: "29.99", cost: "15.00", status: "active" },
      { name: "Gadget B", sku: "PRD-042", description: "Premium gadget", category: "Gadgets", quantity: 12, minQuantity: 20, price: "49.99", cost: "25.00", status: "active" },
      { name: "Component C", sku: "PRD-108", description: "Essential component", category: "Components", quantity: 8, minQuantity: 15, price: "19.99", cost: "8.50", status: "active" },
      { name: "Product D", sku: "PRD-219", description: "Specialized product", category: "Products", quantity: 3, minQuantity: 25, price: "89.99", cost: "45.00", status: "active" },
      { name: "Tool E", sku: "PRD-333", description: "Professional tool", category: "Tools", quantity: 45, minQuantity: 10, price: "129.99", cost: "65.00", status: "active" },
      { name: "Material F", sku: "PRD-444", description: "Raw material", category: "Materials", quantity: 120, minQuantity: 50, price: "9.99", cost: "3.75", status: "active" }
    ];
    
    products.forEach(product => this.createProduct(product));
    
    // Sample clients
    const clients = [
      { name: "Acme Corp", email: "contact@acme.com", phone: "555-1234", address: "123 Main St", company: "Acme Corporation", isActive: true },
      { name: "Beta Industries", email: "info@beta.com", phone: "555-5678", address: "456 Oak Ave", company: "Beta Industries Ltd", isActive: true },
      { name: "Gamma Tech", email: "sales@gammatech.com", phone: "555-9012", address: "789 Pine Rd", company: "Gamma Technologies", isActive: true }
    ];
    
    clients.forEach(client => this.createClient(client));
    
    // Sample orders
    const orders = [
      { clientId: 1, date: new Date("2023-05-15"), status: "completed", total: "599.95" },
      { clientId: 2, date: new Date("2023-06-20"), status: "completed", total: "1249.75" },
      { clientId: 3, date: new Date("2023-07-10"), status: "processing", total: "349.85" }
    ];
    
    orders.forEach(order => this.createOrder(order));
    
    // Order Items
    const orderItems = [
      { orderId: 1, productId: 1, quantity: 10, price: "299.90" },
      { orderId: 1, productId: 2, quantity: 6, price: "299.94" },
      { orderId: 2, productId: 5, quantity: 8, price: "1039.92" },
      { orderId: 2, productId: 3, quantity: 10, price: "199.90" },
      { orderId: 3, productId: 4, quantity: 2, price: "179.98" },
      { orderId: 3, productId: 1, quantity: 5, price: "149.95" }
    ];
    
    orderItems.forEach(item => this.createOrderItem(item));
    
    // Sample expenses
    const expenses = [
      { category: "Rent", amount: "2500.00", date: new Date("2023-06-01"), description: "Monthly rent payment" },
      { category: "Utilities", amount: "450.00", date: new Date("2023-06-05"), description: "Electricity and water" },
      { category: "Salaries", amount: "8500.00", date: new Date("2023-06-15"), description: "Staff salaries" },
      { category: "Inventory", amount: "3750.00", date: new Date("2023-06-20"), description: "Stock purchase" },
      { category: "Marketing", amount: "1200.00", date: new Date("2023-06-25"), description: "Online ads campaign" }
    ];
    
    expenses.forEach(expense => this.createExpense(expense));
    
    // Sample inventory requests
    const requests = [
      { productId: 1, productName: "Widget A", quantity: 50, priority: "high", notes: "Running low on stock", status: "pending", userId: 1, createdAt: new Date("2023-07-01") },
      { productId: 4, productName: "Product D", quantity: 30, priority: "urgent", notes: "Critical for current project", status: "approved", userId: 1, createdAt: new Date("2023-06-28") }
    ];
    
    requests.forEach(request => this.createInventoryRequest(request));
    
    // Sample activities
    const activities = [
      { type: "inventory", description: "New inventory received: 50 units of Product X added to inventory", timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), userId: 1, relatedId: 1, relatedType: "product" },
      { type: "sale", description: "New sale completed: Order #1234 for $2,380 by Client Y", timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), userId: 1, relatedId: 1, relatedType: "order" },
      { type: "client", description: "New client registered: ABC Corporation added as a new client", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), userId: 1, relatedId: 1, relatedType: "client" },
      { type: "request", description: "Inventory request approved: Request #4567 for 30 units of Product Z", timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000), userId: 1, relatedId: 2, relatedType: "request" }
    ];
    
    activities.forEach(activity => this.createActivity(activity));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const newUser: User = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }
  
  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.productIdCounter++;
    const newProduct: Product = { ...product, id };
    this.products.set(id, newProduct);
    
    // Create activity
    await this.createActivity({
      type: "inventory",
      description: `Product ${newProduct.name} added to inventory`,
      timestamp: new Date(),
      userId: 1,
      relatedId: id,
      relatedType: "product"
    });
    
    return newProduct;
  }
  
  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const existingProduct = this.products.get(id);
    if (!existingProduct) return undefined;
    
    const updatedProduct = { ...existingProduct, ...product };
    this.products.set(id, updatedProduct);
    
    // Create activity
    await this.createActivity({
      type: "inventory",
      description: `Product ${updatedProduct.name} updated`,
      timestamp: new Date(),
      userId: 1,
      relatedId: id,
      relatedType: "product"
    });
    
    return updatedProduct;
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    const product = this.products.get(id);
    if (!product) return false;
    
    this.products.delete(id);
    
    // Create activity
    await this.createActivity({
      type: "inventory",
      description: `Product ${product.name} deleted from inventory`,
      timestamp: new Date(),
      userId: 1,
      relatedId: id,
      relatedType: "product"
    });
    
    return true;
  }
  
  // Client methods
  async getClients(): Promise<Client[]> {
    return Array.from(this.clients.values());
  }
  
  async getClient(id: number): Promise<Client | undefined> {
    return this.clients.get(id);
  }
  
  async createClient(client: InsertClient): Promise<Client> {
    const id = this.clientIdCounter++;
    const newClient: Client = { ...client, id };
    this.clients.set(id, newClient);
    
    // Create activity
    await this.createActivity({
      type: "client",
      description: `New client ${newClient.name} registered`,
      timestamp: new Date(),
      userId: 1,
      relatedId: id,
      relatedType: "client"
    });
    
    return newClient;
  }
  
  async updateClient(id: number, client: Partial<InsertClient>): Promise<Client | undefined> {
    const existingClient = this.clients.get(id);
    if (!existingClient) return undefined;
    
    const updatedClient = { ...existingClient, ...client };
    this.clients.set(id, updatedClient);
    
    return updatedClient;
  }
  
  async deleteClient(id: number): Promise<boolean> {
    const client = this.clients.get(id);
    if (!client) return false;
    
    this.clients.delete(id);
    return true;
  }
  
  // Order methods
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }
  
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  async createOrder(order: InsertOrder): Promise<Order> {
    const id = this.orderIdCounter++;
    const newOrder: Order = { ...order, id };
    this.orders.set(id, newOrder);
    
    // Create activity
    await this.createActivity({
      type: "sale",
      description: `New order #${id} created with total $${order.total}`,
      timestamp: new Date(),
      userId: 1,
      relatedId: id,
      relatedType: "order"
    });
    
    return newOrder;
  }
  
  async updateOrder(id: number, order: Partial<InsertOrder>): Promise<Order | undefined> {
    const existingOrder = this.orders.get(id);
    if (!existingOrder) return undefined;
    
    const updatedOrder = { ...existingOrder, ...order };
    this.orders.set(id, updatedOrder);
    
    return updatedOrder;
  }
  
  // Order Item methods
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(item => item.orderId === orderId);
  }
  
  async createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.orderItemIdCounter++;
    const newOrderItem: OrderItem = { ...orderItem, id };
    this.orderItems.set(id, newOrderItem);
    
    // Update product quantity
    const product = this.products.get(orderItem.productId);
    if (product) {
      const updatedProduct = { 
        ...product, 
        quantity: Math.max(0, product.quantity - orderItem.quantity) 
      };
      this.products.set(product.id, updatedProduct);
    }
    
    return newOrderItem;
  }
  
  // Expense methods
  async getExpenses(): Promise<Expense[]> {
    return Array.from(this.expenses.values());
  }
  
  async getExpense(id: number): Promise<Expense | undefined> {
    return this.expenses.get(id);
  }
  
  async createExpense(expense: InsertExpense): Promise<Expense> {
    const id = this.expenseIdCounter++;
    const newExpense: Expense = { ...expense, id };
    this.expenses.set(id, newExpense);
    
    // Create activity
    await this.createActivity({
      type: "expense",
      description: `New expense of $${expense.amount} for ${expense.category}`,
      timestamp: new Date(),
      userId: 1,
      relatedId: id,
      relatedType: "expense"
    });
    
    return newExpense;
  }
  
  async updateExpense(id: number, expense: Partial<InsertExpense>): Promise<Expense | undefined> {
    const existingExpense = this.expenses.get(id);
    if (!existingExpense) return undefined;
    
    const updatedExpense = { ...existingExpense, ...expense };
    this.expenses.set(id, updatedExpense);
    
    return updatedExpense;
  }
  
  async deleteExpense(id: number): Promise<boolean> {
    const expense = this.expenses.get(id);
    if (!expense) return false;
    
    this.expenses.delete(id);
    return true;
  }
  
  // Inventory Request methods
  async getInventoryRequests(): Promise<InventoryRequest[]> {
    return Array.from(this.inventoryRequests.values());
  }
  
  async getInventoryRequest(id: number): Promise<InventoryRequest | undefined> {
    return this.inventoryRequests.get(id);
  }
  
  async createInventoryRequest(request: InsertInventoryRequest): Promise<InventoryRequest> {
    const id = this.requestIdCounter++;
    const newRequest: InventoryRequest = { ...request, id };
    this.inventoryRequests.set(id, newRequest);
    
    // Create activity
    await this.createActivity({
      type: "request",
      description: `New inventory request for ${request.quantity} units of ${request.productName}`,
      timestamp: new Date(),
      userId: request.userId,
      relatedId: id,
      relatedType: "request"
    });
    
    return newRequest;
  }
  
  async updateInventoryRequest(id: number, request: Partial<InsertInventoryRequest>): Promise<InventoryRequest | undefined> {
    const existingRequest = this.inventoryRequests.get(id);
    if (!existingRequest) return undefined;
    
    const updatedRequest = { ...existingRequest, ...request };
    this.inventoryRequests.set(id, updatedRequest);
    
    if (request.status === "approved") {
      // Create activity
      await this.createActivity({
        type: "request",
        description: `Inventory request #${id} for ${existingRequest.quantity} units of ${existingRequest.productName} approved`,
        timestamp: new Date(),
        userId: 1,
        relatedId: id,
        relatedType: "request"
      });
    }
    
    return updatedRequest;
  }
  
  // Activity methods
  async getActivities(limit: number = 10): Promise<Activity[]> {
    const activities = Array.from(this.activities.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    return limit ? activities.slice(0, limit) : activities;
  }
  
  async createActivity(activity: InsertActivity): Promise<Activity> {
    const id = this.activityIdCounter++;
    const newActivity: Activity = { ...activity, id };
    this.activities.set(id, newActivity);
    
    return newActivity;
  }
  
  // Dashboard methods
  async getLowStockProducts(): Promise<Product[]> {
    return Array.from(this.products.values())
      .filter(product => product.quantity <= product.minQuantity)
      .sort((a, b) => (a.quantity / a.minQuantity) - (b.quantity / b.minQuantity));
  }
  
  async getDashboardStats(): Promise<any> {
    const products = await this.getProducts();
    const clients = await this.getClients();
    const orders = await this.getOrders();
    const expenses = await this.getExpenses();
    const lowStock = await this.getLowStockProducts();
    
    // Calculate total inventory value
    const totalInventoryValue = products.reduce((sum, product) => {
      return sum + (Number(product.price) * product.quantity);
    }, 0);
    
    // Calculate total revenue
    const totalRevenue = orders.reduce((sum, order) => {
      return sum + Number(order.total);
    }, 0);
    
    // Calculate total expenses
    const totalExpenses = expenses.reduce((sum, expense) => {
      return sum + Number(expense.amount);
    }, 0);
    
    // Calculate profit
    const profit = totalRevenue - totalExpenses;
    
    // Monthly data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    
    // Generate random monthly data for demonstration
    const inventoryTrends = months.map((_, index) => ({
      month: months[index],
      inventory: 4000 + Math.floor(Math.random() * 1500),
      sold: 300 + Math.floor(Math.random() * 500)
    }));
    
    const financeTrends = months.map((_, index) => ({
      month: months[index],
      revenue: 20000 + Math.floor(Math.random() * 15000),
      expenses: 15000 + Math.floor(Math.random() * 8000)
    }));
    
    return {
      stats: {
        totalInventory: products.reduce((sum, product) => sum + product.quantity, 0),
        totalInventoryValue,
        monthlyRevenue: totalRevenue,
        totalClients: clients.length,
        lowStockCount: lowStock.length,
        profit
      },
      inventoryTrends,
      financeTrends,
      lowStock
    };
  }
}

export const storage = new DatabaseStorage();
