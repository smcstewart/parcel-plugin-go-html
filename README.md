# parcel-plugin-go-html

Process Go HTML templates through Parcel.

Extends [HTMLAsset](https://github.com/parcel-bundler/parcel/blob/master/packages/core/parcel-bundler/src/assets/HTMLAsset.js), but it ignores any dependency that contains Go template syntax (well, actually, anything enclosed in ```{{}}```).

File extensions are ```.tmpl``` or ```.gohtml``` and both output ```.html``` in the output directory.

## To install

```npm i parcel-plugin-go-html --save-dev```
