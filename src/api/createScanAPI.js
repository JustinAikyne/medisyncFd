import axios from "axios";

const getAllPages = "https://jxeep3kh01.execute-api.ap-south-1.amazonaws.com/dev/api/sitemap/generate";

export const scanpage = async (url) => {
    try {
        const response = await axios.get(`${getAllPages}?url=${url}`, {
            headers: {
                "Content-Type": "application/json",
                // If the API requires authentication, include a token here:
                // "Authorization": "Bearer YOUR_API_TOKEN"
            }
        });
        // console.log("response........", response?.data);
        return response.data;
    } catch (error) {
        console.log("error", error);
        // console.error("Login error:", error.response?.data || error.message);
        // throw error.response?.data || "";
        // return "";
    }
};