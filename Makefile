SHELL=/bin/bash
DOCKER_REGISTRY_URL := 292833313474.dkr.ecr.us-east-1.amazonaws.com
DOCKER_IMAGE_NAME := dandy-admin
VERSION := $(shell cat package.json | jq -r '.version')

build-and-push: clean build-source build-bundle build-image push

build: clean build-source build-bundle

clean:
	rm -rf ./build ./dist

build-source:
	./node_modules/\@babel/cli/bin/babel.js ./src --out-dir ./dist

build-bundle:
	mkdir -p build
	./node_modules/webpack-cli/bin/cli.js --mode production --devtool source-map

build-image:
	docker build . \
		--tag $(DOCKER_REGISTRY_URL)/$(DOCKER_IMAGE_NAME):$(VERSION) \
		--file './Dockerfile'

push:
	eval $(shell aws ecr get-login --no-include-email --profile dandy)
	docker push $(DOCKER_REGISTRY_URL)/$(DOCKER_IMAGE_NAME):$(VERSION)
