var Markdown = require('./lib/markdown_tag');

module.exports.register = function(env, renderMarkdown) {
  env.addExtension('markdown', new Markdown(env, renderMarkdown));
};

var setupDone = false;
module.exports.setupPlugin = function(renderMarkdown) {
  return function (req, res, next) {
    if (setupDone) return next();

    console.log('@lfdebrux/nunjucks-markdown: doing one time setup');
    module.exports.register(req.app.get('nunjucksEnv'), renderMarkdown);
    setupDone = true;
    next();
  };
};
