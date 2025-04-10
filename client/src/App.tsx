import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/hooks/use-cart";
import { AdminAuthProvider } from "@/hooks/use-admin-auth";

import HomePage from "@/pages/home";
import ProductPage from "@/pages/product";
import CategoryPage from "@/pages/category";
import CheckoutPage from "@/pages/checkout";
import ConfirmationPage from "@/pages/confirmation";
import NotFound from "@/pages/not-found";

// Admin pages
import AdminLoginPage from "@/pages/admin/login";
import AdminDashboardPage from "@/pages/admin/dashboard";
import AdminProductsPage from "@/pages/admin/products";
import AdminOrdersPage from "@/pages/admin/orders";
import AdminAddProductPage from "@/pages/admin/add-product";
import AdminEditProductPage from "@/pages/admin/edit-product";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={HomePage} />
      <Route path="/product/:slug" component={ProductPage} />
      <Route path="/category/:slug" component={CategoryPage} />
      <Route path="/checkout" component={CheckoutPage} />
      <Route path="/confirmation/:orderId" component={ConfirmationPage} />
      
      {/* Admin Routes */}
      <Route path="/admin" component={AdminLoginPage} />
      <Route path="/admin/dashboard" component={AdminDashboardPage} />
      <Route path="/admin/products" component={AdminProductsPage} />
      <Route path="/admin/orders" component={AdminOrdersPage} />
      <Route path="/admin/products/add" component={AdminAddProductPage} />
      <Route path="/admin/products/edit/:id" component={AdminEditProductPage} />
      
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
