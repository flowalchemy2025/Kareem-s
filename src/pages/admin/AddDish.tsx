import ProtectedAdminRoute from "@/components/admin/ProtectedAdminRoute";
import DishForm from "@/components/admin/DishForm";

const AddDish = () => {
    return (
        <ProtectedAdminRoute>
            <div className="p-6 max-w-xl mx-auto">
                <DishForm mode="create" />
            </div>
        </ProtectedAdminRoute>
    );
};

export default AddDish;
