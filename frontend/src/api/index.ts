import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3001/api",
    withCredentials: true, // optional: use if needed later
});

export const getProjects = () => API.get("/projects");
export const getUserInfo = () => API.get("/userinfo");
export const getImages = () => API.get("/images");
export const getCustomization = () => API.get("/customization");

export default API;
