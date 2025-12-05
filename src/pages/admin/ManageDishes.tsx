import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllDishes, deleteDish } from "@/lib/api";
import { DishType } from "@/types/DishType";
import ProtectedAdminRoute from "@/components/admin/ProtectedAdminRoute";

const ManageDishes = () => {
    const [dishes, setDishes] = useState<DishType[]>([]);

    // 1. Fetch dishes from backend (Google Sheets)
    const fetchDishes = async () => {
        try {
            const res = await getAllDishes();
            const data = res.data as DishType[] | undefined;

            if (!Array.isArray(data)) {
                setDishes([]);
                return;
            }

            // 2. Attach rowNumber (Google Sheets row index) in a typesafe way
            const mapped: DishType[] = data.map((dish, index) => ({
                ...dish,
                rowNumber: index + 2, // because data starts from row 2 in Sheets
            }));

            setDishes(mapped);
        } catch (error) {
            console.error("Error fetching dishes:", error);
        }
    };

    // 3. Delete handler
    const handleDelete = async (rowNumber: number | undefined) => {
        if (!rowNumber) return;

        try {
            await deleteDish(rowNumber);
            await fetchDishes();
        } catch (error) {
            console.error("Error deleting dish:", error);
        }
    };

    useEffect(() => {
        fetchDishes();
    }, []);

    return (
        <ProtectedAdminRoute>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Manage Dishes</h1>

                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Price</th>
                            <th className="p-2 border">Category</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {dishes.map((dish) => (
                            <tr key={dish.rowNumber}>
                                <td className="p-2 border">{dish.name}</td>
                                <td className="p-2 border">{dish.price}</td>
                                <td className="p-2 border">{dish.category}</td>

                                <td className="p-2 border">
                                    {/* Edit link passes data via query params */}
                                    <Link
                                        to={`/admin/edit?name=${encodeURIComponent(
                                            dish.name
                                        )}&price=${encodeURIComponent(
                                            dish.price
                                        )}&category=${encodeURIComponent(
                                            dish.category
                                        )}&description=${encodeURIComponent(
                                            dish.description ?? ""
                                        )}&image=${encodeURIComponent(
                                            dish.image ?? ""
                                        )}&rowNumber=${dish.rowNumber}`}
                                        className="text-blue-600 mr-4 cursor-pointer"
                                    >
                                        Edit
                                    </Link>

                                    {/* Delete action */}
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(dish.rowNumber)}
                                        className="text-red-600 cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {dishes.length === 0 && (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="p-4 border text-center text-gray-500"
                                >
                                    No dishes found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </ProtectedAdminRoute>
    );
};

export default ManageDishes;
