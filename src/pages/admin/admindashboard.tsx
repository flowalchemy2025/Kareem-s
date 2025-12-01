import { useEffect, useState } from "react";
import { api } from "../../lib/api";

const AdminDashboard = () => {
    const [dishes, setDishes] = useState([]);
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        is_veg: true,
        available: true,
        image_url: "",
    });

    const fetchDishes = () => {
        api.get("/dishes").then((res) => setDishes(res.data));
    };

    useEffect(() => {
        fetchDishes();
    }, []);

    const addDish = async () => {
        await api.post("/dishes", form);
        fetchDishes();
    };

    const updateDish = async (id) => {
        await api.put(`/dishes/${id}`, form);
        fetchDishes();
    };

    const deleteDish = async (id) => {
        await api.delete(`/dishes/${id}`);
        fetchDishes();
    };

    return (
        <div className="p-6 bg-secondary min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Add Form */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold mb-3">Add / Edit Dish</h2>

                    {Object.keys(form).map((key) => (
                        <input
                            key={key}
                            placeholder={key}
                            className="w-full border p-2 rounded mb-2"
                            value={form[key]}
                            onChange={(e) =>
                                setForm({ ...form, [key]: e.target.value })
                            }
                        />
                    ))}

                    <button
                        className="bg-green-600 text-white p-2 rounded w-full"
                        onClick={addDish}
                    >
                        Save Dish
                    </button>
                </div>

                {/* Dish List */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold mb-3">Dishes</h2>

                    <ul>
                        {dishes.map((dish) => (
                            <li
                                key={dish.id}
                                className="flex justify-between p-2 border-b"
                            >
                                <span>{dish.title} — ₹{dish.price}</span>

                                <div className="flex gap-2">
                                    <button
                                        className="bg-blue-600 text-white px-3 py-1 rounded"
                                        onClick={() => setForm(dish)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="bg-red-600 text-white px-3 py-1 rounded"
                                        onClick={() => deleteDish(dish.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;