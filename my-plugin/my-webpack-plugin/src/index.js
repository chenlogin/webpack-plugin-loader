/**
 * See the webpack docs for more information about plugins:
 * https://webpack.docschina.org/contribute/writing-a-plugin/
 */
const { InvalidHookNameError } = require('./errors');
const plugin = {
  name: 'MyWebpackPlugin'
};

class MyWebpackPlugin {
  constructor(hooks) {
      this.hooks = hooks;
  }

  apply(compiler) {
      const hooks = this.hooks;

      Object.keys(hooks).forEach((hook) => {
          const validHookNames = Object.keys(compiler.hooks);
          console.log("生命周期钩子函数:",validHookNames)
          
          if ( !validHookNames.includes(hook) ) {
              throw new InvalidHookNameError(`Invalid hook name '${hook}', use one of '${validHookNames.join(', ')}'`);
          }

          const task = hooks[hook];
          const tap = typeof task === 'function' ? 'tap' : task.tap;
          const fn = typeof task === 'function' ? task : task.task;

          compiler.hooks[hook][tap]('MyWebpackPlugin', fn);
      });
  }
};

module.exports = MyWebpackPlugin;
