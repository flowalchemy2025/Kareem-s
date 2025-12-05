import ProtectedAdminRoute from "@/components/admin/ProtectedAdminRoute";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <ProtectedAdminRoute>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

                <div className="flex gap-6">
                    <Link to="/admin/add">
                        <button className="px-5 py-3 bg-green-600 text-white rounded-lg shadow">
                            ➕ Add Dish
                        </button>
                    </Link>

                    <Link to="/admin/manage">
                        <button className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow">
                            📋 Manage Dishes
                        </button>
                    </Link>
                </div>
            </div>
        </ProtectedAdminRoute>
    );
};

export default AdminDashboard;
