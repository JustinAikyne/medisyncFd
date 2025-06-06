import axios from "axios";

const API_URL = "https://jxeep3kh01.execute-api.ap-south-1.amazonaws.com/dev/api/auth";
// const signup = "https://jxeep3kh01.execute-api.ap-south-1.amazonaws.com/dev/api/auth/signup";

// Function to handle user login
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/signin`, { email, password }, {
            headers: {
                "Content-Type": "application/json",
                // If the API requires authentication, include a token here:
                // "Authorization": "Bearer YOUR_API_TOKEN"
            }
        });
        // console.log("response", response?.data);
        return response.data;
    } catch (error) {
        console.log("error", error);
        // console.error("Login error:", error.response?.data || error.message);
        // throw error.response?.data || "";
        // return "";
    }
};


export const signupUser = async (firstName, lastName, email, password) => {
    const response = await axios.post(`${API_URL}/signup`, { firstName, lastName, email, password }, {
        headers: {
            "Content-Type": "application/json",
            // If the API requires authentication, include a token here:
            // "Authorization": "Bearer YOUR_API_TOKEN"
        }
    });
    console.log("response", response?.data);
    return response?.data;
    // try {
    //     if (condition) {
    //     } else {
    //     }
    // } catch (error) {
    //     console.log("error", error);
    //     // console.error("Login error:", error.response?.data || error.message);
    //     // throw error.response?.data || "";
    //     // return "";
    // }
};


export const sendResetEmail = async (email) => {

    try {
        const response = await axios.get(`https://jxeep3kh01.execute-api.ap-south-1.amazonaws.com/dev/api/auth/forgot-password?email=${email}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        console.log("response", response?.data);
        return response?.data;
    } catch (error) {
        console.log("error", error);
    }

}