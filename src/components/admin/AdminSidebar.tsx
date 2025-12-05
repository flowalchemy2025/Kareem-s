import { Link } from "react-router-dom";

const AdminSidebar = () => {
    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

            <nav className="flex flex-col gap-4 text-gray-700">
                <Link to="/admin" className="hover:text-orange-600">Dashboard</Link>
                <Link to="/admin/add" className="hover:text-orange-600">Add Dish</Link>
                <Link to="/admin/manage" className="hover:text-orange-600">Manage Dishes</Link>
            </nav>
        </div>
    );
};

export default AdminSidebar;