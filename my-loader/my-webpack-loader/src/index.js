/**
 * See the webpack docs for more information about loaders:
 * https://webpack.docschina.org/contribute/writing-a-loader/
 */

module.exports = function loader(source) {
	const { loaders, resource, request, version, webpack } = this;
	const newSource = `
	/**
	 * my-webpack-loader
	 *
	 * Resource Location: ${resource}
	 * Loaders chained to module: ${JSON.stringify(loaders)}
	 * Loader API Version: ${version}
	 * Is this in "webpack mode": ${webpack}
	 * This is the users request for the module: ${request}
	 */
	/**
	 * Original Source From Loader
	 */
	${source}`;
  console.log('===my-webpack-loader-newSource===',newSource);
	return newSource;
}
