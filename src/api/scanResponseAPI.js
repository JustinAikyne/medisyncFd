import axios from "axios";


// let scanId = "scanId = 67af0e03fab4be5aa07ec3ec";
export const responseAPI = async (paramObj) => {
    try {
        if (paramObj && paramObj?.scanId) {
            var params = `?scanId=${paramObj.scanId}`;
            if (paramObj.guildelineId) {
                params = `${params}&guildelineId=${paramObj.guildelineId}`;                
            }
            let API_URL = `https://jxeep3kh01.execute-api.ap-south-1.amazonaws.com/dev/api/scan-resopnse/fetch${params}`;
            const response = await axios.get(`${API_URL}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            // console.log("data..............:", response.data);
            return response.data;
            
        }else{
            return {}
        }
    } catch (error) {
        console.error("Error:", error);
    }
};