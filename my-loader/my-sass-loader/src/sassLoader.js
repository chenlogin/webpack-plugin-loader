const nodeSass = require("node-sass");
const path = require("path")


let result = nodeSass.renderSync({
    file: path.resolve(__dirname, "./src/index.scss"),
    outputStyle: 'expanded',
});
module.exports = function() {
    return result.css.toString()
}