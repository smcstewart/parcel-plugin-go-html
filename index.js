module.exports = bundler => {
  bundler.addAssetType('.gohtml', require.resolve('./GoHTMLTemplateAsset'));
  bundler.addAssetType('.tmpl', require.resolve('./GoHTMLTemplateAsset'));
}
