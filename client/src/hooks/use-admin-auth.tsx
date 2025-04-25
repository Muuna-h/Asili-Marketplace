import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { useLocation } from "wouter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type User = {
  id: number;
  username: string;
  isAdmin: boolean;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  
  // Check if user is already logged in
  const { data, isLoading } = useQuery({
    queryKey: ["/api/auth/me"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });
        
        if (!res.ok) {
          if (res.status === 401) {
            return null;
          }
          throw new Error("Failed to fetch user");
        }
        
        return await res.json();
      } catch (error) {
        console.error("Error fetching user:", error);
        return null;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
  
  // Update user state when data changes
  useEffect(() => {
    setUser(data);
  }, [data]);
  
  // Login function
  const login = async (username: string, password: string) => {
    try {
      const res = await apiRequest("POST", "/api/auth/login", { username, password });
      const userData = await res.json();
      
      // Check if the user is an admin
      if (!userData.isAdmin) {
        toast({
          title: "Access Denied",
          description: "Only admin users can access the dashboard.",
          variant: "destructive"
        });
        return;
      }
      
      setUser(userData);
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userData.username}!`
      });
      
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "Invalid username or password.",
        variant: "destructive"
      });
    }
  };
  
  // Logout function
  const logout = async () => {
    try {
      await apiRequest("POST", "/api/auth/logout", {});
      setUser(null);
      queryClient.invalidateQueries();
      
      toast({
        title: "Logout Successful",
        description: "You have been logged out successfully."
      });
      
      navigate("/admin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated: !!user,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}

// Protected route wrapper for admin routes
export function withAdminAuth(Component: React.ComponentType<any>) {
  return function ProtectedRoute(props: any) {
    const { isAuthenticated, isLoading } = useAdminAuth();
    const [, navigate] = useLocation();
    
    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        navigate("/admin");
      }
    }, [isAuthenticated, isLoading, navigate]);
    
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
    }
    
    return isAuthenticated ? <Component {...props} /> : null;
  };
}