require('file-loader?name=[name].[ext]!extract-loader?!./index.html');

require('./css/main.css');
require('xin/css/layout.css');

require('file-loader?name=pages/[name].[ext]!./pages/index.md');
let file = 'index';
require('file-loader?name=pages/guides/[name].[ext]!./pages/guides/' + file + '.md');
require('file-loader?name=pages/concepts/[name].[ext]!./pages/concepts/' + file + '.md');
require('file-loader?name=pages/views/[name].[ext]!./pages/views/' + file + '.md');

require('file-loader?name=[name].[ext]!./favicon.ico');
require('file-loader?name=[name].[ext]!./manifest.json');
file = 'apple-icon';
require('file-loader?name=icons/[name].[ext]!./icons/' + file + '.png');

let next = Promise.resolve();
if ('fetch' in window === false) {
  next = next.then(() => System.import('whatwg-fetch'));
}

if ('customElements' in window === false) {
  next = next.then(() => System.import('@webcomponents/custom-elements'));
}

window.xin = {
  // 'debug': true,
  'xin.View.transition': 'fade',
};

next.then(() => System.import('./components/doc-app'));
