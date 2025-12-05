// components/admin/ProtectedAdminRoute.tsx
// Protects all admin pages using the new condition-based authentication

import { useAuth } from "@/hooks/UseAuth";

const ProtectedAdminRoute = ({ children }) => {

    // 1. Checks if admin is authenticated
    const { isAuthenticated } = useAuth();

    // 2. Show message if not authenticated
    if (!isAuthenticated()) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
                Unauthorized Access
            </div>
        );
    }

    // 3. Otherwise render the protected admin page
    return children;
};

export default ProtectedAdminRoute;