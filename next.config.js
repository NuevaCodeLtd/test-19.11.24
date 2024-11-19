module.exports = {
	images: {
		domains: ['localhost'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
				port: '',
			},
		],
	},
	webpack: (config, options) => {
		if (options.isServer) {
			return config;
		} else {
			config.resolve.fallback.fs = false;
			return config;
		}
	},
}