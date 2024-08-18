import axiosInstance from "./axios/axios";

export async function getProducts(
  page: number,
  limit: number,
  category: string,
  sort: string,
  minPrice: number,
  maxPrice: number,
  search: string,
  ratings: string
) {
  const response = await axiosInstance.get(
    `/api/product?page=${page}&limit=${limit}&category=${category}&sort=${sort}&minPrice=${minPrice}&maxPrice=${maxPrice}&search=${search}&minRatings=${ratings}`
  );
  return response.data;
}
