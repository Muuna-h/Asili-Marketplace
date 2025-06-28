import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/hooks/use-cart";
import { AdminAuthProvider } from "@/hooks/use-admin-auth";

import HomePage from "@/pages/home";
import ProductPage from "@/pages/product";
import CategoryPage from "@/pages/category";
import CategoriesPage from "@/pages/categories";
import CheckoutPage from "@/pages/checkout";
import ConfirmationPage from "@/pages/confirmation";
import ContactPage from "@/pages/contact";
import NotFound from "@/pages/not-found";
import AboutPage from "@/pages/about";
import TermsPage from "@/pages/terms";
import PrivacyPage from "@/pages/privacy";
import PromotionsPage from "@/pages/promotions";

// Admin pages
import AdminLoginPage from "@/pages/admin/login";
import AdminDashboardPage from "@/pages/admin/dashboard";
import AdminProductsPage from "@/pages/admin/products";
import AdminOrdersPage from "@/pages/admin/orders";
import AdminAddProductPage from "@/pages/admin/add-product";
import AdminEditProductPage from "@/pages/admin/edit-product";
import AdminCreateOrderPage from "@/pages/admin/create-order";
import AdminCategoriesPage from "@/pages/admin/categories";
import AdminAddCategoryPage from "@/pages/admin/add-category";
import AdminEditCategoryPage from "@/pages/admin/edit-category";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={HomePage} />
      <Route path="/product/:slug" component={ProductPage} />
      <Route path="/category/:slug" component={CategoryPage} />
      <Route path="/categories" component={CategoriesPage} />
      <Route path="/checkout" component={CheckoutPage} />
      <Route path="/confirmation/:orderId" component={ConfirmationPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/promotions" component={PromotionsPage} />
      
      {/* Admin Routes */}
      <Route path="/admin" component={AdminLoginPage} />
      <Route path="/admin/dashboard" component={AdminDashboardPage} />
      <Route path="/admin/products" component={AdminProductsPage} />
      <Route path="/admin/orders" component={AdminOrdersPage} />
      <Route path="/admin/orders/create" component={AdminCreateOrderPage} />
      <Route path="/admin/products/add" component={AdminAddProductPage} />
      <Route path="/admin/products/edit/:id" component={AdminEditProductPage} />
      <Route path="/admin/categories" component={AdminCategoriesPage} />
      <Route path="/admin/categories/add" component={AdminAddCategoryPage} />
      <Route path="/admin/categories/edit/:id" component={AdminEditCategoryPage} />

      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider>
        <CartProvider>
          <Router />
          <Toaster />
        </CartProvider>
      </AdminAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
