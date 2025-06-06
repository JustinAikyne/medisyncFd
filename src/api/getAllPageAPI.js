import axios from "axios";

export const getPagesAPI = async (url) => {
    try {
        const userId = localStorage.getItem("userId");

        // console.log("userId................", userId);
        let getPages = `https://jxeep3kh01.execute-api.ap-south-1.amazonaws.com/dev/api/scanpage/getAllPages?userId=${userId}`

        const response = await axios.get(`${getPages}`, {
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
