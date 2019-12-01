# parcel-plugin-go-html

Process Go HTML templates through Parcel.

Extends [HTMLAsset](https://github.com/parcel-bundler/parcel/blob/master/packages/core/parcel-bundler/src/assets/HTMLAsset.js), but it ignores any dependency that contains Go template syntax (well, actually, anything enclosed in ```{{.}}```) in the following instances:

1. When there are multiple instances of Go template syntax (e.g. ```/assets/{{.MyGoVar}}/xyz/{{.YourGoVar}}/abc```); or
2. When there is a single instance of Go template syntax that does _not_ appear at the beginning of the path (e.g. ```/assets/{{.MyGoVar}}/xyz```).

## Go template syntax at the beginning of the path

Where there is a single instance of Go template syntax and it's at the beginning of the path, providing it is followed by ```/./```, it will be processed sans the Go template. This provides the ability to have dynamic server-side prefixes, such as ```dev```, ```test``` etc.

For example: ```{{.MySSPrefix}}/./../js/main.js``` will get processed and result in something like, ```{{.MySSPrefix}}/main.535cbb90.js```

## File extensions

File extensions are ```.tmpl``` or ```.gohtml``` and both output ```.html``` in the output directory.

## Examples

Not processed:

1. ```/assets/{{.MyGoVar}}/xyz/{{.YourGoVar}}/abc```
2. ```{{.MyGoVar}}/xyz/{{.YourGoVar}}/abc```
3. ```/assets/{{.MyGoVar}}/xyz```
4. ```/{{.MyGoVar}}/xyz```
5. ```{{.MyGoVar}}```

Given an output dir of ```assets```, the following will be processed:

1. ```{{.MyGoVar}}/./../js/main.js``` -> ```{{.MyGoVar}}/assets/main.535cbb90.js```
2. ```{{.MyGoVar}}/./../css/main.css``` -> ```{{.MyGoVar}}/assets/main.eea9a008.css```
3. ```../css/main.css``` -> ```/assets/main.eea9a008.css```
3. ```./js/main.js``` -> ```/assets/main.535cbb90.js```

## To install

```npm i parcel-plugin-go-html --save-dev```
