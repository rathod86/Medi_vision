import API from "../api/axiosConfig";
import { toObject } from "../utils/apiHelpers";


export const getDashboardData = async () => {

    const response = await API.get("/dashboard");

    return toObject(response.data);

};


export const getFullDashboard = async () => {

    const response = await API.get("/dashboard/full");

    return toObject(response.data);

};
