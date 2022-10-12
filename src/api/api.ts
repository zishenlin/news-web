import axios from 'axios';

const instance = axios.create({
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		Accept: 'application/json',
	},
});

instance.interceptors.request.use(
	(config) => {
		console.log(`[Api-Req]: ${config.url}`, config);
		if (config.method === 'get') config.data = true;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(response) => {
		console.log(`[Api-Res]: ${response.config.url}`, response);
		return response;
	},
	(error) => {
		console.log('error:', error);
		alert('請檢視設備網路狀態！');
		return Promise.reject(error);
	}
);

export default instance;
