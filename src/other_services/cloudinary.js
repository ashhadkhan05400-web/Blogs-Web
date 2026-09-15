import axios from "axios";

export const uploadImageToCloudinary = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default");

        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/hv9hbubn/image/upload",
            formData
        );

        return response.data.secure_url;
    } catch (error) {
        console.log("Error in cloudinary -->", error);
        return null;
    }
};