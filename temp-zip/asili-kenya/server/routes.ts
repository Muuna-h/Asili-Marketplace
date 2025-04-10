import express, { type Express, Response } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import { storage } from "./storage";
import { insertOrderSchema, insertProductSchema, insertCategorySchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

// Declare module for session
declare module "express-session" {
  interface SessionData {
    userId?: number;
  }
}

// Extend Request type to include session
interface Request extends express.Request {
  session: session.Session & Partial<session.SessionData>;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = express.Router();
  
  // Categories routes
  apiRouter.get("/categories", async (req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });
  
  apiRouter.get("/categories/featured", async (req: Request, res: Response) => {
    try {
      const featuredCategories = await storage.getFeaturedCategories();
      res.json(featuredCategories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured categories" });
    }
  });
  
  apiRouter.get("/categories/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const category = await storage.getCategoryBySlug(slug);
      
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });
  
  apiRouter.post("/categories", async (req: Request, res: Response) => {
    try {
      const categoryData = insertCategorySchema.parse(req.body);
      const newCategory = await storage.createCategory(categoryData);
      res.status(201).json(newCategory);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to create category" });
    }
  });
  
  apiRouter.put("/categories/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const categoryId = parseInt(id);
      
      if (isNaN(categoryId)) {
        return res.status(400).json({ error: "Invalid category ID" });
      }
      
      const categoryData = insertCategorySchema.partial().parse(req.body);
      const updatedCategory = await storage.updateCategory(categoryId, categoryData);
      
      if (!updatedCategory) {
        return res.status(404).json({ error: "Category not found" });
      }
      
      res.json(updatedCategory);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to update category" });
    }
  });
  
  apiRouter.delete("/categories/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const categoryId = parseInt(id);
      
      if (isNaN(categoryId)) {
        return res.status(400).json({ error: "Invalid category ID" });
      }
      
      await storage.deleteCategory(categoryId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete category" });
    }
  });
  
  // Products routes
  apiRouter.get("/products", async (req: Request, res: Response) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });
  
  apiRouter.get("/products/featured", async (req: Request, res: Response) => {
    try {
      const featuredProducts = await storage.getFeaturedProducts();
      res.json(featuredProducts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured products" });
    }
  });
  
  apiRouter.get("/products/new-arrivals", async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 4;
      const newArrivals = await storage.getNewArrivals(limit);
      res.json(newArrivals);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch new arrivals" });
    }
  });
  
  apiRouter.get("/products/category/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const categoryId = parseInt(id);
      
      if (isNaN(categoryId)) {
        return res.status(400).json({ error: "Invalid category ID" });
      }
      
      const products = await storage.getProductsByCategory(categoryId);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products by category" });
    }
  });
  
  apiRouter.get("/products/search", async (req: Request, res: Response) => {
    try {
      const { q } = req.query;
      
      if (!q || typeof q !== "string") {
        return res.status(400).json({ error: "Search query is required" });
      }
      
      const products = await storage.getProductsBySearch(q);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to search products" });
    }
  });
  
  apiRouter.get("/products/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const product = await storage.getProductBySlug(slug);
      
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });
  
  apiRouter.post("/products", async (req: Request, res: Response) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const newProduct = await storage.createProduct(productData);
      res.status(201).json(newProduct);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to create product" });
    }
  });
  
  apiRouter.put("/products/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const productId = parseInt(id);
      
      if (isNaN(productId)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }
      
      const productData = insertProductSchema.partial().parse(req.body);
      const updatedProduct = await storage.updateProduct(productId, productData);
      
      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.json(updatedProduct);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to update product" });
    }
  });
  
  apiRouter.delete("/products/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const productId = parseInt(id);
      
      if (isNaN(productId)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }
      
      await storage.deleteProduct(productId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });
  
  // Orders routes
  apiRouter.get("/orders", async (req: Request, res: Response) => {
    try {
      const orders = await storage.getOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });
  
  apiRouter.get("/orders/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const orderId = parseInt(id);
      
      if (isNaN(orderId)) {
        return res.status(400).json({ error: "Invalid order ID" });
      }
      
      const order = await storage.getOrder(orderId);
      
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });
  
  apiRouter.post("/orders", async (req: Request, res: Response) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const newOrder = await storage.createOrder(orderData);
      res.status(201).json(newOrder);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to create order" });
    }
  });
  
  apiRouter.put("/orders/:id/status", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const orderId = parseInt(id);
      
      if (isNaN(orderId)) {
        return res.status(400).json({ error: "Invalid order ID" });
      }
      
      const { status } = req.body;
      
      if (!status || typeof status !== "string") {
        return res.status(400).json({ error: "Status is required" });
      }
      
      const updatedOrder = await storage.updateOrderStatus(orderId, status);
      
      if (!updatedOrder) {
        return res.status(404).json({ error: "Order not found" });
      }
      
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ error: "Failed to update order status" });
    }
  });
  
  // Auth routes
  apiRouter.post("/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) { // In production, use proper password hashing
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // Implement session for admin auth
      // In production, use proper session management
      if (!req.session) {
        return res.status(500).json({ error: "Session unavailable" });
      }
      
      // Store user ID in session
      req.session.userId = user.id;
      
      // In production, implement a proper authentication system with JWT or sessions
      res.json({ id: user.id, username: user.username, isAdmin: user.isAdmin });
    } catch (error) {
      res.status(500).json({ error: "Authentication failed" });
    }
  });
  
  // Get current user
  apiRouter.get("/auth/me", async (req: Request, res: Response) => {
    try {
      // Check if user is logged in
      if (!req.session || !req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      
      const userId = req.session.userId;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Return user without password
      res.json({
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to get user" });
    }
  });
  
  // Logout
  apiRouter.post("/auth/logout", async (req: Request, res: Response) => {
    try {
      if (req.session) {
        req.session.destroy((err) => {
          if (err) {
            return res.status(500).json({ error: "Failed to logout" });
          }
          res.json({ success: true });
        });
      } else {
        res.json({ success: true });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to logout" });
    }
  });
  
  // Register the API routes with /api prefix
  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
