import { useState } from "react";
import { useAuth } from "@/hooks/UseAuth";

const AdminLogin = () => {
    // 1. Store email & password from form
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 2. Use our new authentication hook
    const { login } = useAuth();

    // 3. Submit handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await login(email, password);

        if (result.success) {
            window.location.href = "/admin";
        } else {
            alert(result.message);
        }
    };

    // 4. UI form
    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary">
            <form
                onSubmit={handleSubmit}
                className="p-6 bg-white rounded-xl shadow max-w-md w-full"
            >
                <h1 className="text-2xl font-bold mb-4">Admin Login</h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded mb-3"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded mb-3"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="w-full bg-black text-white p-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;