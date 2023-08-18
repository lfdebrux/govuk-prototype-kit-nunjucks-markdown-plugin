var path = require('path');

var Markdown = require('./lib/markdown_tag');

packageName = function() {
  var segments = __dirname.split(path.sep)
  var index = segments.lastIndexOf('node_modules')
  if (index == -1) {
    return segments[segments.length - 1]
  }
  if (segments[index + 1][0] == '@') {
    return [segments[index + 1], segments[index + 2]].join('/')
  } else {
    return segments[index + 1]
  }
}

module.exports.register = function(env, renderMarkdown) {
  env.addExtension('markdown', new Markdown(env, renderMarkdown));
};

var setupDone = false;
module.exports.setupPlugin = function(renderMarkdown) {
  return function (req, res, next) {
    if (setupDone) return next();

    console.log('%s doing one time setup', packageName());
    module.exports.register(req.app.get('nunjucksEnv'), renderMarkdown);
    setupDone = true;
    next();
  };
};
