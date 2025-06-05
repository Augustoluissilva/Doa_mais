// src/api.js
import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3001",
});

/*
 * Interceptor: toda vez que uma requisição sair pelo `api`,
 * ele checa se há token no localStorage e coloca no header.
 */
api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default api;
