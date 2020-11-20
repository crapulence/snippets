const viewGenerator = require('./view/prompt');
const componentGenerator = require('./component/prompt');

module.exports = function (plop) {
  plop.setGenerator('view', viewGenerator);
  plop.setGenerator('component', componentGenerator);
};
