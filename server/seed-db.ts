import { db } from "./db";
import { users, products, clients, expenses, activities } from "@shared/schema";

async function seedDatabase() {
  try {
    console.log("Seeding database...");

    // Create admin user
    await db.insert(users).values({
      username: "admin",
      password: "admin123", // In production, this should be hashed
      name: "Administrator",
      role: "admin",
      email: "admin@company.com"
    });

    // Create sample products
    await db.insert(products).values([
      {
        name: "Wireless Mouse",
        sku: "WM001",
        description: "High-quality wireless mouse with ergonomic design",
        category: "Electronics",
        quantity: 25,
        minQuantity: 10,
        price: "29.99",
        cost: "15.00",
        status: "active"
      },
      {
        name: "USB Cable",
        sku: "UC002",
        description: "6ft USB-A to USB-C cable",
        category: "Accessories",
        quantity: 8,
        minQuantity: 15,
        price: "12.99",
        cost: "5.00",
        status: "active"
      },
      {
        name: "Laptop Stand",
        sku: "LS003",
        description: "Adjustable aluminum laptop stand",
        category: "Accessories",
        quantity: 12,
        minQuantity: 5,
        price: "49.99",
        cost: "25.00",
        status: "active"
      }
    ]);

    // Create sample clients
    await db.insert(clients).values([
      {
        name: "TechCorp Solutions",
        email: "contact@techcorp.com",
        phone: "(555) 123-4567",
        address: "123 Business Ave, City, State 12345",
        company: "TechCorp Solutions",
        isActive: true
      },
      {
        name: "Digital Innovations",
        email: "info@digitalinnovations.com",
        phone: "(555) 987-6543",
        address: "456 Innovation Dr, City, State 67890",
        company: "Digital Innovations",
        isActive: true
      }
    ]);

    // Create sample expenses
    await db.insert(expenses).values([
      {
        category: "Office Supplies",
        amount: "250.00",
        date: new Date("2025-01-15"),
        description: "Monthly office supplies order"
      },
      {
        category: "Utilities",
        amount: "180.00",
        date: new Date("2025-01-20"),
        description: "Electricity bill"
      },
      {
        category: "Marketing",
        amount: "500.00",
        date: new Date("2025-01-25"),
        description: "Online advertising campaign"
      }
    ]);

    // Create sample activities
    await db.insert(activities).values([
      {
        type: "product_added",
        description: "Added new product: Wireless Mouse",
        timestamp: new Date(),
        userId: 1,
        relatedType: "product",
        relatedId: 1
      },
      {
        type: "client_added",
        description: "Added new client: TechCorp Solutions",
        timestamp: new Date(),
        userId: 1,
        relatedType: "client",
        relatedId: 1
      }
    ]);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seedDatabase();