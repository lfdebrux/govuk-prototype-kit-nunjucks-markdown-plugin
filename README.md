# govuk-prototype-kit-nunjucks-markdown-plugin

A fork of [nunjucks-markdown](https://github.com/zephraph/nunjucks-markdown) that works with the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk/docs/).

[![Greenkeeper badge](https://badges.greenkeeper.io/zephraph/nunjucks-markdown.svg)](https://greenkeeper.io/)

A nunjuck extension that adds a markdown tag. This plugin allows you to choose your own markdown renderer.

## Install

``` bash
npm install @lfdebrux/nunjucks-markdown --save
```

## Usage

In your prototype's `app/routes.js`, setup the plugin

``` js
const markdown = require('@lfdebrux/nunjucks-markdown')
const marked = require('marked')

// The first argument can be any function that renders markdown
router.use(markdown.setupPlugin(marked.parse))
```

Add markdown to your templates

```
{% markdown %}
Hello World
===========
# Do stuff
{% endmarkdown %}
```

You can also provide the markdown tag with a template to render

```
{% markdown "post.md" %}
```
_Note: This method doesn't require a closing tag_

As you would expect, you can add tags inside your markdown tag
```
{% markdown %}
{% include 'post1.md' %}
{% include 'post2.md' %}
{% endmarkdown %}
```


## Markdown Options

**Nunjucks-markdown** doesn't require you to use any particular markdown renderer. If you were to use marked here's a good example of how it could be configured.

``` js
var marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

markdown.register(env, marked);
```

For more information configuration options, checkout [marked](https://github.com/chjj/marked).

