const HTMLAsset = require('parcel-bundler/src/assets/HTMLAsset')
const isURL = require('parcel-bundler/src/utils/is-url')
const urlJoin = require('parcel-bundler/src/utils/urlJoin')

class GoHTMLTemplateAsset extends HTMLAsset {
  constructor(name, options) {
    super(name, options)
  }

  // We override this HTMLAsset function to ensure we do not process
  // dependencies with Go template syntax. In essence, it's not only
  // Go template syntax, but any dependency that contains {{}}.
  processSingleDependency(path, opts) {
    let r = /(.*){{(.*)}}(.*)/g
    if (path.match(r)) {
      return path
    }

    return super.processSingleDependency(path, opts)
  }
}

module.exports = GoHTMLTemplateAsset