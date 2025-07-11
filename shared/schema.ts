import { pgTable, text, serial, integer, boolean, date, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User Model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("user"),
  email: text("email").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  role: true,
  email: true,
});

// Product/Inventory Model
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  sku: text("sku").notNull().unique(),
  description: text("description"),
  category: text("category").notNull(),
  quantity: integer("quantity").notNull().default(0),
  minQuantity: integer("min_quantity").notNull().default(10),
  price: numeric("price").notNull(),
  cost: numeric("cost").notNull(),
  status: text("status").notNull().default("active"),
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  sku: true,
  description: true,
  category: true,
  quantity: true,
  minQuantity: true,
  price: true,
  cost: true,
  status: true,
});

// Client Model
export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  company: text("company"),
  isActive: boolean("is_active").notNull().default(true),
});

export const insertClientSchema = createInsertSchema(clients).pick({
  name: true,
  email: true,
  phone: true,
  address: true,
  company: true,
  isActive: true,
});

// Order Model
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  date: timestamp("date").notNull(),
  status: text("status").notNull().default("pending"),
  total: numeric("total").notNull(),
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  clientId: true,
  date: true,
  status: true,
  total: true,
});

// Order Item Model
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  price: numeric("price").notNull(),
});

export const insertOrderItemSchema = createInsertSchema(orderItems).pick({
  orderId: true,
  productId: true,
  quantity: true,
  price: true,
});

// Expense Model
export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(),
  amount: numeric("amount").notNull(),
  date: timestamp("date").notNull(),
  description: text("description"),
});

export const insertExpenseSchema = createInsertSchema(expenses).pick({
  category: true,
  amount: true,
  date: true,
  description: true,
});

// Inventory Request Model
export const inventoryRequests = pgTable("inventory_requests", {
  id: serial("id").primaryKey(),
  productId: integer("product_id"),
  productName: text("product_name").notNull(),
  quantity: integer("quantity").notNull(),
  priority: text("priority").notNull().default("medium"),
  notes: text("notes"),
  status: text("status").notNull().default("pending"),
  userId: integer("user_id").notNull(),
  createdAt: timestamp("created_at").notNull(),
});

export const insertInventoryRequestSchema = createInsertSchema(inventoryRequests).pick({
  productId: true,
  productName: true,
  quantity: true,
  priority: true,
  notes: true,
  status: true,
  userId: true,
  createdAt: true,
});

// Activity Model
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  description: text("description").notNull(),
  timestamp: timestamp("timestamp").notNull(),
  userId: integer("user_id"),
  relatedId: integer("related_id"),
  relatedType: text("related_type"),
});

export const insertActivitySchema = createInsertSchema(activities).pick({
  type: true,
  description: true,
  timestamp: true,
  userId: true,
  relatedId: true,
  relatedType: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type InsertClient = z.infer<typeof insertClientSchema>;
export type Client = typeof clients.$inferSelect;

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems.$inferSelect;

export type InsertExpense = z.infer<typeof insertExpenseSchema>;
export type Expense = typeof expenses.$inferSelect;

export type InsertInventoryRequest = z.infer<typeof insertInventoryRequestSchema>;
export type InventoryRequest = typeof inventoryRequests.$inferSelect;

export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;
