import React, { useEffect, useState } from "react";
import { addDish, editDish } from "@/lib/api";
import { DishType } from "@/types/DishType";

interface DishFormProps {
    mode: "create" | "edit";
    existingDish?: DishType;
    rowNumber?: number;
}

export default function DishForm({ mode, existingDish, rowNumber }: DishFormProps) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [dishType, setDishType] = useState<"Veg" | "Non-Veg">("Veg");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    // -----------------------------------------------
    // PREFILL DATA WHEN EDITING
    // -----------------------------------------------
    useEffect(() => {
        if (existingDish) {
            setName(existingDish.name || "");
            setPrice(existingDish.price || "");
            setCategory(existingDish.category || "");
            setDishType(existingDish.is_veg === 1 ? "Veg" : "Non-Veg");
            setDescription(existingDish.description || "");
            setImageUrl(existingDish.image || "");
        }
    }, [existingDish]);

    // -----------------------------------------------
    // IMAGE UPLOAD HANDLER
    // -----------------------------------------------
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Example: Cloudinary upload handler
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result as string); // TEMP preview
        };
        reader.readAsDataURL(file);
    };

    // -----------------------------------------------
    // SUBMIT HANDLER
    // -----------------------------------------------
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const id = existingDish?.id ?? Date.now().toString(); // auto-generate id

        const payload: DishType = {
            id,
            name,
            price,
            category,
            is_veg: dishType === "Veg" ? 1 : 0,
            description,
            image: imageUrl,
        };

        try {
            if (mode === "create") {
                await addDish(payload);
                alert("Dish added successfully!");
            } else {
                if (!rowNumber) {
                    alert("Row number missing!");
                    return;
                }
                await editDish(rowNumber, payload);
                alert("Dish updated successfully!");
            }
        } catch (err) {
            console.error("FULL ERROR DETAILS:", err);
            alert("Something went wrong. Check console.");
        }
    };

    return (
        <form className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-md" onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold">
                {mode === "create" ? "Add New Dish" : "Edit Dish"}
            </h2>

            {/* Name */}
            <input
                type="text"
                placeholder="Dish Name"
                className="border rounded p-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            {/* Price */}
            <input
                type="text"
                placeholder="Price"
                className="border rounded p-3"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />

            {/* Category Dropdown */}
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded p-3"
                required
            >
                <option value="">Select Category</option>
                <option value="Starter">Starter</option>
                <option value="Main Course">Main Course</option>
                <option value="Beverages">Beverages</option>
                <option value="Desserts">Desserts</option>
            </select>

            {/* Veg / Non-Veg Toggle */}
            <div className="flex gap-4">
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="vegType"
                        checked={dishType === "Veg"}
                        onChange={() => setDishType("Veg")}
                    />
                    Veg
                </label>

                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="vegType"
                        checked={dishType === "Non-Veg"}
                        onChange={() => setDishType("Non-Veg")}
                    />
                    Non-Veg
                </label>
            </div>

            {/* Description */}
            <textarea
                placeholder="Description"
                className="border rounded p-3"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            {/* Image Upload */}
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imageUrl && (
                <img src={imageUrl} alt="Preview" className="w-24 h-24 object-cover rounded-md" />
            )}

            {/* Submit Button */}
            <button type="submit" className="bg-green-600 text-white p-3 rounded-lg">
                {mode === "create" ? "Add Dish" : "Update Dish"}
            </button>
        </form>
    );
}
