// hooks/UseAuth.ts

export const useAuth = () => {

    // 1. Login function — checks credentials using condition operator
    const login = async (email: string, password: string) => {

        // 2. Hardcoded admin credentials (you can move these to .env)
        const ADMIN_EMAIL = "admin@kareems.com";
        const ADMIN_PASSWORD = "kareems123";

        // 3. Condition check to authenticate admin
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            localStorage.setItem("adminToken", "authenticated_admin");
            return { success: true, message: "Admin Logged In" };
        }

        // 4. Invalid credentials response
        return { success: false, message: "Invalid login credentials" };
    };

    // 5. Logout removes admin token
    const logout = () => {
        localStorage.removeItem("adminToken");
    };

    // 6. Verifies whether admin is authenticated
    const isAuthenticated = () => {
        return localStorage.getItem("adminToken") === "authenticated_admin";
    };

    return { login, logout, isAuthenticated };
};