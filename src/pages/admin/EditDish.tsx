import { useLocation, useNavigate } from "react-router-dom";
import { DishType } from "@/types/DishType";
import DishForm from "@/components/admin/DishForm";
import AdminLayout from "@/components/admin/AdminLayout";

export default function EditDish() {
    const location = useLocation();
    const navigate = useNavigate();

    // Dish data passed from ManageDishes page
    const dish = location.state?.dish as DishType | undefined;

    if (!dish) {
        return (
            <AdminLayout>
                <p className="text-red-500 font-semibold">
                    No dish data found. Please go back and try again.
                </p>
                <button
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => navigate("/admin/manage")}
                >
                    Back to Manage Dishes
                </button>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <h2 className="text-2xl font-bold mb-6">Edit Dish</h2>

            <DishForm
                mode="edit"
                existingDish={dish}
                rowNumber={dish.rowNumber}
            />
        </AdminLayout>
    );
}