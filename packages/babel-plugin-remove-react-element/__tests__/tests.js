import path from 'path';
import pluginTester from 'babel-plugin-tester';
import removeJSXElement from '../src/index';

pluginTester({
  plugin: removeJSXElement,
  fixtures: path.join(__dirname, 'fixtures'),
  pluginOptions: {
    elementNames: ["Desktop"]
  }
});