import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import pgSession from "connect-pg-simple";
import { registerRoutes } from "././routes";
import { setupVite, serveStatic, log } from "../vite";
import pg from 'pg';
const { Pool } = pg;

// Initialize PostgreSQL session store
const PgStore = pgSession(session);

// Create pool with proper typing
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up session middleware
app.use(session({
  store: new PgStore({
    pool,
    tableName: 'session' // Use this table for storing session data
  }),
  secret: process.env.SESSION_SECRET || 'asili-kenya-secret', // Use env variable in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: false // Set to true in production with HTTPS
  }
}));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Test database connection and tables
app.get('/test-db', async (req, res) => {
  try {
    // Test categories table
    const categoriesResult = await pool.query('SELECT * FROM categories LIMIT 1');
    // Test products table
    const productsResult = await pool.query('SELECT * FROM products LIMIT 1');
    
    res.json({
      success: true,
      message: 'Database connection and tables verified',
      categories: categoriesResult.rows.length > 0 ? 'Categories table exists' : 'Categories table is empty',
      products: productsResult.rows.length > 0 ? 'Products table exists' : 'Products table is empty'
    });
  } catch (error: any) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      message: 'Database error',
      error: error.message
    });
  }
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
})();
export default app; // for Vercel
