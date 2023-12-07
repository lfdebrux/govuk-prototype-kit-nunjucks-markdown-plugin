module.exports = {
  nunjucks: requireNunjucks(),
};

// We need to get the same instance of the nunjucks module that
// govuk-prototype-kit is using; otherwise this library will not be able to use
// the same `SafeString` object that Nunjucks uses to check if a string is safe,
// and any HTML produced by the Markdown library will be escaped.
//
// In govuk-prototype-kit >= 13.0.0, < 13.5.0 the release package included an
// `npm-shrinkwrap.json` file, which means we have to reach into the
// dependencies of govuk-prototype-kit to avoid getting a different version of
// nunjucks. Releases of govuk-prototype-kit >= 13.5.0 appear not to be
// shrinkwrapped, so we can use the global nunjucks package.
function requireNunjucks() {
  try {
    return require('govuk-prototype-kit/node_modules/nunjucks');
  } catch(e) {
    if (!e.code || e.code != 'MODULE_NOT_FOUND') throw e;

    return require('nunjucks');
  }
}

