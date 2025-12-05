import React, { useEffect, useState } from "react";
import { DishType } from "@/types/DishType";
import { getAllDishes, deleteDish } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";

export default function ManageDishes() {
    const [dishes, setDishes] = useState<DishType[]>([]);
    const navigate = useNavigate();

    // -------------------------------------------------------
    // FETCH DISHES ON LOAD
    // -------------------------------------------------------
    const loadDishes = async () => {
        try {
            const data = await getAllDishes();
            setDishes(data);
        } catch (err) {
            console.error("Error loading dishes:", err);
        }
    };

    useEffect(() => {
        loadDishes();
    }, []);

    // -------------------------------------------------------
    // DELETE DISH HANDLER
    // -------------------------------------------------------
    const handleDelete = async (rowNumber: number | undefined) => {
        if (!rowNumber) return alert("Invalid row number");

        if (!confirm("Are you sure you want to delete this dish?")) return;

        try {
            await deleteDish(rowNumber);
            alert("Dish deleted successfully!");
            loadDishes();
        } catch (err) {
            console.error("Error deleting dish:", err);
            alert("Failed to delete dish");
        }
    };

    return (
        <AdminLayout>
            <h2 className="text-2xl font-bold mb-6">Manage Dishes</h2>

            <div className="overflow-x-auto w-full">
                <table className="w-full border-collapse bg-white shadow rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-3 border">Image</th>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Category</th>
                            <th className="p-3 border">Price</th>
                            <th className="p-3 border">Type</th>
                            <th className="p-3 border">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {dishes.map((dish) => (
                            <tr key={dish.id} className="border-b hover:bg-gray-50">
                                <td className="p-3 border">
                                    {dish.image ? (
                                        <img
                                            src={dish.image}
                                            alt={dish.name}
                                            className="w-16 h-16 rounded object-cover"
                                        />
                                    ) : (
                                        <span className="text-gray-400">No Image</span>
                                    )}
                                </td>

                                <td className="p-3 border font-medium">{dish.name}</td>
                                <td className="p-3 border">{dish.category}</td>
                                <td className="p-3 border">₹{dish.price}</td>

                                <td className="p-3 border">
                                    {dish.is_veg === 1 ? (
                                        <span className="text-green-600 font-semibold">Veg</span>
                                    ) : (
                                        <span className="text-red-600 font-semibold">Non-Veg</span>
                                    )}
                                </td>

                                <td className="p-3 border flex gap-3">
                                    <button
                                        className="bg-blue-600 text-white px-3 py-1 rounded"
                                        onClick={() =>
                                            navigate(`/admin/edit?rowNumber=${dish.rowNumber}`, {
                                                state: { dish },
                                            })
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="bg-red-600 text-white px-3 py-1 rounded"
                                        onClick={() => handleDelete(dish.rowNumber)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {dishes.length === 0 && (
                    <p className="text-center text-gray-500 mt-6">
                        No dishes available. Add some first!
                    </p>
                )}
            </div>
        </AdminLayout>
    );
}
