import { useState } from "react";

const ImageUploader = ({ onUpload }: { onUpload: (url: string) => void }) => {
    const [preview, setPreview] = useState("");

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const localPreview = URL.createObjectURL(file);
        setPreview(localPreview);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "kareems_images");

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/<your-cloud-name>/image/upload",
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await res.json();
        onUpload(data.secure_url);
    };


    return (
        <div>
            <input type="file" onChange={handleFile} className="p-2" />

            {preview && (
                <img
                    src={preview}
                    alt="Preview"
                    className="mt-3 w-32 h-32 object-cover rounded"
                />
            )}
        </div>
    );
};

export default ImageUploader;
