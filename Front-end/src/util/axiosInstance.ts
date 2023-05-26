import axios, { AxiosResponse } from "axios";

interface IRequest {
  url: string;
  body?: any;
}

// const axiosInstance = axios.create({
//   baseURL: 'http://127.0.0.1:5000/'
// });

const getRequest = async (
  request: IRequest
): Promise<AxiosResponse<any, any>> => {
  const { url } = request;
  try {
    const data = await axios.get(url);
    return data;
  } catch (error) {
    throw error;
  }
};

// const postRequest = async (
//   request: IRequest
// ): Promise<AxiosResponse<any, any>> => {
//   const { url, body } = request;
//   try {
//     const data = await axiosInstance.post(url, body);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

// const patchRequest = async (
//   request: IRequest
// ): Promise<AxiosResponse<any, any>> => {
//   const { url,body } = request;
//   try {
//     const data = await axiosInstance.patch(url, body);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

// const deleteRequest = async (
//   request: IRequest
// ): Promise<AxiosResponse<any, any>> => {
//   const { url} = request;
//   try {
//     const data = await axiosInstance.delete(url);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

export { getRequest };
