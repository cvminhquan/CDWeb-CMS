import axios from 'axios';
import queryString from 'query-string';
import apiConfig from './apiConfig';

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'authorization': `${localStorage.getItem("tokenType")} ${localStorage.getItem("accessToken")}`,
  },
})
axiosClient.interceptors.request.use(async (config) => config);
axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }
  return response;
}, (error) => {
  throw error;
});

const get = (url: string,option?:any) => {
  return axios.get(url,{...option});
}
export const getUserInfo = (url: string) => {
  return axiosClient.get(url);
}
export const postUserInfo = (url: string, data: any) => {
  return axiosClient.post(url, data);
}

const post = (url: string, data: any) => {
  return axios.post(url, data);
}

const put = (url: string, data: any) => {
  return axios.put(url, data);
}

const patch = (url: string, data: any) => {
  return axios.patch(url, data);
}

const del = (url: string) => {
  return axios.delete(url);
}

export { get, post, put, patch, del }
export default axiosClient