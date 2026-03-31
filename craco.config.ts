/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const redirectServedPath = require('react-dev-utils/redirectServedPathMiddleware');
const paths = require('react-scripts/config/paths');
const { CracoAliasPlugin } = require('react-app-alias');

function patchSassLoaderApi(webpackConfig: any) {
	const oneOf = webpackConfig.module?.rules?.find((r: any) => r.oneOf)?.oneOf;
	if (!oneOf) return webpackConfig;
	for (const rule of oneOf) {
		if (!rule.use) continue;
		const uses = Array.isArray(rule.use) ? rule.use : [rule.use];
		for (const use of uses) {
			if (use && typeof use === 'object' && use.loader && String(use.loader).includes('sass-loader')) {
				use.options = {
					...use.options,
					api: 'modern',
				};
			}
		}
	}
	return webpackConfig;
}

/**
 * react-scripts всё ещё задаёт onBeforeSetupMiddleware / onAfterSetupMiddleware;
 * webpack-dev-server 4+ помечает их как deprecated — переносим на setupMiddlewares.
 */
function patchDevServerMiddlewares(devServerConfig: any) {
	const prevSetup = devServerConfig.setupMiddlewares;
	delete devServerConfig.onBeforeSetupMiddleware;
	delete devServerConfig.onAfterSetupMiddleware;

	devServerConfig.setupMiddlewares = (middlewares: any[], devServer: any) => {
		devServer.app.use(evalSourceMapMiddleware(devServer));
		if (fs.existsSync(paths.proxySetup)) {
			// eslint-disable-next-line import/no-dynamic-require, global-require
			require(paths.proxySetup)(devServer.app);
		}

		let next = middlewares;
		if (typeof prevSetup === 'function') {
			next = prevSetup(middlewares, devServer);
		}

		next.push(
			{
				name: 'redirect-served-path',
				middleware: redirectServedPath(paths.publicUrlOrPath),
			},
			{
				name: 'noop-service-worker',
				middleware: noopServiceWorkerMiddleware(paths.publicUrlOrPath),
			},
		);
		return next;
	};

	return devServerConfig;
}

module.exports = {
	eslint: {
		enable: false,
	},
	typescript: {
		// fork-ts-checker из react-scripts несовместим с Node 22 + актуальным TS (performance.mark)
		enableTypeChecking: false,
	},
	devServer: patchDevServerMiddlewares,
	webpack: {
		configure: patchSassLoaderApi,
	},
	plugins: [
		{
			plugin: CracoAliasPlugin,
			options: {},
		},
	],
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|jpeg|gif)?$/i,
				type: 'asset/resource',
			},
		],
	},
};
