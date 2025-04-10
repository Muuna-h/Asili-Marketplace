import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { COLORS } from "@/lib/constants";

export default function AdminHeader() {
  const { user, logout } = useAdminAuth();
  
  return (
    <header className="bg-white shadow-sm py-4 px-6 fixed top-0 left-0 right-0 z-30">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="font-display text-xl" style={{ color: COLORS.primary }}>
            ASILI KENYA
          </h1>
          <span className="ml-2 text-sm font-medium py-1 px-2 rounded" style={{ backgroundColor: COLORS.secondary, color: 'white' }}>
            Admin
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <div className="text-sm text-gray-500">
                Logged in as <span className="font-medium">{user.username}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout}
                className="flex items-center"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
