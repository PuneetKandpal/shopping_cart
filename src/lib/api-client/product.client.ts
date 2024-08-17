import axiosInstance from "./axios/axios";


export async function getProducts(page: number, limit: number){
    const response = await axiosInstance.get(`/api/product?page=${page}&limit=${limit}`);
    return response.data;
}


