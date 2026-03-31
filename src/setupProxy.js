const { createProxyMiddleware } = require('http-proxy-middleware');

/** Прокси к cbr.ru в dev, чтобы обойти CORS в браузере */
module.exports = function setupProxy(app) {
	app.use(
		'/cbr-proxy',
		createProxyMiddleware({
			target: 'https://www.cbr.ru',
			changeOrigin: true,
			secure: true,
			pathRewrite: { '^/cbr-proxy': '' },
		}),
	);
};
