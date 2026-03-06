import axiosInstance from "../../api/axiosInstance";

// login API - Uses axiosInstance to send a POST request to the /login endpoint. (user credientials - input)
export const loginAPI = async (data) => {
    console.log("Login API called with data:", data); // Testing
    try {
        const res = await axiosInstance.post('/login', data);
        return res.data;
    } catch (error) {
        console.log("Login error response:", error.response?.data);
        throw error;
    }
}

// getUser API - Uses axiosInstance to send a GET request to the /getUserdetails endpoint. (get user details after login)
export const getUserAPI = async () => {
    const res = await axiosInstance.get('/getUserdetails');
    return res.data;
}

// logout API - Uses axiosInstance to send a POST request to the /logout endpoint.
export const logoutAPI = async () => {
    const res = await axiosInstance.post('/logout');
    return res.data;
}