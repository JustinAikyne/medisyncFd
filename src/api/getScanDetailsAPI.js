import axios from "axios";
export const getScanDetailsAPI = async (request) => {
    let saveApi = `https://jxeep3kh01.execute-api.ap-south-1.amazonaws.com/dev/api/scan-resopnse/fetch?scanId=${request}`
    try {

        const response = await axios.get(`${saveApi}`, {
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify(requestData),
        });
        // if (!response.ok) {
        //     throw new Error("Failed to submit scan details.");
        // }
        // console.log("data..............:", response.data);
        return response.data;
        // navigate("/scan-details");
    } catch (error) {
        console.error("Error:", error);
        return error;
    }
};
