import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:5000", // Adjust as needed
});

export default instance;
