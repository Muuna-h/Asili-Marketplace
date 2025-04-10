import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { COLORS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardStats() {
  // Fetch products count
  const { data: products } = useQuery({
    queryKey: ["/api/products"],
    select: (data) => data?.length || 0
  });
  
  // Fetch orders
  const { data: orders } = useQuery({
    queryKey: ["/api/orders"],
    select: (data) => {
      if (!data) return { total: 0, pending: 0, completed: 0 };
      
      return {
        total: data.length,
        pending: data.filter((order: any) => order.status === "pending").length,
        completed: data.filter((order: any) => order.status === "completed").length
      };
    }
  });
  
  // Calculate total revenue
  const { data: revenue } = useQuery({
    queryKey: ["/api/orders"],
    select: (data) => {
      if (!data) return 0;
      return data.reduce((total: number, order: any) => total + order.total, 0);
    }
  });
  
  const stats = [
    {
      title: "Total Products",
      value: products || 0,
      icon: "fas fa-box",
      color: COLORS.primary,
      link: "/admin/products"
    },
    {
      title: "Total Orders",
      value: orders?.total || 0,
      icon: "fas fa-shopping-bag",
      color: COLORS.secondary,
      link: "/admin/orders"
    },
    {
      title: "Pending Orders",
      value: orders?.pending || 0,
      icon: "fas fa-clock",
      color: COLORS.accent,
      link: "/admin/orders"
    },
    {
      title: "Total Revenue",
      value: `KSh ${(revenue || 0).toLocaleString()}`,
      icon: "fas fa-money-bill-wave",
      color: "#10B981", // Success color
      link: "/admin/orders"
    }
  ];
  
  // Fetch recent orders
  const { data: recentOrders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["/api/orders"],
    select: (data) => data?.slice(0, 5) || []
  });
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
              >
                <i className={stat.icon}></i>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <Link href={stat.link}>
                <p className="text-xs text-blue-500 cursor-pointer hover:underline mt-1">
                  View Details
                </p>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Link href="/admin/orders">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {isLoadingOrders ? (
            <div className="animate-pulse space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          ) : recentOrders && recentOrders.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-4 text-sm font-medium text-gray-500">
                <div>Order ID</div>
                <div>Customer</div>
                <div>Amount</div>
                <div>Status</div>
              </div>
              <div className="divide-y">
                {recentOrders.map((order: any) => (
                  <div key={order.id} className="grid grid-cols-4 py-3 text-sm">
                    <div>#{order.id.toString().padStart(5, '0')}</div>
                    <div>{order.fullName}</div>
                    <div>KSh {order.total.toLocaleString()}</div>
                    <div>
                      <span 
                        className={`py-1 px-2 rounded-full text-xs ${
                          order.status === "completed" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              No orders yet
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
