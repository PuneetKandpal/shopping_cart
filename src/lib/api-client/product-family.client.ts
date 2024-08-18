import axiosInstance from "./axios/axios";


export async function getProductFamilies(){

    const response = await axiosInstance.get(`/api/product-family`);
    return response.data;
}