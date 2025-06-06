import axios from "axios";
let saveApi = "https://jxeep3kh01.execute-api.ap-south-1.amazonaws.com/dev/api/scanpage/create"
export const saveScanAPI = async (request) => {
    try {

        console.log(" saveScanAPI request", request);

        const response = await axios.post(`${saveApi}`, request, {
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify(requestData),
        });
        // if (!response.ok) {
        //     throw new Error("Failed to submit scan details.");
        // }
        console.log("data..............:", response.data);
        return response.data;
        // navigate("/scan-details");
    } catch (error) {
        console.error("Error:", error);
    }
};

export const scanAPI = async (request) => {
    try {
        // let scanAPIUrl  = "http://15.206.205.122:8080/api/accessibility/check-by-scanid";
        let scanAPIUrl  = "https://jxeep3kh01.execute-api.ap-south-1.amazonaws.com/dev/api/accessibility/check-by-scanid";
        console.log("scanAPIUrl", scanAPIUrl);
        console.log("scanAPI request", request);
        axios.post(`${scanAPIUrl}`, request, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("completed scan");
        // return;
        // navigate("/scan-details");
    } catch (error) {
        console.error("Error:", error);
    }
};
