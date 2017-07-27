export PATH := ./node_modules/.bin:$(PATH)

.PHONY : build

default: install build
install:
	npm install

build: build-data build-webpack build-html build-storybook
build-data:
	./scripts/update-data.sh
build-webpack:
	NODE_ENV=production webpack --progress --hide-modules
build-html:
	babel-node src/build-html.js
build-storybook:
	build-storybook -c .storybook -o build/storybook

deploy:
	./scripts/deploy.sh
watch:
	webpack-dev-server
watch-storybook:
	start-storybook -p 6006
