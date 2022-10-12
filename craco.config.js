const path = require('path');
const CracoLessPlugin = require('craco-less');

module.exports = {
	webpack: {
		alias: {
			'@api': path.resolve(__dirname, 'src/api/'),
			'@assets': path.resolve(__dirname, 'src/assets/'),
			'@components': path.resolve(__dirname, 'src/components/'),
			'@pages': path.resolve(__dirname, 'src/pages/'),
		},
	},
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: { '@primary-color': 'red' },
						javascriptEnabled: true,
					},
				},
			},
		},
	],
};
