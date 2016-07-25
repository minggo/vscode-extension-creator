#!/bin/sh

cwd=$(pwd)
dst="$cwd/cocos-creator"
out="$dst/out/src"
zipfile="$cwd/cocos-creator.zip"

# compile typescript
npm run vscode:prepublish

if [ -d "$dst" ]; then
	rm -rf "$dst"
fi

if [ -f "$zipfile" ]; then
	rm -f "$zipfile"
fi

mkdir "$dst"
mkdir -p "$out"

# copy files
package="$cwd/package.json"
configuration="$cwd/src/configuration.json"
completionItemProvider="$cwd/out/src/completionItemProvider.js"
extension="$cwd/out/src/extension.js"
global="$cwd/out/src/globals.js"


cp "$package" "$dst"
cp "$configuration" "$dst"
cp "$completionItemProvider" "$out"
cp "$extension" "$out"
cp "$global" "$out"

# zip
zip -r cocos-creator.zip ./cocos-creator
