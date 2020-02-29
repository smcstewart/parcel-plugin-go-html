const HTMLAsset = require('parcel-bundler/src/assets/HTMLAsset');
const isURL = require('parcel-bundler/src/utils/is-url');
const urlJoin = require('parcel-bundler/src/utils/urlJoin');

class GoHTMLTemplateAsset extends HTMLAsset {
  constructor(name, options) {
    super(name, options);
  }

  // We override this HTMLAsset function to ensure we do not process
  // dependencies with Go template syntax. In essence, it's not only
  // Go template syntax, but any dependency that contains {{}}.
  processSingleDependency(path, opts) {
    let procPath = path;
    const matchAtStart = /^{{.*}}/;
    const matchAny = /{{.*}}/;

    if (path.match(matchAtStart)) {
      // Check to see if this is the only instance of Go template syntax.
      const p = path.split('/./');
      const firstElement = p.shift();
      const rest = p.join('/');
      if (rest.length > 0 && !rest.match(matchAny) && !rest.startsWith('/')) {
        // It's the only instance, and it's at the start...
        // ... so we want to process the rest of the string as normal,
        // without the firstElement
        procPath = firstElement + super.processSingleDependency(rest, opts);
      }
    } else {
      if (path.match(matchAny)) {
        // We have an instance in the path, but it's not at the start
      } else {
        procPath = super.processSingleDependency(path, opts);
      }
    }

    return procPath;
  }

  // We post-process the post-processing to ensure that the output is sensible
  // for Go to parse. Bit of a hack, but effective enough.
  async postProcess(generated) {
    const render = await super.postProcess(generated)

    const finder = /{{(.*?)&quot;(.*?)&quot;(.*?)}}/g;
    const replacer = '{{$1"$2"$3}}';
    render[0].value = render[0].value.replace(finder, replacer)

    return render;
  }
}

module.exports = GoHTMLTemplateAsset;
