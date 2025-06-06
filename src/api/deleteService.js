import axios from "axios";

const deleteUrl = "https://jxeep3kh01.execute-api.ap-south-1.amazonaws.com/dev/api";

export const deleteAPI = async (id, type) => {
    try {
        let executeApi = "scanpage";
        if (type === "response") {
            executeApi = "scan-resopnse"
        }
        const response = await axios.delete(`${deleteUrl}/${executeApi}/${id}`, {
            headers: {
                "Content-Type": "application/json",
                // If the API requires authentication, include a token here:
                // "Authorization": "Bearer YOUR_API_TOKEN"
            }
        });
        // console.log("response........", response?.data);
        return response?.data;
    } catch (error) {
        console.log("error", error);
        // console.error("Login error:", error.response?.data || error.message);
        // throw error.response?.data || "";
        return null;
    }
};