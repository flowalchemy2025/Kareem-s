import { useState, useEffect } from "react";
import ImageUploader from "./ImageUploader";
import { addDish, editDish } from "@/lib/api";
import { DishType } from "@/types/DishType";
import { MENU_CATEGORIES } from "@/constants/menuCategories";

interface DishFormProps {
    mode: "create" | "edit";
    existingDish?: DishType;
}

const DishForm = ({ mode, existingDish }: DishFormProps) => {
    const [name, setname] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [dishType, setDishType] = useState<"Veg" | "NonVeg">("Veg");
    const [rowNumber, setRowNumber] = useState<number | null>(null);

    // Prefill in edit mode
    useEffect(() => {
        if (existingDish) {
            setname(existingDish.name || "");
            setPrice(existingDish.price || "");
            setCategory(existingDish.category || "");
            setDescription(existingDish.description || "");
            setImageUrl(existingDish.image || "");
            setDishType(existingDish.is_veg === 1 ? "Veg" : "NonVeg");
            setRowNumber(existingDish.rowNumber ?? null);
        }
    }, [existingDish]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            name,
            description,
            price,
            category,
            image_url: imageUrl,
            is_veg: dishType === "Veg" ? 1 : 0,
        };

        if (mode === "create") {
            await addDish(payload);
            alert("Dish added successfully");
        } else {
            if (!rowNumber) {
                alert("Row number missing for edit");
                return;
            }
            await editDish(rowNumber, payload);
            alert("Dish updated successfully");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow space-y-4"
        >
            <h2 className="text-xl font-bold">
                {mode === "create" ? "Add New Dish" : "Edit Dish"}
            </h2>

            {/* Title */}
            <input
                className="w-full p-3 border rounded"
                placeholder="Dish Name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                required
            />

            {/* Price */}
            <input
                className="w-full p-3 border rounded"
                placeholder="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />

            {/* Category DROPDOWN */}
            <select
                className="w-full p-3 border rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            >
                <option value="">Select Category</option>
                {MENU_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            {/* Veg / NonVeg TOGGLE */}
            <div className="flex gap-4">
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="dishType"
                        value="Veg"
                        checked={dishType === "Veg"}
                        onChange={() => setDishType("Veg")}
                    />
                    Veg
                </label>

                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="dishType"
                        value="NonVeg"
                        checked={dishType === "NonVeg"}
                        onChange={() => setDishType("NonVeg")}
                    />
                    Non-Veg
                </label>
            </div>

            {/* Description */}
            <textarea
                className="w-full p-3 border rounded"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            {/* Image uploader */}
            <ImageUploader onUpload={(url) => setImageUrl(url)} />

            {imageUrl && (
                <img
                    src={imageUrl}
                    alt="Dish"
                    className="mt-3 w-24 h-24 rounded object-cover"
                />
            )}

            <button className="w-full bg-green-600 text-white p-3 rounded font-semibold">
                {mode === "create" ? "Save Dish" : "Update Dish"}
            </button>
        </form>
    );
};

export default DishForm;
