import { pgTable, text, serial, integer, doublePrecision, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users schema (for admin access only)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  isAdmin: true,
});

// Categories schema
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  image: text("image"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  slug: true,
  description: true,
  image: true,
  featured: true,
});

// Products schema
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  price: doublePrecision("price").notNull(),
  images: text("images").array().notNull(),
  categoryId: integer("category_id").notNull(),
  featured: boolean("featured").default(false),
  stock: integer("stock").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  slug: true,
  description: true,
  price: true,
  images: true,
  categoryId: true,
  featured: true,
  stock: true,
});

// Orders schema
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  notes: text("notes"),
  items: jsonb("items").notNull(),
  total: doublePrecision("total").notNull(),
  status: text("status").default("pending").notNull(),
  paymentMethod: text("payment_method").notNull(),
  mpesaCode: text("mpesa_code"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  fullName: true,
  phone: true,
  address: true,
  notes: true,
  items: true,
  total: true,
  status: true,
  paymentMethod: true,
  mpesaCode: true,
});

// Define types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

// Define cart item type for frontend
export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
};

// Define type for Product joined with Category
export type ProductWithCategory = Product & {
  category: Category | null; // Category can be null if the join finds no match
};

// --- RELATIONS ---
export const productsRelations = relations(products, ({ one }) => ({
	category: one(categories, {
		fields: [products.categoryId],
		references: [categories.id],
	}),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
	products: many(products),
}));

// Session table for connect-pg-simple
export const sessions = pgTable("session", {
  sid: text("sid").primaryKey().notNull(),
  sess: jsonb("sess").notNull(),
  expire: timestamp("expire").notNull(),
});