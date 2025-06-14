import { db } from "./db";
import { categories, products } from "@shared/schema";
import dotenv from 'dotenv';
import { sql } from "drizzle-orm";

// Load environment variables from .env file
dotenv.config();

// Define the categories directly in the script
const initialCategories = [
  { name: "Fashion", slug: "fashion", featured: true },
  { name: "Foods & Drinks", slug: "foods-drinks", featured: true },
  { name: "Crafts", slug: "crafts", featured: true },
  { name: "Gifts", slug: "gifts", featured: true },
  { name: "Technology", slug: "technology" },
  { name: "Health & Beauty", slug: "health-beauty" },
  { name: "Furniture", slug: "furniture" },
  { name: "Textiles", slug: "textiles" },
  { name: "Plants", slug: "plants" },
  { name: "Jua Kali", slug: "jua-kali" }
];

// Sample Stock Images (Copied from client/src/lib/constants.ts)
// Using real URLs now instead of placeholders
const STOCK_IMAGES = {
  handcrafted: "https://images.unsplash.com/photo-1621357860089-93139a5a2375?auto=format&fit=crop&w=800&q=80",
  textiles: "https://images.unsplash.com/photo-1591378603223-e15b45a3654d?auto=format&fit=crop&w=800&q=80",
  foodDrinks: "https://images.unsplash.com/photo-1528755192414-9666f1a774ef?auto=format&fit=crop&w=800&q=80",
  furniture: "https://images.unsplash.com/photo-1632149877166-f75d49000351?auto=format&fit=crop&w=800&q=80",
  beadwork: "https://images.unsplash.com/photo-1518057111178-44a106bad636?auto=format&fit=crop&w=800&q=80",
  coffee: "https://images.unsplash.com/photo-1534186166251-b40365783de9?auto=format&fit=crop&w=800&q=80",
  basket: "https://images.unsplash.com/photo-1597696929736-7d04d0e05a6e?auto=format&fit=crop&w=800&q=80",
  woodCarving: "https://images.unsplash.com/photo-1558350315-8aa00e8e4590?auto=format&fit=crop&w=800&q=80",
  coffeeTable: "https://images.unsplash.com/photo-1575312065386-81d671c5acea?auto=format&fit=crop&w=800&q=80",
  sheaButter: "https://images.unsplash.com/photo-1590422749897-47036c445c71?auto=format&fit=crop&w=800&q=80",
  ankaraBag: "https://images.unsplash.com/photo-1597696929736-7d04d0e05a6e?auto=format&fit=crop&w=800&q=80", // Note: Same as basket in original constants
};

// Define sample products with correct category IDs
const initialProducts = [
  // From featured-products.tsx
  {
    name: "Handmade Soapstone Bowl",
    slug: "handmade-soapstone-bowl",
    price: 1950,
    images: ["https://shopsaskia.com/cdn/shop/products/Rev_c2004_2_Pattern_Bowls_A_Stack_600px_600x.jpg?v=1668009456"],
    categoryId: 3, // Crafts ID
    description: "Beautifully hand-carved soapstone bowl from Western Kenya",
    featured: true // Mark as featured
  },
  {
    name: "Beaded Maasai Necklace",
    slug: "beaded-maasai-necklace",
    price: 2200,
    images: ["https://i.pinimg.com/originals/7c/91/a2/7c91a29845aa6fcf4cfabf07be039588.jpg"],
    categoryId: 1, // Fashion ID
    description: "Traditional Maasai beaded necklace with authentic designs",
    featured: true // Mark as featured
  },
  {
    name: "Organic Kenyan Coffee Beans",
    slug: "organic-kenyan-coffee-beans",
    price: 850,
    images: ["https://cdn11.bigcommerce.com/s-hga8yrisp5/images/stencil/original/products/188/439/Kenyan_Green__62539.1534010530.jpg?c=2"],
    categoryId: 2, // Foods & Drinks ID
    description: "Premium AA grade coffee beans from the highlands of Kenya",
    featured: true // Mark as featured
  },
  {
    name: "Handwoven Kiondo Basket",
    slug: "handwoven-kiondo-basket",
    price: 1750,
    images: ["https://th.bing.com/th/id/OIP.8VEXvgTYRwF0I012uDj-PQHaHa?w=1080&h=1080&rs=1&pid=ImgDetMain"],
    categoryId: 8, // Textiles ID
    description: "Traditional handwoven basket with leather trim and handles",
    featured: true // Mark as featured
  },
  // From new-arrivals.tsx
  {
    name: "Reclaimed Wood Coffee Table",
    slug: "reclaimed-wood-coffee-table",
    price: 12500,
    images: ["https://i.pinimg.com/originals/84/a3/4a/84a34a73b457aad06f605721f34c6f5f.jpg"],
    categoryId: 7, // Furniture ID
    description: "Handcrafted coffee table made from reclaimed wood"
  },
  {
    name: "Organic Shea Butter Set",
    slug: "organic-shea-butter-set",
    price: 1850,
    images: ["https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/aur/aur90141/v/14.jpg"],
    categoryId: 6, // Health & Beauty ID
    description: "100% organic shea butter skincare set"
  },
  {
    name: "Ankara Print Tote Bag",
    slug: "ankara-print-tote-bag",
    price: 1200,
    images: ["https://th.bing.com/th/id/OIP.6hHM5zXiyYAkygIhZVDwngHaHa?rs=1&pid=ImgDetMain"],
    categoryId: 1, // Fashion ID
    description: "Colorful tote bag with traditional Ankara print"
  },
  {
    name: "Hand-Carved Wooden Animals",
    slug: "hand-carved-wooden-animals",
    price: 890,
    images: ["https://shopsaskia.com/cdn/shop/products/Rev_c2004_2_Pattern_Bowls_A_Stack_600px_600x.jpg?v=1668009456"],
    categoryId: 3, // Crafts ID
    description: "Set of hand-carved wooden animal figures"
  }
];

async function seedDatabase() {
  console.log("Seeding database...");

  // --- Seed Categories ---
  if (!initialCategories || initialCategories.length === 0) {
    console.log("No categories defined to seed.");
  } else {
    try {
      console.log(`Attempting to insert/update ${initialCategories.length} categories...`);
      const result = await db
        .insert(categories)
        .values(initialCategories)
        .onConflictDoNothing() 
        .returning({ id: categories.id, name: categories.name }); 

      console.log(` -> Successfully inserted ${result.length} new categories.`);
      if (result.length < initialCategories.length) {
          console.log(` -> ${initialCategories.length - result.length} categories were skipped (likely already existed).`);
      }
    } catch (error) {
      console.error("Error seeding categories:", error);
      process.exit(1); 
    }
  }

  // --- Seed Products ---
  if (!initialProducts || initialProducts.length === 0) {
    console.log("No products defined to seed.");
  } else {
     try {
      console.log(`Attempting to insert/update ${initialProducts.length} products...`);
      
      // Ensure images is an array of strings
      const productsToInsert = initialProducts.map(p => ({
          ...p,
          images: p.images // Directly use p.images as it's already string[]
      }));

      const result = await db
        .insert(products) // Use the imported products schema
        .values(productsToInsert) // Use the mapped product data
        .onConflictDoUpdate({ // Update instead of skip
          target: products.slug,
          set: {
            images: sql`excluded.images`,
            name: sql`excluded.name`,
            price: sql`excluded.price`,
            description: sql`excluded.description`,
            categoryId: sql`excluded.category_id`,
            featured: sql`excluded.featured`,
            stock: sql`excluded.stock`,
          }
        })
        .returning({ id: products.id, name: products.name }); 

      console.log(` -> Successfully updated/inserted ${result.length} products.`);
    } catch (error) {
      console.error("Error seeding products:", error);
      process.exit(1); 
    }
  }


  console.log("Database seeding finished.");
  // Drizzle with Neon/serverless doesn't strictly require closing for short scripts.
  // If the script hangs, you might need to manually end the connection:
  // await db.end(); // Or specific method for your driver if not neon/serverless
}

seedDatabase();