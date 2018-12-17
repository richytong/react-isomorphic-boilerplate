DOCKER_REGISTRY_URL := YOUR_DOCKER_REGISTRY_URL
DOCKER_IMAGE_NAME := YOUR_DOCKER_IMAGE_NAME
VERSION := $(shell cat package.json | jq -r '.version')

build-and-push: clean build-source build-image push

clean:
	rm -rf ./build ./dist

build-source:
	./node_modules/\@babel/cli/bin/babel.js ./src --out-dir ./dist
	mkdir -p build
	NODE_ENV=production ./node_modules/webpack-cli/bin/cli.js \
		--progress \
		--mode production \
		--devtool source-map \
		--output ./build/app.bundle.js

build-image:
	docker build . \
		--tag $(DOCKER_REGISTRY_URL)/$(DOCKER_IMAGE_NAME):$(VERSION) \
		--file './Dockerfile'

push:
	eval $(shell aws ecr get-login --no-include-email --profile YOUR_PROFILE_NAME)
	docker push $(DOCKER_REGISTRY_URL)/$(DOCKER_IMAGE_NAME):$(VERSION)
