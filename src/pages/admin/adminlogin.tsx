import { useState } from "react";
import { api } from "../../lib/api";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/admin/login", { email, password });
            localStorage.setItem("adminToken", res.data.token);
            window.location.href = "/admin";
        } catch {
            alert("Invalid login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary">
            <form
                onSubmit={login}
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