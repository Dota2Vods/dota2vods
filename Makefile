export PATH := ./node_modules/.bin:$(PATH)
AWS_PROFILE ?= dota2vods
AWS_BUCKET ?= dota2vods

.PHONY : build

default: install build
install:
	npm install

ensure-build-folder:
	mkdir -p build/

build: build-data build-webpack build-html build-storybook
build-data: ensure-build-folder
	./scripts/update-data.sh
build-webpack: ensure-build-folder
	NODE_ENV=production webpack --progress --hide-modules
build-html: ensure-build-folder
	babel-node src/build-html
build-storybook: ensure-build-folder
	build-storybook -c .storybook -o build/storybook

deploy:
	AWS_PROFILE=${AWS_PROFILE} AWS_BUCKET=${AWS_BUCKET} babel-node src/deploy
watch:
	webpack-dev-server
watch-storybook:
	start-storybook -p 6006
